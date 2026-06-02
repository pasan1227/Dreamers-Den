import type { Experience } from "@/lib/types";

export const experiences: ReadonlyArray<Experience> = [
  {
    id: "tea",
    title: "Tea Factory Tour",
    summary:
      "Walk the green corridors of Pedro and Damro estates. Watch the rolling, fermenting, and grading of Ceylon's finest single-origin leaf.",
    distance: "20 min drive",
    image: "/images/exp-tea.svg",
    imageAlt: "Tea pluckers in a misty plantation",
    icon: "tea",
  },
  {
    id: "ramboda",
    title: "Ramboda Falls",
    summary:
      "A 109-metre cascade that the locals call the heart of the hill country. We'll point you toward the quieter viewing trail few tourists find.",
    distance: "35 min drive",
    image: "/images/exp-ramboda.svg",
    imageAlt: "Ramboda waterfall through tropical forest",
    icon: "water",
  },
  {
    id: "gregory",
    title: "Gregory Lake",
    summary:
      "Row a paddle boat at dawn or wander the lakeside park. Bring a thermos of tea — the morning air bites in the best way.",
    distance: "5 min drive · 1.6 km",
    image: "/images/exp-gregory.svg",
    imageAlt: "Misty Gregory Lake at sunrise",
    icon: "lake",
  },
  {
    id: "cooking",
    title: "Home Cooking Course",
    summary:
      "Spend an afternoon with our host learning hopper batter, pol sambol, and a slow Ceylon curry passed down three generations.",
    distance: "On property",
    image: "/images/exp-cooking.svg",
    imageAlt: "Traditional Sri Lankan curry being prepared",
    icon: "pan",
  },
  {
    id: "horton",
    title: "Horton Plains & World's End",
    summary:
      "A guided pre-dawn departure to the cliff edge where the highlands fall away to the lowland plains 870 metres below.",
    distance: "1.5 hr drive",
    image: "/images/exp-horton.svg",
    imageAlt: "World's End viewpoint at Horton Plains",
    icon: "mountain",
  },
  {
    id: "garden",
    title: "Victoria Park & Town Walk",
    summary:
      "A walking loop through Nuwara Eliya's colonial garden, post office, and the pink-walled racecourse. Tea and short eats included.",
    distance: "15 min drive",
    image: "/images/exp-town.svg",
    imageAlt: "Victoria Park gardens in Nuwara Eliya",
    icon: "leaf",
  },
];
