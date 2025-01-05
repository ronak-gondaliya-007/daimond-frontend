import React, { useEffect, useRef, useMemo } from 'react'
import Loader from '../loader';
import { useLocation } from 'react-router-dom';

const ErrorBoundaryFallback = ({
    error, resetErrorBoundary
}) => {

    const location = useLocation();
    const errorLocation = useRef(location.pathname);

    const chunkFailedMessage = useMemo(() => /Loading chunk [\d]+ failed/, []);

    const refreshPage = () => window.location.reload();

    useEffect(() => {
        if (error?.message && chunkFailedMessage.test(error.message)) {
            window.location.reload()
        }
    }, [chunkFailedMessage, error]);

    useEffect(() => {
        if (location.pathname !== errorLocation.current) {
            resetErrorBoundary();
        }
    }, [location.pathname, resetErrorBoundary])

    if (error?.message && chunkFailedMessage.test(error.message)) <Loader />

    return (
        <div className='error-boundary-fallback'>
            <h1>Oops! Something went wrong.</h1>
            <p>We apologize for the inconvenience. Please try refreshing the page or navigating to a different page.</p>
            <button onClick={refreshPage}>Refresh Page</button>
        </div>
    )
}

export default ErrorBoundaryFallback