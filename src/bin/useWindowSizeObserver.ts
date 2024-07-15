import { useState } from 'react';

import { getWindowDimensions, useEffectOnce } from './utils';

type Size = {
    width: number;
    height: number;
};

function useWindowSizeObserver(realTime = true): Size {
    const [windowDimensions, setWindowDimensions] = useState<Size>(getWindowDimensions());

    function handleWindowResize() {
        setWindowDimensions(getWindowDimensions());
    }

    useEffectOnce(() => {
        if (realTime) {
            window.addEventListener('resize', handleWindowResize);
        } else {
            const { width, height } = window.screen;

            setWindowDimensions({ width, height });
        }

        return () => window.removeEventListener('resize', handleWindowResize);
    });

    return {
        width: windowDimensions.width,
        height: windowDimensions.height,
    };
}

export default useWindowSizeObserver;
