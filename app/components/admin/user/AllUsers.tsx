import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import { AiOutlineDelete, AiOutlineMail } from "react-icons/ai";
import { useTheme } from "next-themes";
import { format } from "timeago.js";
import Loader from "../../loader/Loader";
import { useGetAllUsersQuery } from "../../../../redux/features/user/userApi";
import React, { useState } from "react";
import { styles } from "../../../../app/styles/style";

interface UserRow {
    id: string;
    name: string;
    email: string;
    role: string;
    courses: number;
    createdAt: string;
}

type Props = {
    isTeam?: boolean;
};

const AllUsers: React.FC<Props> = ({ isTeam }) => {
    const [active, setActive] = useState(false);
    const { theme } = useTheme();
    const darkTheme = createTheme({
        palette: {
            mode: theme === "dark" ? "dark" : "light",
        },
    });

    const { isLoading, data, error } = useGetAllUsersQuery({});

    const columns: GridColDef<UserRow>[] = [
        { field: "id", headerName: "ID", flex: 0.3 },
        { field: "name", headerName: "Name", flex: 0.6 },
        { field: "email", headerName: "Email", flex: 0.8 },
        { field: "role", headerName: "Role", flex: 0.3 },
        { field: "courses", headerName: "Purchased Courses", flex: 0.5 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.3,
            sortable: false,
            renderCell: () => (
                <Button>
                    <AiOutlineDelete size={20} className="text-yellow-600" />
                </Button>
            ),
        },
        {
            field: "mail",
            headerName: "Send Mail",
            flex: 0.3,
            sortable: false,
            renderCell: (params: any) => (
                <a
                    href={`mailto:${params.row.email}`}
                    target="_blank"
                    style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        width: "100%",
                        height: "100%",
                    }}
                >
                    <AiOutlineMail size={20} className="text-red-600" />
                </a>
            ),
        },
    ];

    const rows: UserRow[] = [];

    if (isTeam) {
        const newData = data && data?.users?.filter((item: any) => item.role === "admin");

        newData?.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt),
            });
        });
    } else {
        data?.users?.forEach((item: any) => {
            rows.push({
                id: item._id,
                name: item.name,
                email: item.email,
                role: item.role,
                courses: item.courses.length,
                createdAt: format(item.createdAt),
            });
        });
    }

    if (isLoading) return <Loader />;

    if (error) {
        return <div className="mt-[120px] text-center text-red-500">Failed to load courses.</div>;
    }

    return (
        <div className="mt-[120px]">
            <ThemeProvider theme={darkTheme}>
                <Box m="20px">
                    <div className="w-full flex justify-end">
                        <div className={`${styles.button} w-fit`} onClick={() => setActive(!active)}>Add New Member</div>
                    </div>
                    <Box m="40px 0 0 0" height="80vh">
                        <DataGrid
                            checkboxSelection
                            disableRowSelectionOnClick
                            rows={rows}
                            columns={columns}
                        />
                    </Box>
                </Box>
            </ThemeProvider>
        </div>
    );
};

export default AllUsers;
