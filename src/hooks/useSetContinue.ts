import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

/**
 * Used to manage a redirect from query params in the url
 *
 * @returns {() => void} handleRedirect - function of redirecting to specified redirect
 * @returns {string} mode - the mode (name) use for display
 * @returns {string} action - action to send in url param on redirect
 * @returns {bool} redirect - path to redirect to
 */
export default function useSetContinue() {
    const [searchParams, setSearchParams] = useSearchParams();
    const [mode, setMode] = useState<null | undefined | string>();
    const [action, setAction] = useState<null | undefined | string>();
    const [redirect, setRedirect] = useState<null | undefined | string>();
    const navigate = useNavigate();

    useEffect(() => {
        if (searchParams.has('mode')) {
            setMode(searchParams.get('mode'));
        }
        if (searchParams.has('redirect')) {
            setRedirect(searchParams.get('redirect'));
        }
        if (searchParams.has('action')) {
            setAction(searchParams.get('action'));
        }
    }, [searchParams]);

    const handleRedirect = () => {
        navigate(`/${redirect ? redirect : 'home'}${action ? `?action=${action}` : ''}${mode ? `?mode=${mode}`:''}`, { replace: true });
    };

    return { handleRedirect, mode, action, redirect };
}
