import { PortfolioItemType } from "@/types";

export const PORTFOLIO_MOCK: PortfolioItemType[] = [
  {
    _id: "1",
    title: "The Eko Atlantic Penthouse",
    slug: "eko-atlantic-penthouse",
    description:
      "A sweeping 480sqm sky residence designed for a tech entrepreneur who wanted an art-forward home that balanced gallery-quality aesthetics with a family's daily life. Every surface was a considered choice; every room a world unto itself.",
    category: "Living Room",
    style: "Contemporary Luxury",
    client: "Private",
    location: "Eko Atlantic, Lagos",
    year: 2024,
    featured: true,
    tags: ["penthouse", "contemporary", "luxury", "open-plan"],
    challenge:
      "The space had extraordinary bones — sky-high ceilings, wraparound glazing, ocean views — but the original fit-out was developer-standard. The challenge was to honour the architecture's ambition without competing with the views.",
    solution:
      "We designed every material selection to recede or complement the exterior palette. Stone, linen, and smoked oak create warmth while glass and brushed steel echo the skyline. Custom joinery in every room maximises storage invisibly.",
    duration: "9 months",
    area: "480 sqm",
    highlights: [
      "Custom-fabricated kitchen islands",
      "48-point lighting scheme",
      "Art installation curation",
      "Smart home integration",
    ],
    media: {
      before: [
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
        //   alt: "Living room, before",
        // },
      ],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port1/bariga-one-bed1.jpg",
          alt: "Main living area — floor-to-ceiling glazing frames the Atlantic horizon",
        },
        {
          type: "video",
          src: "/images/portfolio/port1/bariga-one-bed.mp4",
          poster:
            "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
          alt: "Walkthrough — dining to kitchen flow",
        },
        // {
        //   type: "image",
        //   src: "/images/portfolio/port1/bariga-one-bed2.jpg",
        //   alt: "Master bedroom — travertine feature wall",
        // },
        // {
        //   type: "image",
        //   src: "/images/portfolio/port1/bariga-one-bedd.png",
        //   alt: "Chef's kitchen — Calacatta marble islands",
        // },
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
        //   alt: "Breakfast nook detail",
        // },
        // {
        //   type: "video",
        //   src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4",
        //   poster:
        //     "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
        //   alt: "Full walkthrough — day to dusk lighting sequence",
        // },
      ],
    },
  },
  {
    _id: "2",
    title: "Maitama Family Villa",
    slug: "maitama-family-villa",
    description:
      "A 6-bedroom family home in Abuja's most prestigious neighbourhood, redesigned from the studs out to serve three generations while projecting warmth and understated authority.",
    category: "Bedroom",
    style: "Warm Contemporary",
    client: "Private Family",
    location: "Maitama, Abuja",
    year: 2024,
    featured: true,
    tags: ["family home", "warm", "villa", "abuja"],
    challenge:
      "The family needed spaces that worked simultaneously as a formal entertaining home and a relaxed family retreat — for young children and grandparents alike.",
    solution:
      "We zoned the ground floor into public and private arcs, connected by a landscaped atrium. Materials are durable and beautiful — sealed terrazzo, leather, solid hardwood.",
    duration: "12 months",
    area: "720 sqm",
    highlights: [
      "Custom terrazzo flooring",
      "Indoor garden atrium",
      "Smart zoned audio",
      "Children's wing design",
    ],
    media: {
      before: [
        // {
        //   type: "image",
        //   src: "/images/portfolio/port2/lekki1.jpg",
        //   alt: "Master bedroom, before",
        // },
      ],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port2/lekki1.jpg",
          alt: "Master bedroom — Nigerian textile feature wall",
        },
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=85",
        //   alt: "Formal dining — hand-poured glass chandelier",
        // },
        // {
        //   type: "video",
        //   src: "https://videos.pexels.com/video-files/5624982/5624982-uhd_2560_1440_25fps.mp4",
        //   poster:
        //     "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
        //   alt: "Walkthrough — ground floor living spaces",
        // },
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85",
        //   alt: "Family living room — expansive sectional seating",
        // },
      ],
    },
  },
  {
    _id: "3",
    title: "Lekki Modern Loft",
    slug: "lekki-modern-loft",
    description:
      "A raw 220sqm shell transformed into a gallery-like open-plan loft for a couple of architects who had very exacting ideas about what they wanted — and trusted us to exceed them.",
    category: "Kitchen",
    style: "Minimalist Industrial",
    client: "Architects",
    location: "Lekki Phase 1, Lagos",
    year: 2023,
    featured: false,
    tags: ["loft", "minimalist", "industrial", "open-plan"],
    challenge:
      "Clients wanted zero visual noise — no visible storage, no handles, no ceiling fixtures — while still having a fully functional family kitchen and workspace.",
    solution:
      "Push-to-open cabinetry from floor to ceiling, integrated appliances, a poured concrete island with undermount everything. Track lighting recessed in a coffered grid.",
    duration: "6 months",
    area: "220 sqm",
    highlights: [
      "Full-height integrated storage",
      "Poured concrete island",
      "Bespoke steel windows",
      "Polished screed flooring",
    ],
    media: {
      before: [
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80",
        //   alt: "Kitchen, before",
        // },
      ],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port3/port.jpg",
          alt: "Open kitchen — exposed concrete, blackened steel",
        },
        // {
        //   type: "video",
        //   src: "https://videos.pexels.com/video-files/7587596/7587596-uhd_2560_1440_25fps.mp4",
        //   poster:
        //     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
        //   alt: "Day-to-night lighting transformation",
        // },
      ],
    },
  },
  {
    _id: "4",
    title: "Victoria Island Headquarters",
    slug: "victoria-island-hq",
    description:
      "A 1,200sqm commercial fit-out for a pan-African investment firm. The brief: project gravitas, creativity, and global ambition — without a single square metre of beige.",
    category: "Commercial",
    style: "Corporate Luxe",
    client: "Investment Firm",
    location: "Victoria Island, Lagos",
    year: 2023,
    featured: true,
    tags: ["commercial", "office", "corporate", "vi"],
    challenge:
      "A financial firm needs to feel authoritative and trustworthy — but also attract millennial talent who want to work somewhere they're proud to show colleagues.",
    solution:
      "Dark, rich materials (smoked walnut, aged brass, charcoal plaster) anchor the partner spaces. Open floors use more light and material to feel energetic and human.",
    duration: "8 months",
    area: "1,200 sqm",
    highlights: [
      "Custom reception desk sculpture",
      "11 meeting rooms",
      "Partner suite fit-out",
      "Acoustic engineering",
    ],
    // No before shots existed in the source data for this project.
    media: {
      before: [],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port4/ajah.jpg",
          alt: "Partner meeting room — smoked glass and walnut",
        },
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85",
        //   alt: "Open trading floor",
        // },
        // {
        //   type: "video",
        //   src: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4",
        //   poster:
        //     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
        //   alt: "Entrance lobby reveal",
        // },
      ],
    },
  },
  {
    _id: "5",
    title: "Old Ikoyi Heritage Residence",
    slug: "old-ikoyi-residence",
    description:
      "A 1960s colonial-era home sensitively restored and updated for contemporary living. The project was as much about preservation as it was about design.",
    category: "Dining Room",
    style: "Heritage Contemporary",
    client: "Private",
    location: "Old Ikoyi, Lagos",
    year: 2022,
    featured: false,
    tags: ["heritage", "restoration", "ikoyi", "colonial"],
    challenge:
      "Original terrazzo floors, timber jalousies, and high coved ceilings were worth preserving — but decades of patchy renovations had created a confusing patchwork of eras.",
    solution:
      "We established a material hierarchy that honoured the original while introducing contemporary comfort. New elements are clearly new; original elements are lovingly restored.",
    duration: "14 months",
    area: "560 sqm",
    highlights: [
      "Original terrazzo restoration",
      "Bespoke jalousie windows",
      "Custom Nigerian art curation",
      "Period-correct joinery",
    ],
    media: {
      before: [
        // {
        //   type: "image",
        //   src: "https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=1200&q=80",
        //   alt: "Dining room, before",
        // },
      ],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe1.jpg",
          alt: "Formal dining room — original terrazzo floors retained and restored",
        },
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe2.jpg",
          alt: "Restored colonial verandah",
        },
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe3.jpg",
          alt: "Garden-facing sitting room",
        },
      ],
    },
  },
  {
    _id: "6",
    title: "GRA Ikeja Smart Home",
    slug: "gra-ikeja-smart-home",
    description:
      "A young couple's first home — fully integrated with Crestron automation, solar power, and a design language that balances warmth with precision.",
    category: "Living Room",
    style: "Tech-forward Warm",
    client: "Private Couple",
    location: "GRA Ikeja, Lagos",
    year: 2023,
    featured: false,
    tags: ["smart home", "technology", "warm", "ikeja"],
    challenge:
      "Tech infrastructure — wiring conduits, AV racks, automation panels — tends to create cold, clinical aesthetics that conflict with how people actually want to live.",
    solution:
      "All infrastructure is concealed in a purpose-built plant room. Touch panels are flush-mounted in bespoke frames. The warmth of the materials comes first; the tech is invisible.",
    duration: "7 months",
    area: "320 sqm",
    highlights: [
      "Crestron full home automation",
      "Solar + battery backup",
      "Invisible speaker integration",
      "Motorised curtain system",
    ],
    // No before shots existed in the source data for this project either.
    media: {
      before: [],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port6/broken.jpg",
          alt: "Living room — warm neutrals with integrated tech",
        },
        // {
        //   type: "video",
        //   src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4",
        //   poster:
        //     "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
        //   alt: "Smart home automation demonstration",
        // },
      ],
    },
  },
];

// export const PORTFOLIO_MOCK: PortfolioItemType[] = [
//   {
//     _id: "1",
//     title: "The Eko Atlantic Penthouse",
//     slug: "eko-atlantic-penthouse",
//     description: "A sweeping 480sqm sky residence designed for a tech entrepreneur who wanted an art-forward home that balanced gallery-quality aesthetics with a family's daily life. Every surface was a considered choice; every room a world unto itself.",
//     category: "Living Room",
//     style: "Contemporary Luxury",
//     client: "Private",
//     location: "Eko Atlantic, Lagos",
//     year: 2024,
//     coverImage: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=90&auto=format&fit=crop",
//     coverVideo: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4",
//     images: [
//       "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85",
//       "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85",
//       "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85",
//       "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85",
//     ],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1400&q=85", span: "full", caption: "Main living area — floor-to-ceiling glazing frames the Atlantic horizon" },
//       { type: "video", src: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", span: "half", caption: "Walkthrough — dining to kitchen flow" },
//       { type: "image", src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85", span: "half", caption: "Master bedroom — travertine feature wall" },
//       { type: "image", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=85", span: "half", caption: "Chef's kitchen — Calacatta marble islands" },
//       { type: "image", src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85", span: "half", caption: "Breakfast nook detail" },
//       { type: "video", src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80", span: "full", caption: "Full walkthrough — day to dusk lighting sequence" },
//     ],
//     beforeAfter: [
//       {
//         label: "Living Room transformation",
//         before: { type: "image", src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80" },
//         after: { type: "image", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1200&q=85" },
//       },
//     ],
//     featured: true,
//     published: true,
//     tags: ["penthouse", "contemporary", "luxury", "open-plan"],
//     challenge: "The space had extraordinary bones — sky-high ceilings, wraparound glazing, ocean views — but the original fit-out was developer-standard. The challenge was to honour the architecture's ambition without competing with the views.",
//     solution: "We designed every material selection to recede or complement the exterior palette. Stone, linen, and smoked oak create warmth while glass and brushed steel echo the skyline. Custom joinery in every room maximises storage invisibly.",
//     duration: "9 months",
//     area: "480 sqm",
//     createdAt: "2024-01-01", highlights: ["Custom-fabricated kitchen islands", "48-point lighting scheme", "Art installation curation", "Smart home integration"],
//   },
//   {
//     _id: "2",
//     title: "Maitama Family Villa",
//     slug: "maitama-family-villa",
//     description: "A 6-bedroom family home in Abuja's most prestigious neighbourhood, redesigned from the studs out to serve three generations while projecting warmth and understated authority.",
//     category: "Bedroom",
//     style: "Warm Contemporary",
//     client: "Private Family",
//     location: "Maitama, Abuja",
//     year: 2024,
//     coverImage: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1600&q=90&auto=format&fit=crop",
//     images: [
//       "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85",
//       "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85",
//     ],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1400&q=85", span: "full", caption: "Master bedroom — Nigerian textile feature wall" },
//       { type: "image", src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=85", span: "half", caption: "Formal dining — hand-poured glass chandelier" },
//       { type: "video", src: "https://videos.pexels.com/video-files/5624982/5624982-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80", span: "half", caption: "Walkthrough — ground floor living spaces" },
//       { type: "image", src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85", span: "full", caption: "Family living room — expansive sectional seating" },
//     ],
//     beforeAfter: [
//       {
//         label: "Master bedroom",
//         before: { type: "image", src: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=1200&q=80" },
//         after: { type: "image", src: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=1200&q=85" },
//       },
//     ],
//     featured: true,
//     published: true,
//     tags: ["family home", "warm", "villa", "abuja"],
//     challenge: "The family needed spaces that worked simultaneously as a formal entertaining home and a relaxed family retreat — for young children and grandparents alike.",
//     solution: "We zoned the ground floor into public and private arcs, connected by a landscaped atrium. Materials are durable and beautiful — sealed terrazzo, leather, solid hardwood.",
//     duration: "12 months",
//     area: "720 sqm",
//     createdAt: "2024-02-01", highlights: ["Custom terrazzo flooring", "Indoor garden atrium", "Smart zoned audio", "Children's wing design"],
//   },
//   {
//     _id: "3",
//     title: "Lekki Modern Loft",
//     slug: "lekki-modern-loft",
//     description: "A raw 220sqm shell transformed into a gallery-like open-plan loft for a couple of architects who had very exacting ideas about what they wanted — and trusted us to exceed them.",
//     category: "Kitchen",
//     style: "Minimalist Industrial",
//     client: "Architects",
//     location: "Lekki Phase 1, Lagos",
//     year: 2023,
//     coverImage: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&q=90&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85"],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1400&q=85", span: "full", caption: "Open kitchen — exposed concrete, blackened steel" },
//       { type: "video", src: "https://videos.pexels.com/video-files/7587596/7587596-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80", span: "full", caption: "Day-to-night lighting transformation" },
//     ],
//     beforeAfter: [
//       {
//         label: "Kitchen transformation",
//         before: { type: "image", src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80" },
//         after: { type: "image", src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&q=85" },
//       },
//     ],
//     featured: false,
//     published: true,
//     tags: ["loft", "minimalist", "industrial", "open-plan"],
//     challenge: "Clients wanted zero visual noise — no visible storage, no handles, no ceiling fixtures — while still having a fully functional family kitchen and workspace.",
//     solution: "Push-to-open cabinetry from floor to ceiling, integrated appliances, a poured concrete island with undermount everything. Track lighting recessed in a coffered grid.",
//     duration: "6 months",
//     area: "220 sqm",
//     createdAt: "2023-06-01", highlights: ["Full-height integrated storage", "Poured concrete island", "Bespoke steel windows", "Polished screed flooring"],
//   },
//   {
//     _id: "4",
//     title: "Victoria Island Headquarters",
//     slug: "victoria-island-hq",
//     description: "A 1,200sqm commercial fit-out for a pan-African investment firm. The brief: project gravitas, creativity, and global ambition — without a single square metre of beige.",
//     category: "Commercial",
//     style: "Corporate Luxe",
//     client: "Investment Firm",
//     location: "Victoria Island, Lagos",
//     year: 2023,
//     coverImage: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=90&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85"],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1400&q=85", span: "full", caption: "Partner meeting room — smoked glass and walnut" },
//       { type: "image", src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85", span: "half", caption: "Open trading floor" },
//       { type: "video", src: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80", span: "half", caption: "Entrance lobby reveal" },
//     ],
//     featured: true,
//     published: true,
//     tags: ["commercial", "office", "corporate", "vi"],
//     challenge: "A financial firm needs to feel authoritative and trustworthy — but also attract millennial talent who want to work somewhere they're proud to show colleagues.",
//     solution: "Dark, rich materials (smoked walnut, aged brass, charcoal plaster) anchor the partner spaces. Open floors use more light and material to feel energetic and human.",
//     duration: "8 months",
//     area: "1,200 sqm",
//     createdAt: "2023-08-01", highlights: ["Custom reception desk sculpture", "11 meeting rooms", "Partner suite fit-out", "Acoustic engineering"],
//   },
//   {
//     _id: "5",
//     title: "Old Ikoyi Heritage Residence",
//     slug: "old-ikoyi-residence",
//     description: "A 1960s colonial-era home sensitively restored and updated for contemporary living. The project was as much about preservation as it was about design.",
//     category: "Dining Room",
//     style: "Heritage Contemporary",
//     client: "Private",
//     location: "Old Ikoyi, Lagos",
//     year: 2022,
//     coverImage: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=90&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85"],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1400&q=85", span: "full", caption: "Formal dining room — original terrazzo floors retained and restored" },
//       { type: "image", src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=85", span: "half", caption: "Restored colonial verandah" },
//       { type: "image", src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=85", span: "half", caption: "Garden-facing sitting room" },
//     ],
//     beforeAfter: [
//       {
//         label: "Dining room restoration",
//         before: { type: "image", src: "https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=1200&q=80" },
//         after: { type: "image", src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1200&q=85" },
//       },
//     ],
//     featured: false,
//     published: true,
//     tags: ["heritage", "restoration", "ikoyi", "colonial"],
//     challenge: "Original terrazzo floors, timber jalousies, and high coved ceilings were worth preserving — but decades of patchy renovations had created a confusing patchwork of eras.",
//     solution: "We established a material hierarchy that honoured the original while introducing contemporary comfort. New elements are clearly new; original elements are lovingly restored.",
//     duration: "14 months",
//     area: "560 sqm",
//     createdAt: "2022-09-01", highlights: ["Original terrazzo restoration", "Bespoke jalousie windows", "Custom Nigerian art curation", "Period-correct joinery"],
//   },
//   {
//     _id: "6",
//     title: "GRA Ikeja Smart Home",
//     slug: "gra-ikeja-smart-home",
//     description: "A young couple's first home — fully integrated with Crestron automation, solar power, and a design language that balances warmth with precision.",
//     category: "Living Room",
//     style: "Tech-forward Warm",
//     client: "Private Couple",
//     location: "GRA Ikeja, Lagos",
//     year: 2023,
//     coverImage: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1600&q=90&auto=format&fit=crop",
//     images: ["https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1200&q=85"],
//     media: [
//       { type: "image", src: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=1400&q=85", span: "full", caption: "Living room — warm neutrals with integrated tech" },
//       { type: "video", src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4", poster: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80", span: "full", caption: "Smart home automation demonstration" },
//     ],
//     featured: false,
//     published: true,
//     tags: ["smart home", "technology", "warm", "ikeja"],
//     challenge: "Tech infrastructure — wiring conduits, AV racks, automation panels — tends to create cold, clinical aesthetics that conflict with how people actually want to live.",
//     solution: "All infrastructure is concealed in a purpose-built plant room. Touch panels are flush-mounted in bespoke frames. The warmth of the materials comes first; the tech is invisible.",
//     duration: "7 months",
//     area: "320 sqm",
//     createdAt: "2023-04-01", highlights: ["Crestron full home automation", "Solar + battery backup", "Invisible speaker integration", "Motorised curtain system"],
//   },
// ];
