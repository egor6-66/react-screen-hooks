import { EffectCallback, useEffect, useRef } from 'react';

const useEffectOnce = (effect: EffectCallback) => {
    const once = useRef(false);
    useEffect(() => {
        if (!once.current) {
            effect();
        }
        once.current = true;
    }, []);
};

export default useEffectOnce;
