import { RefObject } from 'react';

import { Size } from './types';
import { useEffectOnce } from './utils';

type Props<T> = {
    refs: Record<keyof T, RefObject<any>> & T;
    onResize: Record<keyof T, (size: Size) => void>;
    only?: 'width' | 'height' | 'all';
};

function useDimensionsObserver<T>(props: Props<T>) {
    const { refs, onResize, only = 'all' } = props;

    useEffectOnce(() => {
        Object.entries(refs).forEach(([key, ref]: any) => {
            if (ref.current) {
                const prevSize: Size = { width: 0, height: 0 };
                new ResizeObserver((entries) => {
                    const { width, height }: Size = entries[0].contentRect;
                    if (typeof onResize[key as keyof T] === 'function') {
                        if (only === 'width') {
                            if (prevSize?.width !== width) {
                                onResize[key as keyof T]({ width: Math.ceil(width), height: Math.ceil(height) });
                                prevSize.width = width;
                                prevSize.height = height;
                            }
                        }
                        if (only === 'height') {
                            if (prevSize?.height !== height) {
                                onResize[key as keyof T]({ width: Math.ceil(width), height: Math.ceil(height) });
                                prevSize.width = width;
                                prevSize.height = height;
                            }
                        }
                        if (only === 'all') {
                            if (prevSize?.width !== width || prevSize?.height !== height) {
                                onResize[key as keyof T]({ width: Math.ceil(width), height: Math.ceil(height) });
                                prevSize.width = width;
                                prevSize.height = height;
                            }
                        }
                    }
                }).observe(ref.current);
            }
        });
    });

    return null;
}

export default useDimensionsObserver;
