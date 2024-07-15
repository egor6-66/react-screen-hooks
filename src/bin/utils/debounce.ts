function debounce(func: any, timeout = 300) {
    if (typeof window === 'undefined') {
        return () => '';
    }

    let timer: any = null;

    return (...args: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            // @ts-ignore
            func.apply(this, args);
        }, timeout);
    };
}

export default debounce;
