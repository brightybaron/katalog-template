import { useState, type MouseEvent, type TouchEvent } from "react";
type Image = {
  src: string;
};

type LightboxProps = {
  images: Image[];
  title: string;
};

const LightboxGaleri = ({ images, title }: LightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const closeLightbox = () => {
    setIsOpen(false);
  };

  const gotoPrevious = () => {
    setCurrentIndex((currentIndex + images.length - 1) % images.length);
  };

  const gotoNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length);
  };

  const handleTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    setTouchStart(event.touches[0].clientX);
  };

  const handleTouchMove = (event: TouchEvent<HTMLDivElement>) => {
    setTouchEnd(event.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const swipeDistance = touchStart - touchEnd;

    const minSwipeDistance = 50;
    if (swipeDistance > minSwipeDistance) {
      gotoNext();
    } else if (swipeDistance < -minSwipeDistance) {
      gotoPrevious();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      !event.currentTarget.closest(".lightbox-overlay") &&
      !event.currentTarget.closest("button")
    ) {
      closeLightbox();
    }
  };

  return (
    <>
      {images.map((image, index) => (
        <div key={index} className="max-h-full aspect-square mx-auto">
          <img
            className="block w-full h-full aspect-square object-cover rounded mx-auto transition-all duration-200 hover:opacity-75 cursor-pointer"
            src={`${image.src}`}
            alt={`${title} ${index + 1}`}
            height={400}
            width={400}
            loading="lazy"
            onClick={() => openLightbox(index)}
          />
        </div>
      ))}
      {isOpen && (
        <div
          className="lightbox-overlay fixed top-0 left-0 w-full h-screen bg-[rgba(0,0,0,0.8)] flex justify-center items-center z-50"
          onClick={handleOverlayClick}
        >
          <div
            className="lightbox-container p-5 rounded-xl shadow w-[90%] max-w-[800px] my-8 mx-auto"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <img
              className="w-full h-screen object-contain"
              src={`${images[currentIndex].src}`}
              alt={`${title} ${currentIndex + 1}`}
            />
          </div>
          <div className="absolute w-full h-screen">
            <button
              className=" text-white border-none py-2 px-4 cursor-pointer hover:bg-red-400 active:bg-[#555555] absolute top-3 right-3 rounded-md font-semibold bg-red-600"
              onClick={closeLightbox}
            >
              Close
            </button>
            {images.length > 1 && (
              <>
                <button
                  className=" text-white border-none p-2 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:left-8 left-0 rounded-md font-bold"
                  onClick={gotoPrevious}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>
                <button
                  className=" text-white border-none p-2 cursor-pointer hover:bg-[#444444] active:bg-[#555555] absolute top-[47%] sm:right-8 right-0 rounded-md font-bold"
                  onClick={gotoNext}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-6 h-6"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LightboxGaleri;
