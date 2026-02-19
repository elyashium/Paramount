"use client";
import React, {
    useEffect,
    useRef,
    useState,
    createContext,
    useContext,
} from "react";
import {
    IconArrowNarrowLeft,
    IconArrowNarrowRight,
    IconX,
} from "@tabler/icons-react";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import Image, { ImageProps } from "next/image";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface CarouselProps {
    items: JSX.Element[];
    initialScroll?: number;
}

export type Card = {
    src: string;
    title: string;
    category: string;
    content: React.ReactNode;
};

export const CarouselContext = createContext<{
    onCardClose: (index: number) => void;
    currentIndex: number;
}>({
    onCardClose: () => { },
    currentIndex: 0,
});

export const Carousel = ({ items, initialScroll = 0 }: CarouselProps) => {
    const carouselRef = React.useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = React.useState(false);
    const [canScrollRight, setCanScrollRight] = React.useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (carouselRef.current) {
            carouselRef.current.scrollLeft = initialScroll;
            checkScrollability();
        }
    }, [initialScroll]);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
        }
    };

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        }
    };

    const handleCardClose = (index: number) => {
        if (carouselRef.current) {
            const cardWidth = isMobile() ? 230 : 384;
            const gap = isMobile() ? 4 : 8;
            const scrollPosition = (cardWidth + gap) * (index + 1);
            carouselRef.current.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
            setCurrentIndex(index);
        }
    };

    const isMobile = () => {
        return typeof window !== "undefined" && window.innerWidth < 768;
    };

    return (
        <CarouselContext.Provider
            value={{ onCardClose: handleCardClose, currentIndex }}
        >
            <div className="relative w-full">
                <div
                    className="flex w-full overflow-x-scroll overscroll-x-auto scroll-smooth py-10 [scrollbar-width:none] md:py-20"
                    ref={carouselRef}
                    onScroll={checkScrollability}
                >
                    <div
                        className={cn(
                            "flex flex-row justify-start gap-4 pl-4",
                            "mx-auto max-w-7xl",
                        )}
                    >
                        {items.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{
                                    opacity: 1,
                                    y: 0,
                                    transition: {
                                        duration: 0.5,
                                        delay: 0.1 * index,
                                        ease: "easeOut",
                                    },
                                }}
                                key={"card" + index}
                                className="rounded-3xl last:pr-[5%] md:last:pr-[33%]"
                            >
                                {item}
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Scroll arrows */}
                <div className="mr-10 flex justify-end gap-2">
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-[#E8B84B]/20 transition-colors"
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        aria-label="Scroll left"
                    >
                        <IconArrowNarrowLeft className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                    <button
                        className="relative z-40 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800 disabled:opacity-30 hover:bg-[#E8B84B]/20 transition-colors"
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        aria-label="Scroll right"
                    >
                        <IconArrowNarrowRight className="h-6 w-6 text-gray-700 dark:text-gray-300" />
                    </button>
                </div>
            </div>
        </CarouselContext.Provider>
    );
};

export const Card = ({
    card,
    index,
    layout = false,
}: {
    card: Card;
    index: number;
    layout?: boolean;
}) => {
    const [open, setOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const { onCardClose } = useContext(CarouselContext);

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") handleClose();
        }
        document.body.style.overflow = open ? "hidden" : "auto";
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    useOutsideClick(containerRef, () => handleClose());

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
        onCardClose(index);
    };

    return (
        <>
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 h-screen overflow-auto">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 h-full w-full bg-black/80 backdrop-blur-lg"
                        />
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            ref={containerRef}
                            layoutId={layout ? `card-${card.title}` : undefined}
                            className="relative z-[60] mx-auto my-10 h-fit max-w-3xl rounded-3xl bg-white p-6 font-sans md:p-10 dark:bg-neutral-900"
                        >
                            <button
                                className="sticky top-4 right-0 ml-auto flex h-8 w-8 items-center justify-center rounded-full bg-black dark:bg-white"
                                onClick={handleClose}
                                aria-label="Close"
                            >
                                <IconX className="h-5 w-5 text-neutral-100 dark:text-neutral-900" />
                            </button>
                            <motion.p
                                layoutId={layout ? `category-${card.title}` : undefined}
                                className="text-sm font-semibold text-[#E8B84B] uppercase tracking-widest"
                            >
                                {card.category}
                            </motion.p>
                            <motion.p
                                layoutId={layout ? `title-${card.title}` : undefined}
                                className="mt-3 text-2xl font-black text-neutral-800 md:text-4xl dark:text-white"
                            >
                                {card.title}
                            </motion.p>
                            <div className="py-8">{card.content}</div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                layoutId={layout ? `card-${card.title}` : undefined}
                onClick={handleOpen}
                className="relative z-10 flex h-80 w-56 flex-col items-start justify-start overflow-hidden rounded-3xl bg-gray-100 md:h-[36rem] md:w-80 dark:bg-neutral-900"
                aria-label={`View profile of ${card.title}`}
            >
                {/* top gradient so text is always readable */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-2/3 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Text at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-40 p-6">
                    <motion.p
                        layoutId={layout ? `category-${card.category}` : undefined}
                        className="text-left font-sans text-xs font-semibold tracking-widest uppercase text-[#E8B84B]"
                    >
                        {card.category}
                    </motion.p>
                    <motion.p
                        layoutId={layout ? `title-${card.title}` : undefined}
                        className="mt-1 text-left font-sans text-xl font-black text-white [text-wrap:balance]"
                    >
                        {card.title}
                    </motion.p>
                </div>

                <BlurImage
                    src={card.src}
                    alt={`Photo of ${card.title}`}
                    fill
                    className="absolute inset-0 z-10 object-cover"
                    sizes="(max-width: 768px) 224px, 320px"
                />
            </motion.button>
        </>
    );
};

/**
 * BlurImage — uses Next.js <Image> for automatic WebP/AVIF conversion,
 * responsive sizes, and lazy loading. Shows a blur placeholder while loading.
 */
export const BlurImage = ({
    className,
    alt,
    src,
    ...rest
}: ImageProps) => {
    const [isLoading, setLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    return (
        <div className={cn("relative overflow-hidden", className)}>
            {/* Fallback placeholder while image loads or if missing */}
            {(isLoading || hasError) && (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800">
                    {hasError && (
                        <svg
                            className="w-16 h-16 text-gray-400 dark:text-gray-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1}
                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                        </svg>
                    )}
                </div>
            )}
            {!hasError && (
                <Image
                    className={cn(
                        "transition-all duration-500 object-cover",
                        isLoading ? "scale-105 blur-sm" : "scale-100 blur-0",
                    )}
                    onLoad={() => setLoading(false)}
                    onError={() => { setLoading(false); setHasError(true); }}
                    src={src}
                    alt={alt ?? "Faculty member"}
                    fill
                    {...rest}
                />
            )}
        </div>
    );
};
