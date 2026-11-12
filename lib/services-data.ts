import type { ServiceType } from "@/types";

// Services shown on /services and offered on the /consultation form.
export const SERVICES = [
  {
    _id: "1",
    name: "Interior Design",
    slug: "interior-design",
    description:
      "Full-service bespoke interior design from concept to completion.",
    features: [
      "Initial consultation",
      "Concept development",
      "3D visualisation",
      "Project management",
      "Final styling",
    ],
    priceFrom: 500000,
    duration: "6–12 weeks",
    image:
      "https://i.pinimg.com/736x/00/79/4d/00794d22e45b9e53ebf46b73a35de471.jpg",
  },
  {
    _id: "2",
    name: "Space Planning",
    slug: "space-planning",
    description:
      "Intelligent floor plan design that maximises your space's potential.",
    features: [
      "Measured survey",
      "Multiple layouts",
      "Furniture positioning",
      "Traffic flow analysis",
      "Digital floor plans",
    ],
    priceFrom: 150000,
    duration: "1–2 weeks",
    image:
      "https://i.pinimg.com/736x/23/d6/d8/23d6d8a5d46fc2ec6170fe8cf7df9323.jpg",
  },
  {
    _id: "3",
    name: "Furniture Procurement",
    slug: "furniture-procurement",
    description:
      "Curated sourcing of premium furniture from trusted suppliers worldwide.",
    features: [
      "Supplier network access",
      "Quality verification",
      "Negotiated pricing",
      "Delivery management",
      "Installation oversight",
    ],
    priceFrom: 200000,
    duration: "2–8 weeks",
    image:
      "https://i.pinimg.com/736x/e6/bc/6e/e6bc6e8b2f04ce6f33736d5a223f2d2f.jpg",
  },
  {
    _id: "4",
    name: "Virtual Consultation",
    slug: "virtual-consultation",
    description:
      "Professional design advice via video call — fast, flexible, and affordable.",
    features: [
      "60-min video session",
      "Mood board",
      "Product recommendations",
      "Q&A support",
      "Follow-up notes",
    ],
    priceFrom: 50000,
    duration: "Same week",
    image:
      "https://i.pinimg.com/1200x/2d/07/20/2d07207ef937bf4b6a3a0a63b4806e60.jpg",
  },
  {
    _id: "5",
    name: "Renovation Management",
    slug: "renovation-management",
    description:
      "End-to-end coordination and supervision of your renovation project, ensuring quality craftsmanship, timely delivery, and a stress-free experience.",
    features: [
      "Project planning",
      "Contractor coordination",
      "Site supervision",
      "Quality control",
      "Project handover",
    ],
    priceFrom: 350000,
    duration: "4–16 weeks",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=1200&q=80",
  },
] as ServiceType[];
