import { RefObject } from 'react';

import { Size } from './types';
import { useEffectOnce } from './utils';

type Props = {
    ref?: RefObject<any>;
    onResize: (size: Size) => void;
    watch?: 'width' | 'height' | 'all';
};

function useResizeObserver(props: Props) {
    const { ref, onResize, watch = 'all' } = props;

    useEffectOnce(() => {
        const prevSize: Size = { width: 0, height: 0 };

        new ResizeObserver((entries) => {
            const { width, height }: Size = entries[0].contentRect;

            if (watch === 'width') {
                if (prevSize?.width !== width) {
                    onResize({ width: Math.ceil(width), height: Math.ceil(height) });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }

            if (watch === 'height') {
                if (prevSize?.height !== height) {
                    onResize({ width: Math.ceil(width), height: Math.ceil(height) });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }

            if (watch === 'all') {
                if (prevSize?.width !== width || prevSize?.height !== height) {
                    onResize({ width: Math.ceil(width), height: Math.ceil(height) });
                    prevSize.width = width;
                    prevSize.height = height;
                }
            }
        }).observe(ref?.current || document.body);
    });

    return null;
}

export default useResizeObserver;
