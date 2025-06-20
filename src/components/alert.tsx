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
import { useState, forwardRef, useImperativeHandle, JSX } from "react";

export type AlertHandle = {
    showAlert: () => void;
};

type AlertProps = {
    alertTitle: string;
    alertDescription: string;
    content?: JSX.Element;
    callback?: () => void;
};

const Alert = forwardRef<AlertHandle, AlertProps>(
    ({ alertTitle, alertDescription, content: Content = <></>, callback: callback = () => {} }, ref) => {
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
                        <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
                        <AlertDialogDescription>
                            {alertDescription} {Content}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={
                            () => {
                            setIsOpen(false)
                            callback()
                            }
                        }>
                            Ok
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        );
    }
);

export default Alert;
