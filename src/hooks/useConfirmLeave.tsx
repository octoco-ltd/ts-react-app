import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseConfirmLeaveProps {
    initialFormValues?: any;
    message?: string;
    autoAddListener?: boolean;
    actionFns?: any | null; //TODO: Define Type
}

/**
 * Ask user to confirm to leave page if hook is called on page
 *
 * @param initialFormValues (Optional) Used to check of the form has changed, if not, it should not ask confirmation
 * @param message (Optional) - message to display to user on back
 * @param autoAddListener (Optional) - Whether to auto add the listener or use the exported functions 
 * @param actionFns (Optional) - array of functions to run on user confirmation
 * 
 * @returns removeListeners - function when to remove the listener
 * @returns addListeners - function when to add the listener
 */
export default function useConfirmLeave({
    initialFormValues,
    message,
    autoAddListener,
    actionFns,
}: IUseConfirmLeaveProps) {
    const [confirmedLeave, setConfirmedLeave] = useState(false);
    // const formRef = useRef<FormikProps<typeof initialFormValues>>(null);
    const navigate = useNavigate();

    const confirm = () => {
        if (
            window.confirm(
                message ?? 'Are you sure you want to leave? All your changes will be lost.',
            )
        ) {
            if (actionFns && Object.keys(actionFns)) {
                Object.keys(actionFns).map((key, value) => {
                    console.log('running', key);
                    actionFns[key]();
                });
            }
            setConfirmedLeave(true);
            navigate(-1);
            return;
        }
    };

    const onBackButtonEvent = (e: PopStateEvent) => {
        e.preventDefault();
        if (!confirmedLeave) {
            if (initialFormValues) {
                // const values = formRef.current?.values;
                // if (!isEqual(initialFormValues, values)) {
                //     confirm();
                //     return;
                // }
            } else {
                confirm();
                return;
            }
        }

        navigate(-1);
        return;
    };

    const preventUnload = (e: BeforeUnloadEvent) => {
        // NOTE: This message isn't used in modern browsers, but is required
        e.preventDefault();
        // const values = formRef.current?.values;
        // if (initialFormValues && isEqual(initialFormValues, values)) return;
        e.returnValue = '';
        return '';
    };

    const removeListeners = () => {
        window.removeEventListener('popstate', onBackButtonEvent);
        window.removeEventListener('beforeunload', preventUnload);
    };

    const addListeners = () => {
        window.history.pushState(null, window.location.pathname);
        // This event will trigger when back button is clicked
        window.addEventListener('popstate', onBackButtonEvent);
        // This event will trigger when page is reloaded
        window.addEventListener('beforeunload', preventUnload);
    };

    useEffect(() => {
        if (autoAddListener ?? true) {
            addListeners();
        }
        return () => {
            removeListeners();
        };
    }, [confirmedLeave, navigate]);

    return { removeListeners, addListeners };
}
