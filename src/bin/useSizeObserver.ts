import { RefObject } from 'react';

import { Size } from './types';
import { debounce, useEffectOnce } from './utils';

type Props = {
    ref?: RefObject<any>;
    onResize: (size: Size) => void;
    watch?: 'width' | 'height' | 'all';
    debounceDelay?: number;
};

function useSizeObserver(props: Props) {
    const { ref, onResize, watch = 'all' } = props;

    const processChange = debounce((size: Size) => onResize(size), props?.debounceDelay);

    const updater = ({ width, height }: Size) => {
        if (props?.debounceDelay) {
            processChange({ width: Math.ceil(width), height: Math.ceil(height) });
        } else {
            onResize({ width: Math.ceil(width), height: Math.ceil(height) });
        }
    };

    useEffectOnce(() => {
        const prevSize: Size = { width: 0, height: 0 };

        new ResizeObserver((entries) => {
            const { width, height }: Size = entries[0].contentRect;

            if (watch === 'width') {
                if (prevSize?.width !== width) {
                    updater({ width, height });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }
            if (watch === 'height') {
                if (prevSize?.height !== height) {
                    updater({ width, height });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }
            if (watch === 'all') {
                if (prevSize?.width !== width || prevSize?.height !== height) {
                    updater({ width, height });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }
        }).observe(ref?.current || document.body);
    });

    return null;
}

export default useSizeObserver;
