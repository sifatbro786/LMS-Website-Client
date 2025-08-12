import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Box, Button, createTheme, ThemeProvider } from "@mui/material";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit2 } from "react-icons/fi";
import { useTheme } from "next-themes";
import { useGetAllCoursesQuery } from "@/redux/features/courses/coursesApi";
import { format } from "timeago.js";
import Loader from "../../loader/Loader";

interface CourseRow {
    id: string;
    title: string;
    ratings: number;
    purchased: number;
    createdAt: string;
}

const AllCourses = () => {
    const { theme } = useTheme();
    const darkTheme = createTheme({
        palette: {
            mode: theme === "dark" ? "dark" : "light",
        },
    });

    const { isLoading, data, error } = useGetAllCoursesQuery({});

    const columns: GridColDef<CourseRow>[] = [
        { field: "id", headerName: "ID", flex: 0.5 },
        { field: "title", headerName: "Course Title", flex: 1 },
        { field: "ratings", headerName: "Ratings", flex: 0.5 },
        { field: "purchased", headerName: "Purchased", flex: 0.5 },
        { field: "createdAt", headerName: "Created At", flex: 0.5 },
        {
            field: "edit",
            headerName: "Edit",
            flex: 0.3,
            sortable: false,
            renderCell: () => (
                <Button>
                    <FiEdit2 size={16} className="text-blue-600" />
                </Button>
            ),
        },
        {
            field: "delete",
            headerName: "Delete",
            flex: 0.3,
            sortable: false,
            renderCell: () => (
                <Button>
                    <AiOutlineDelete size={20} className="text-red-600" />
                </Button>
            ),
        },
    ];

    const rows: CourseRow[] =
        data?.courses?.map((item: any) => ({
            id: item._id,
            title: item.name,
            ratings: item.ratings,
            purchased: item.purchased,
            createdAt: format(item.createdAt),
        })) || [];

    if (isLoading) return <Loader />;

    if (error) {
        return <div className="mt-[120px] text-center text-red-500">Failed to load courses.</div>;
    }

    return (
        <div className="mt-[120px]">
            <ThemeProvider theme={darkTheme}>
                <Box m="20px">
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

export default AllCourses;
