import { useEffect, useState } from "react";

export default function useWindowSize() {
    const [size, setSize] = useState(() => ({
        width: typeof window === "undefined" ? 0 : window.innerWidth,
        height: typeof window === "undefined" ? 0 : window.innerHeight,
    }));

    useEffect(() => {
        function updateSize() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        }

        window.addEventListener("resize", updateSize, { passive: true });
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
}
