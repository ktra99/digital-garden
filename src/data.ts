import {
  ChartBarSquareIcon,
  EnvelopeIcon,
  HomeIcon,
  RectangleStackIcon,
} from "@heroicons/react/20/solid";

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
    href: "https://github.com/ktra99/digital-garden",
  },
  {
    name: "To do app",
    href: "https://github.com/ktra99/todo",
  },
  {
    name: "Ecommerce template",
    href: "https://github.com/ktra99/ecommerce",
  },
  {
    name: "Geoguessr inspired game",
    href: "https://github.com/ktra99/geo",
  },
  {
    name: "Bank ID mockup",
    href: "https://github.com/ktra99/bankid",
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