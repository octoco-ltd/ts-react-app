import { useState, useEffect } from 'react';

/**
 * Get the browser window inner width and inner height.
 *
 * @returns Window width and height
 */
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height,
    };
};

/**
 * Will return the window current width and height, and will return a new value whenever the window is resized
 *
 * @returns Window width and height
 */
export const useWindowDimensions = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return windowDimensions;
};
