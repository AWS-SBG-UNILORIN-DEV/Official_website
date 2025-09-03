declare module '@splidejs/react-splide' {
    import { ComponentType, ReactNode } from 'react';


    export interface SplideProps{
        // onSplideMount?: (splide: any) => void
        // options?: (splide: any) => void;
        children?: ReactNode;
        className?: string;
    }

    export interface SplideSlideProps {
        children?: ReactNde;
        className?: string;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;
}