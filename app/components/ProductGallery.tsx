"use client";

import { useEffect, useMemo, useState } from "react";

type Props = {
  images: string[];
  productName: string;
};

export default function ProductGallery({
  images,
  productName,
}: Props) {
  // Clean image list
  const validImages = useMemo(() => {
    return Array.from(
      new Set(
        (images || []).filter(
          (img): img is string =>
            typeof img === "string" && img.trim().length > 0
        )
      )
    );
  }, [images]);

  // Selected image
  const [selectedImage, setSelectedImage] = useState(
    validImages[0] || ""
  );

  // Full screen viewer
  const [isOpen, setIsOpen] = useState(false);

  // Sync selected image whenever product images change
  useEffect(() => {
    if (validImages.length === 0) {
      setSelectedImage("");
      return;
    }

    // Keep current image if it still exists
    if (validImages.includes(selectedImage)) {
      return;
    }

    // Otherwise select first image
    setSelectedImage(validImages[0]);
  }, [validImages, selectedImage]);

  const currentIndex = validImages.indexOf(selectedImage);

  const showPrevious = () => {
    if (currentIndex > 0) {
      setSelectedImage(validImages[currentIndex - 1]);
    }
  };

  const showNext = () => {
    if (currentIndex < validImages.length - 1) {
      setSelectedImage(validImages[currentIndex + 1]);
    }
  };

  return (
    <div className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm">

      {/* =========================
          MAIN IMAGE
      ========================== */}
      <div className="overflow-hidden rounded-xl bg-white">

        {selectedImage ? (
          <img
            src={selectedImage}
            alt={productName}
            onClick={() => setIsOpen(true)}
            className="w-full h-[420px] object-contain cursor-zoom-in transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-[420px] flex items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}

      </div>

      {/* =========================
          IMAGE THUMBNAILS
      ========================== */}
      {validImages.length > 1 && (
        <div className="flex gap-3 mt-4 flex-wrap">

          {validImages.map((img, index) => (
            <button
              key={`${img}-${index}`}
              type="button"
              onClick={() => setSelectedImage(img)}
              className={`
                w-20 h-20
                rounded-lg
                border-2
                p-2
                bg-white
                transition-all
                duration-300
                ${
                  selectedImage === img
                    ? "border-blue-600 shadow-md scale-105"
                    : "border-slate-200 hover:border-blue-400 hover:shadow-sm"
                }
              `}
            >
              <img
                src={img}
                alt={`${productName} image ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </button>
          ))}

        </div>
      )}

      {/* =========================
          FULL SCREEN IMAGE VIEWER
      ========================== */}
      {isOpen && selectedImage && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center"
          onClick={() => setIsOpen(false)}
        >

          {/* CLOSE BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsOpen(false);
            }}
            className="
              fixed
              top-6
              right-6
              z-[10001]
              w-11
              h-11
              rounded-full
              bg-white/20
              backdrop-blur-md
              border
              border-white/30
              text-white
              text-2xl
              font-bold
              flex
              items-center
              justify-center
              hover:bg-white/30
              transition-all
            "
          >
            ✕
          </button>

          {/* PREVIOUS BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showPrevious();
            }}
            disabled={currentIndex <= 0}
            className="
              absolute
              left-6
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white/20
              backdrop-blur-md
              border
              border-white/30
              text-white
              text-3xl
              flex
              items-center
              justify-center
              hover:bg-white/40
              disabled:opacity-30
              disabled:cursor-not-allowed
              z-[10001]
            "
          >
            ‹
          </button>

          {/* LARGE IMAGE */}
          <div
            className="
              relative
              flex
              items-center
              justify-center
              w-screen
              h-screen
              p-16
            "
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt={productName}
              className="max-w-full max-h-full object-contain"
            />
          </div>

          {/* NEXT BUTTON */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              showNext();
            }}
            disabled={
              currentIndex < 0 ||
              currentIndex >= validImages.length - 1
            }
            className="
              absolute
              right-6
              top-1/2
              -translate-y-1/2
              w-12
              h-12
              rounded-full
              bg-white/20
              backdrop-blur-md
              border
              border-white/30
              text-white
              text-3xl
              flex
              items-center
              justify-center
              hover:bg-white/40
              disabled:opacity-30
              disabled:cursor-not-allowed
              z-[10001]
            "
          >
            ›
          </button>

          {/* IMAGE COUNTER */}
          <div
            className="
              absolute
              bottom-6
              left-1/2
              -translate-x-1/2
              bg-black/60
              text-white
              px-4
              py-2
              rounded-full
              text-sm
              font-medium
            "
          >
            {currentIndex + 1} / {validImages.length}
          </div>

        </div>
      )}

    </div>
  );
}