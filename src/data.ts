import { Transition, Variants } from "framer-motion";

export const projects = [
  {
    name: "Digital garden",
    image: "/digital-garden.png",
    href: "https://github.com/ktra99/digital-garden",
  },
];

const transition: Transition = {
  duration: 0.25,
  ease: "easeOut",
};

const svgTransition: Transition = {
  duration: 1,
  ease: "easeIn",
}

const pageTransition: Transition = {
  duration: 0.5,
  ease: "easeInOut",
}

export const variants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition,
  },
  exit: {
    opacity: 0,
    transition,
  },
};

export const svgVariants: Variants = {
  initial: {
    pathLength: 0,
    transition: svgTransition
  },
  animate: {
    pathLength: 1,
    transition: svgTransition
  }
}

export const pageVariants: Variants = {
  initial: {
    y: 40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: pageTransition,
  },
  exit: {
    y: 40,
    opacity: 0,
    transition: pageTransition,
  },
};