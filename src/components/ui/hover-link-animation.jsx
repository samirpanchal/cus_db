import { useEffect, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const HoverLinkAnimation = ({
  children,
  as: Tag = "span",
  className,
  effect = { type: "spring", stiffness: 260, damping: 24 },
  highlightColor = "#ffffff",
  barColor = "#2ecc71",
  barGradient,
  barThickness = 0.2,
  gapRatio = -0.1,
  ...rest
}) => {
  const ref = useRef(null);

  const MotionTag = useMemo(() => motion(Tag), [Tag]);

  useEffect(() => {
    const applyVars = () => {
      if (ref.current) {
        const size = parseFloat(getComputedStyle(ref.current).fontSize);
        ref.current.style.setProperty("--hh-bar", `${size * barThickness}px`);
        ref.current.style.setProperty("--hh-gap", `${size * gapRatio}px`);
      }
    };
    applyVars();
    window.addEventListener("resize", applyVars);
    return () => window.removeEventListener("resize", applyVars);
  }, [barThickness, gapRatio]);

  const barAnim = {
    rest: { height: "var(--hh-bar)" },
    hover: { height: "100%", transition: effect },
  };

  const textAnim = {
    rest: { color: "currentColor" },
    hover: { color: highlightColor, transition: effect },
  };

  return (
    <MotionTag
      ref={ref}
      initial="rest"
      animate="rest"
      whileHover="hover"
      className={cn("relative inline-block cursor-pointer z-10", className)}
      {...rest}
    >
      <motion.div
        aria-hidden="true"
        variants={barAnim}
        className="absolute w-full rounded-sm z-[-1]"
        style={{
          background: barGradient || barColor,
          height: "var(--hh-bar)",
          bottom: "calc(-1 * var(--hh-gap))",
          left: 0,
        }}
      />
      <motion.span variants={textAnim} className="relative block px-1">
        {children}
      </motion.span>
    </MotionTag>
  );
};
