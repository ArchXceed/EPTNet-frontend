import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useState, forwardRef, useImperativeHandle } from "react";

export type AlertHandle = {
    showAlert: () => void;
};

const Alert = forwardRef<AlertHandle, { alertTitle: string; alertDescription: string }>((props, ref) => {
    const [isOpen, setIsOpen] = useState(false);

    const showAlert = () => {
        setIsOpen(true);
    };

    useImperativeHandle(ref, () => ({
        showAlert,
    }));

    return (
        <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
            <AlertDialogTrigger>
                <div /> {/* Hidden trigger, no interaction needed */}
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{props.alertTitle}</AlertDialogTitle>
                    <AlertDialogDescription>{props.alertDescription}</AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogAction onClick={() => setIsOpen(false)}>Ok</AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
});

export default Alert;
