import { RefObject, useRef, useState } from 'react';

import { Size } from './types';
import { useEffectOnce } from './utils';

type Returned = [Size | undefined, RefObject<any>];

const useElementDimensions = (realTime = true): Returned => {
    const ref: any = useRef();
    const [size, setSize] = useState<Size | undefined>(undefined);

    const updateSize = (width: number, height: number) => {
        return { width: Math.ceil(width), height: Math.ceil(height) };
    };

    const observer = useRef(
        new ResizeObserver((entries) => {
            const { width, height } = entries[0].contentRect;
            setSize(updateSize(width, height));
        })
    );

    useEffectOnce(() => {
        if (realTime) {
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

    return [size, ref];
};

export default useElementDimensions;
