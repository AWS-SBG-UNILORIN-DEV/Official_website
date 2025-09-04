declare module '@splidejs/react-splide' {
    import { ComponentType, ReactNode } from 'react';


    export interface SplideProps{
        options?: splideOptions;
        onSplideMount?: (splide: SplideClass) => void;
        children?: ReactNode;
        className?: string;
        ref?: Ref<SplideClass>;
    }

    export interface SplideSlideProps {
        children?: ReactNode;
        className?: string;
    }

    export const Splide: ComponentType<SplideProps>;
    export const SplideSlide: ComponentType<SplideSlideProps>;
}