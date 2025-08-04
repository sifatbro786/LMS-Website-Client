import { FC } from "react";
import  Modal  from "@mui/material/Modal";
import Box from '@mui/material/Box';

// type ModalComponentProps = {
//     setOpen?: (open: boolean) => void;
//     setRoute?: (route: string) => void;
//   };
  
  type CustomModalProps = {
    open: boolean;
    setOpen: (open: boolean) => void;
    activeItem: number;
    component: React.ElementType;
    setRoute?: (route: string) => void;
  };

const CustomModal: FC<CustomModalProps> = ({
    open,
    setOpen,
    setRoute,
    // activeItem,
    component: Component,
}) => {
    return (
        <Modal
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] 800px:w-[500px] bg-white dark:bg-slate-900 rounded-[8px] shadow px-6 py-6 outline-none">
                <Component setOpen={setOpen} setRoute={setRoute} />
            </Box>
        </Modal>
    );
};
export default CustomModal;
