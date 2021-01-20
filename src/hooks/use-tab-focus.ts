import { useEffect } from 'react';

export const useTabFocus = (node: HTMLElement): void => {
    useEffect(() => {
        if (node) {
            const listener = (e: KeyboardEvent) => {
                const focusable = Array.from(node.querySelectorAll('button') || []);
                const activeElement = focusable.findIndex((elem) => document.activeElement === elem);

                switch (e.key) {
                    case 'ArrowRight':
                        return (focusable[activeElement + 1] ?? focusable[0]).focus();
                    case 'ArrowLeft':
                        return (focusable[activeElement - 1] ?? focusable[focusable.length - 1]).focus();
                    case 'Enter':
                        console.log('hello');
                }
            };

            node.addEventListener('keydown', listener);
            return () => node.removeEventListener('keydown', listener);
        }
    }, []);
};
