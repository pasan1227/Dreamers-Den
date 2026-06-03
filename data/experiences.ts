import type { Experience } from "@/lib/types";

// Unsplash CDN photos — free under the Unsplash License. Sized for the card aspect ratio.
const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1200&q=80`;

export const experiences: ReadonlyArray<Experience> = [
  {
    id: "pedro",
    title: "Pedro Tea Estate Tour",
    summary:
      "Walk the green corridors of one of Ceylon's oldest tea estates, established in 1885. A guided 45-minute tour follows the leaf from plucker's basket through withering, rolling, fermenting, and grading — finished with a cup at the factory tasting room.",
    distance: "10 min drive · 3 km east",
    image: unsplash("photo-1585171328560-947fbd92d6f0"),
    imageAlt: "Tea pluckers working a misty hillside plantation in Sri Lanka",
    icon: "tea",
  },
  {
    id: "horton",
    title: "Horton Plains & World's End",
    summary:
      "A pre-dawn departure (we'll wake you at 4:30) to reach the gate as it opens at 6am — the only window before cloud swallows the view. The 9.5 km loop walks you to the 870-metre cliff drop at World's End, then back via the tea-coloured pools of Baker's Falls.",
    distance: "1.5 hr drive · pre-dawn start",
    image: unsplash("photo-1695188604020-5b508484d5a0"),
    imageAlt: "Sheer cliff edge at World's End, Horton Plains, with cloud rolling over the highlands",
    icon: "mountain",
  },
  {
    id: "gregory",
    title: "Gregory Lake at Sunrise",
    summary:
      "Built as a reservoir in 1873 by Governor Sir William Gregory, the lake now sits at the heart of town. Paddle a swan boat at first light, walk the 2.5 km shoreline path, or just sit on the grass with a thermos of Ceylon tea — the morning air bites in the best way.",
    distance: "5 min drive · 1.6 km",
    image: unsplash("photo-1619974643633-12acfdcedd16"),
    imageAlt: "Misty Gregory Lake at sunrise framed by tea-clad hills",
    icon: "lake",
  },
  {
    id: "ramboda",
    title: "Ramboda Falls",
    summary:
      "A 109-metre, three-tiered cascade tumbling beside the Peradeniya–Badulla highway — the eleventh-tallest waterfall in Sri Lanka. Paved steps lead from the road to a viewing terrace; for the quieter upper trail, ask us and we'll point the way.",
    distance: "45 min drive · 23 km north",
    image: unsplash("photo-1683604393889-60baf8b7eb15"),
    imageAlt: "Ramboda Falls cascading through dense tropical forest",
    icon: "water",
  },
  {
    id: "single-tree",
    title: "Single Tree Hill Sunrise",
    summary:
      "A 4 km loop through the tea estates to a 2,100-metre summit — the highest viewpoint within walking distance of town. Leave at first light and you'll watch the mist peel back off the Hakgala range, Pidurutalagala behind you, and Gregory Lake catching gold below.",
    distance: "15 min drive + 90 min hike",
    image: unsplash("photo-1696233962066-b284056f0443"),
    imageAlt: "Sunrise over the misty mountain ranges of the Sri Lankan highlands",
    icon: "mountain",
  },
  {
    id: "hakgala",
    title: "Hakgala Botanical Garden",
    summary:
      "Sri Lanka's second-oldest botanical garden, terraced across 28 hectares of cloud forest on the slope of Hakgala rock. Roses, monkey orchids, and a Japanese garden bloom against a backdrop of strawberry farms and Ramayana legend. Gates open 7:30am.",
    distance: "20 min drive · 10 km south",
    image: unsplash("photo-1708338914870-797de586672d"),
    imageAlt: "Lush green hillside garden in the Sri Lankan highlands",
    icon: "leaf",
  },
];
