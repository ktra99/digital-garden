import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleStackIcon
} from "@heroicons/react/20/solid";
import { Transition, Variants } from "framer-motion";

export const nav = {
  "en": [
    { x: 0, width: 4 },
    { x: 5.3, width: 4.5 },
    { x: 11.1, width: 6.25 },
    { x: 18.5, width: 5.8 }
  ],
  "sv": [
    { x: 0.05, width: 3.5 },
    { x: 4.75, width: 6.75 },
    { x: 12.75, width: 5.75 },
    { x: 19.65, width: 5.75 }
  ]
}

export const projects = [
  {
    name: "Digital garden",
    image: "/digital-garden.png",
    href: "https://github.com/ktra99/digital-garden",
  },
];

export const navigation = [
  {
    name: "Home",
    icon: HomeIcon,
    href: "/",
  },
  {
    name: "Stats",
    icon: ChartBarSquareIcon,
    href: "#stats",
  },
  {
    name: "Projects",
    icon: RectangleStackIcon,
    href: "#projects",
  },
  {
    name: "Contact",
    icon: EnvelopeIcon,
    href: "mailto:kennytran.dev@outlook.com",
  },
];

const transition: Transition = {
  duration: 0.25,
  ease: "easeOut",
};

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