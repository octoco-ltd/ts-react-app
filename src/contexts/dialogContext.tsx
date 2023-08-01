import { createContext, useContext, useState } from 'react';
import ConfirmationDialog from 'src/components/dialogs/ConfirmationDialog';

interface DialogOptions {
    title: string;
    message?: string;
    proceedFn?: () => void;
}

interface PromiseInfo {
    resolve: (value: boolean | PromiseLike<boolean>) => void;
    reject: (reason?: any) => void;
}

type ShowDialogHandler = (options: DialogOptions) => Promise<boolean>;

// Create the context so we can use it in our App
const DialogContext = createContext<ShowDialogHandler>(() => {
    throw new Error('Component is not wrapped with a DialogProvider.');
});

interface DialogProps {
    children: React.ReactNode;
}

const DialogProvider: React.FC<DialogProps> = ({ children }: DialogProps) => {
    const [open, setOpen] = useState(false);
    const [options, setOptions] = useState<DialogOptions>({
        title: '',
    });
    const [promiseInfo, setPromiseInfo] = useState<PromiseInfo>();
    const showDialog: ShowDialogHandler = (options) => {
        // When the dialog is shown, keep the promise info so we can resolve later
        return new Promise<boolean>((resolve, reject) => {
            setPromiseInfo({ resolve, reject });
            setOptions(options);
            setOpen(true);
        });
    };
    const handleConfirm = async () => {
        if (options.proceedFn) {
            options.proceedFn();
        }
        // if the Confirm button gets clicked, resolve with `true`
        setOpen(false);
        promiseInfo?.resolve(true);
        setPromiseInfo(undefined);
    };
    const handleCancel = () => {
        // if the dialog gets canceled, resolve with `false`
        setOpen(false);
        promiseInfo?.resolve(false);
        setPromiseInfo(undefined);
    };

    return (
        <>
            <ConfirmationDialog
                open={open}
                onClose={handleCancel}
                title={options.title}
                message={options.message}
                actionFn={handleConfirm}
            />
            <DialogContext.Provider value={showDialog}>{children}</DialogContext.Provider>
        </>
    );
};

// By calling `useDialog()` in a component we will be able to use the `showDialog()` function
export const useDialog = () => {
    return useContext(DialogContext);
};

export default DialogProvider;
