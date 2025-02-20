import { useState, useEffect } from "react"

export function ImageSlider({ images }: { images: any[] }) {
    const [currentIndex, setCurrentIndex] = useState(0)
    const [isTransitioning, setIsTransitioning] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [touchStart, setTouchStart] = useState<number | null>(null)
    const [, setDirection] = useState<'left' | 'right' | null>(null)

    const next = () => {
        if (currentIndex < images.length - 1 && !isTransitioning) {
            setDirection('right')
            setIsTransitioning(true)
            setCurrentIndex((prev) => prev + 1)
        }
    }

    const prev = () => {
        if (currentIndex > 0 && !isTransitioning) {
            setDirection('left')
            setIsTransitioning(true)
            setCurrentIndex((prev) => prev - 1)
        }
    }

    const jumpToImage = (index: number) => {
        if (index === currentIndex || isTransitioning) return
        setDirection(index > currentIndex ? 'right' : 'left')
        setIsTransitioning(true)
        setCurrentIndex(index)
    }

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.body.style.overflow = 'hidden' // Prevent scrolling when fullscreen
        } else {
            document.body.style.overflow = 'auto'
        }
        setIsFullscreen(!isFullscreen)
    }

    const handleTransitionEnd = () => {
        setIsTransitioning(false)
        setDirection(null)
    }

    // Cleanup overflow style on unmount
    useEffect(() => {
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [])

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') prev()
            if (e.key === 'ArrowRight') next()
            if (e.key === 'Escape') setIsFullscreen(false)
            if (e.key === 'f') toggleFullscreen()
        }
        window.addEventListener('keydown', handleKeyPress)
        return () => window.removeEventListener('keydown', handleKeyPress)
    }, [currentIndex, isTransitioning])

    // Handle touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        if (isTransitioning) return
        setTouchStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!touchStart || isTransitioning) return
        
        const touchEnd = e.touches[0].clientX
        const diff = touchStart - touchEnd

        if (Math.abs(diff) > 50) { // Min swipe distance
            if (diff > 0 && currentIndex < images.length - 1) {
                next()
            } else if (diff < 0 && currentIndex > 0) {
                prev()
            }
            setTouchStart(null)
        }
    }

    return (
        <div 
            className={`
                transition-all duration-300 ease-in-out
                ${isFullscreen 
                    ? 'fixed inset-0 z-50 bg-black/95 backdrop-blur-lg' 
                    : 'relative bg-gray-900 rounded-xl h-96 sm:min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)]'
                }
                group overflow-hidden
            `}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
        >
            {/* Exit fullscreen button */}
            {isFullscreen && (
                <button 
                    onClick={toggleFullscreen}
                    className="absolute top-4 left-4 z-30 bg-black/50 text-white p-2 rounded-full backdrop-blur-sm hover:bg-black/70 transition-all transform hover:scale-110"
                    title="Exit Fullscreen (Esc)"
                >
                    ✕
                </button>
            )}

            {/* Top controls */}
            <div className={`
                absolute top-4 right-4 flex items-center space-x-2 z-20
                ${isFullscreen ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'}
                transition-opacity duration-200
            `}>
                <div className="bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                    {currentIndex + 1} / {images.length}
                </div>

                {!isFullscreen && (
                    <button 
                        onClick={toggleFullscreen}
                        className="bg-black/50 p-2 rounded-full backdrop-blur-sm text-white hover:bg-black/70 transition-all transform hover:scale-110"
                        title="Fullscreen (F)"
                    >
                        ⤢
                    </button>
                )}
            </div>

            {/* Image container */}
            <div className={`
                w-full h-full relative
                ${isFullscreen ? 'p-4 sm:p-8' : ''}
            `}>
                {images.map((image, index) => (
                    <div
                        key={index}
                        className={`
                            absolute inset-0 flex justify-center items-center
                            transition-transform duration-500 ease-in-out
                            ${index === currentIndex 
                                ? 'translate-x-0' 
                                : index < currentIndex 
                                    ? '-translate-x-full' 
                                    : 'translate-x-full'
                            }
                        `}
                    >
                        <img 
                            className={`
                                max-h-full max-w-full object-contain
                                transition-all duration-300
                                ${isFullscreen ? 'p-4 sm:p-8' : 'my-4 px-12'}
                                ${isTransitioning ? 'scale-95' : 'scale-100'}
                                hover:scale-105
                            `}
                            src={image.link}
                            alt={`Image ${index + 1}`}
                            onTransitionEnd={handleTransitionEnd}
                            draggable={false}
                        />
                    </div>
                ))}
            </div>

            {/* Navigation buttons */}
            <div className={`
                absolute inset-y-0 left-0 right-0 flex items-center justify-between px-4
                ${isFullscreen ? 'opacity-100 px-6 sm:px-12' : 'opacity-0 group-hover:opacity-100'}
                transition-opacity duration-200
            `}>
                {currentIndex > 0 && (
                    <button
                        className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 backdrop-blur-sm transform hover:scale-110 hover:shadow-lg disabled:opacity-50"
                        onClick={prev}
                        disabled={isTransitioning}
                        title="Previous (←)"
                    >
                        ❮
                    </button>
                )}
                {currentIndex < images.length - 1 && (
                    <button
                        className="bg-black/50 text-white p-3 rounded-full hover:bg-black/70 transition-all duration-200 backdrop-blur-sm transform hover:scale-110 hover:shadow-lg disabled:opacity-50"
                        onClick={next}
                        disabled={isTransitioning}
                        title="Next (→)"
                    >
                        ❯
                    </button>
                )}
            </div>

            {/* Thumbnail navigation */}
            <div className={`
                absolute bottom-4 left-1/2 transform -translate-x-1/2
                flex space-x-3 bg-black/30 rounded-full p-2 backdrop-blur-sm
                ${isFullscreen ? 'opacity-100' : 'opacity-100 group-hover:opacity-100'}
                transition-opacity duration-200
            `}>
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => jumpToImage(index)}
                        disabled={isTransitioning}
                        className={`
                            transition-all duration-200 rounded-full
                            hover:shadow-lg disabled:opacity-50
                            ${index === currentIndex 
                                ? 'w-3 h-3 bg-white' 
                                : 'w-2 h-2 bg-white/50 hover:bg-white/75 hover:scale-110'
                            }
                        `}
                        title={`Image ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    )
}