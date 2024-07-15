import { RefObject, useRef, useState } from 'react';

import { Size } from './types';
import { debounce, getWindowDimensions, useEffectOnce } from './utils';

type Returned = [RefObject<any>, Size];

type Props = {
    realTime?: boolean;
    debounceDelay?: number;
};

const useElementSizeObserver = (props?: Props): Returned => {
    const ref: any = useRef();
    const [size, setSize] = useState<Size>({ width: 0, height: 0 });

    const processChange = debounce(({ width, height }: Size) => setSize({ width: Math.ceil(width), height: Math.ceil(height) }), props?.debounceDelay);

    const updateSize = (width: number, height: number) => {
        return { width: Math.ceil(width), height: Math.ceil(height) };
    };

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            if (props?.debounceDelay) {
                processChange({ width, height });
            } else {
                setSize(updateSize(width, height));
            }
        })
    );

    useEffectOnce(() => {
        if (props?.realTime !== false) {
            observer.current.observe(ref.current);
        } else {
            const { width, height } = ref.current.getBoundingClientRect();
            if (!size) {
                setSize(updateSize(width, height));
            }
            if (size && (size.width !== width || size?.height !== height)) {
                setSize(updateSize(width, height));
            }
        }
    });

    return [ref, size];
};

export default useElementSizeObserver;
