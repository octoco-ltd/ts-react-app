// import { FormikProps } from 'formik';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface IUseConfirmLeaveProps {
    initialFormValues?: any; //add initial types that is used in form, but if re-used, this will be dynamic
}

/**
 * Ask user to confirm to leave page if hook is called on page
 *
 * @param initialFormValues Used to check of the form has changed, if not, it should not ask confirmation
 * @returns Window width and height
 */
export default function useConfirmLeave({ initialFormValues }: IUseConfirmLeaveProps) {
    //initialFormValues TODO

    const [confirmedLeave, setConfirmedLeave] = useState(false);
    const navigate = useNavigate();
    // const formRef = useRef<FormikProps<typeof initialFormValues>>(null);

    const confirm = () => {
        if (window.confirm('Are you sure you want to leave? All your changes will be lost.')) {
            setConfirmedLeave(true);
            navigate(-1);
            return;
        }
    };

    useEffect(() => {
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

        window.history.pushState(null, window.location.pathname);
        // This event will trigger when back button is clicked
        window.addEventListener('popstate', onBackButtonEvent);
        // This event will trigger when page is reloaded
        window.addEventListener('beforeunload', preventUnload);
        return () => {
            window.removeEventListener('popstate', onBackButtonEvent);
            window.removeEventListener('beforeunload', preventUnload);
        };
    }, [confirmedLeave, navigate]);
}
