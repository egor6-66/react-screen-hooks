import { useState } from 'react';

import { Size } from './types';
import { getWindowDimensions, useEffectOnce, debounce } from './utils';

type Props = {
    realTime?: boolean;
    debounceDelay?: number;
};

function useWindowSizeObserver(props?: Props): Size {
    const [windowDimensions, setWindowDimensions] = useState<Size>(getWindowDimensions());

    const processChange = debounce(() => setWindowDimensions(getWindowDimensions()), props?.debounceDelay);

    function handleWindowResize() {
        if (props?.debounceDelay) {
            processChange();
        } else {
            setWindowDimensions(getWindowDimensions());
        }
    }

    useEffectOnce(() => {
        if (props?.realTime !== false) {
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
