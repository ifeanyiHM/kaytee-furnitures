import type { ServiceType } from "@/types";

// Interior design is the studio's single service. The other disciplines are
// considered within a project scope rather than sold as separate services.
export const SERVICES: ServiceType[] = [
  {
    _id: "1",
    name: "Interior Design",
    slug: "interior-design",
    description:
      "Thoughtful, cohesive interior design shaped around each client's space, needs and way of living.",
    features: [
      "Initial project consultation",
      "Concept and visual direction",
      "Space planning and layout development",
      "Material, colour and finish selection",
      "Furniture and lighting direction",
      "Visualisation and styling where appropriate",
      "Implementation coordination where agreed",
    ],
    image:
      "https://i.pinimg.com/1200x/1b/ac/10/1bac109b1b2cb3b67be991ff80a0dc5d.jpg",
    active: true,
    order: 1,
  },
];
