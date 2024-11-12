import React, { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "framer-motion";
import useMeasure from "react-use-measure";
interface CardProps {
  image: string;
}

interface LeftCarouselProps {
  images: any[];
}

const Card: React.FC<CardProps> = ({ image}) => {
  return (
    <div className="w-[200px] h-[100px] flex-shrink-0 rounded-lg overflow-hidden">
      <img src={image} alt="Tech Logo" className="w-full h-full object-cover" />
    </div>
  );
};


const LeftCarousel: React.FC<LeftCarouselProps> = ({ images }) => {
  const FAST_DURATION = 60;
  const SLOW_DURATION = 90;

  const [duration, setDuration] = useState(FAST_DURATION);
  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);

  const [ref, { width }] = useMeasure();
  const xTranslation = useMotionValue(0);

  useEffect(() => {
    const finalPosition = -width * 2 - 8; // Width times 2 for duplicate array, plus 8px gap
    let controls;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return () => controls.stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [xTranslation, width, duration, rerender]);

  return (
    <main className="h-[150px] w-full relative overflow-x-hidden flex items-center">
      <motion.div
        className="absolute w-full left-0 flex gap-4"
        ref={ref}
        style={{ x: xTranslation }}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {[...images, ...images].map((image, index) => (
          <Card image={image.src} key={index} />
        ))}
      </motion.div>
    </main>
  );
};

export default LeftCarousel;
