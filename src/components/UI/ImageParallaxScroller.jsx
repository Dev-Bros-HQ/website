import { useEffect, useRef } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

const ImageParallaxScroller = ({ images, onImageSelect, title }) => {
  const trackRef = useRef();

  useEffect(() => {
    const handleOnDown = (e) =>
      (trackRef.current.dataset.mouseDownAt = e.clientX);

    const handleOnUp = () => {
      trackRef.current.dataset.mouseDownAt = "0";
      trackRef.current.dataset.prevPercentage =
        trackRef.current.dataset.percentage;
    };

    const handleOnMove = (e) => {
      if (trackRef.current.dataset.mouseDownAt === "0") return;

      const mouseDelta =
          parseFloat(trackRef.current.dataset.mouseDownAt) - e.clientX,
        maxDelta = window.innerWidth / 0.75;

      const percentage = (mouseDelta / maxDelta) * -100,
        nextPercentageUnconstrained =
          parseFloat(trackRef.current.dataset.prevPercentage) + percentage,
        nextPercentage = Math.max(
          Math.min(nextPercentageUnconstrained, 0),
          -100
        );

      trackRef.current.dataset.percentage = nextPercentage;

      trackRef.current.animate(
        {
          transform: `translate(${nextPercentage}%, -50%)`,
        },
        { duration: 1200, fill: "forwards" }
      );

      for (const image of trackRef.current.getElementsByClassName("image")) {
        image.animate(
          {
            objectPosition: `${100 + nextPercentage / 2}% center`,
          },
          { duration: 1200, fill: "forwards" }
        );
      }
    };

    window.onmousedown = (e) => handleOnDown(e);
    window.ontouchstart = (e) => handleOnDown(e.touches[0]);
    window.onmouseup = (e) => handleOnUp(e);
    window.ontouchend = (e) => handleOnUp(e.touches[0]);
    window.onmousemove = (e) => handleOnMove(e);
    window.ontouchmove = (e) => handleOnMove(e.touches[0]);

    return () => {
      window.onmousedown = null;
      window.ontouchstart = null;
      window.onmouseup = null;
      window.ontouchend = null;
      window.onmousemove = null;
      window.ontouchmove = null;
    };
  }, []);

  return (
    <div className="relative h-screen m-0 overflow-hidden w-[calc(100vw-19px)] -mt-[68px] ">
      <br />
      <br />
      <br />
      <br />
      <h1 className="text-6xl text-center">{title}</h1>
      <div
        id="image-track"
        ref={trackRef}
        data-mouse-down-at="0"
        data-prev-percentage="0"
        className="flex gap-[4vmin] absolute left-1/2 top-1/2 translate-x-0 -translate-y-1/2 select-none cursor-grab"
      >
        {images.map((image, imageIndex) => {
          const { value, url, label } = image;
          return (
            <div
              key={`image-scroll-${value}-${imageIndex}`}
              className="relative rounded-lg overflow-hidden bg-neutral"
            >
              <LazyLoadImage
                key={url}
                className="image w-[40vmin] h-[56vmin] object-cover object-[100%_center] relative block max-w-none"
                src={url}
                draggable="false"
                visibleByDefault={true}
                effect="opacity"
              />
              <p className="absolute top-2 left-1/2 -translate-x-1/2 text-[rgba(255,255,255,.3)] uppercase text-6xl font-bold text-center">
                {label}
              </p>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                <button
                  onClick={() => onImageSelect(value)}
                  className="btn btn-primary"
                >
                  Select {label}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ImageParallaxScroller;
