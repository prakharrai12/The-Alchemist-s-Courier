import { useMemo } from "react";
import { motion } from "framer-motion";

const random = (min, max) => Math.random() * (max - min) + min;

const DustParticles = ({ count = 24 }) => {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => ({
        id: index,
        left: `${random(2, 98)}%`,
        size: random(3, 10),
        opacity: random(0.08, 0.25),
        delay: random(0, 5),
        duration: random(4, 10),
        drift: random(-15, 15),
      })),
    [count]
  );

  return (
    <div
      className="dust-particles"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      {particles.map(({ id, left, size, opacity, delay, duration, drift }) => (
        <motion.span
          key={id}
          className="dust-particle"
          initial={{ opacity: 0, y: 0, x: 0 }}
          animate={{ opacity, y: [-6, 6, -6], x: [0, drift, 0] }}
          transition={{
            loop: Infinity,
            ease: "easeInOut",
            duration,
            delay,
          }}
          style={{
            position: "absolute",
            left,
            top: `${random(2, 98)}%`,
            width: size,
            height: size,
            borderRadius: "50%",
            background: "rgba(255, 245, 225, 0.9)",
            opacity,
            filter: "blur(0.4px)",
          }}
        />
      ))}
    </div>
  );
};

export default DustParticles;
