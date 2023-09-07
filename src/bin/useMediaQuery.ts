import useWindowDimensions from './useWindowDimensions';

type Props<T> = {
    widthBreakpoints: Record<keyof T, number>;
    heightBreakpoints: Record<keyof T, number>;
};

function ConfigMediaQuery<T, K extends keyof T>(props: Props<T>) {
    const { widthBreakpoints, heightBreakpoints } = props;

    const useWidthMediaQuery = () => {
        const { width } = useWindowDimensions();
        const getCurrent = () => {
            const bp = Object.entries(widthBreakpoints)
                .reverse()
                .find(([key, value]: any) => value <= width);
            return bp ? bp[0] : undefined;
        };

        const only = (only: K): boolean => {
            return getCurrent() === only;
        };

        const from = (from: K): boolean => {
            return widthBreakpoints[from] <= width;
        };
        const to = (to: K): boolean => {
            return widthBreakpoints[to] >= width;
        };
        const fromTo = (from: K, to: K): boolean => {
            return widthBreakpoints[from] <= width && widthBreakpoints[to] >= width;
        };

        return { getCurrent, only, from, to, fromTo };
    };

    const useHeightMediaQuery = () => {
        const { height } = useWindowDimensions();
        const getCurrent = () => {
            const bp = Object.entries(heightBreakpoints)
                .reverse()
                .find(([key, value]: any) => value <= height);
            return bp ? bp[0] : undefined;
        };

        const only = (only: K): boolean => {
            return getCurrent() === only;
        };

        const from = (from: K): boolean => {
            return heightBreakpoints[from] <= height;
        };
        const to = (to: K): boolean => {
            return heightBreakpoints[to] >= height;
        };
        const fromTo = (from: K, to: K): boolean => {
            return heightBreakpoints[from] <= height && heightBreakpoints[to] >= height;
        };

        return { getCurrent, only, from, to, fromTo };
    };
    return { useWidthMediaQuery, useHeightMediaQuery };
}

export default ConfigMediaQuery;
