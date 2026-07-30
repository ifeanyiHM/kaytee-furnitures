import { PortfolioItemType } from "@/types";

// export const PORTFOLIO_MOCK: PortfolioItemType[] = [
//   {
//     _id: "1",
//     title: "The Eko Atlantic Penthouse",
//     slug: "eko-atlantic-penthouse",
//     description:
//       "A sweeping 480sqm sky residence designed for a tech entrepreneur who wanted an art-forward home that balanced gallery-quality aesthetics with a family's daily life. Every surface was a considered choice; every room a world unto itself.",
//     category: "Living Room",
//     style: "Contemporary Luxury",
//     client: "Private",
//     location: "Eko Atlantic, Lagos",
//     year: 2024,
//     featured: true,
//     published: true,
//     tags: ["penthouse", "contemporary", "luxury", "open-plan"],
//     challenge:
//       "The space had extraordinary bones — sky-high ceilings, wraparound glazing, ocean views — but the original fit-out was developer-standard. The challenge was to honour the architecture's ambition without competing with the views.",
//     solution:
//       "We designed every material selection to recede or complement the exterior palette. Stone, linen, and smoked oak create warmth while glass and brushed steel echo the skyline. Custom joinery in every room maximises storage invisibly.",
//     duration: "9 months",
//     area: "480 sqm",
//     highlights: [
//       "Custom-fabricated kitchen islands",
//       "48-point lighting scheme",
//       "Art installation curation",
//       "Smart home integration",
//     ],
//     media: {
//       before: [
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=1200&q=80",
//         //   alt: "Living room, before",
//         // },
//       ],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port1/bariga-one-bed1.jpg",
//           alt: "Main living area — floor-to-ceiling glazing frames the Atlantic horizon",
//         },
//         {
//           type: "video",
//           src: "/images/portfolio/port1/bariga-one-bed.mp4",
//           poster:
//             "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
//           alt: "Walkthrough — dining to kitchen flow",
//         },
//         // {
//         //   type: "image",
//         //   src: "/images/portfolio/port1/bariga-one-bed2.jpg",
//         //   alt: "Master bedroom — travertine feature wall",
//         // },
//         // {
//         //   type: "image",
//         //   src: "/images/portfolio/port1/bariga-one-bedd.png",
//         //   alt: "Chef's kitchen — Calacatta marble islands",
//         // },
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=85",
//         //   alt: "Breakfast nook detail",
//         // },
//         // {
//         //   type: "video",
//         //   src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4",
//         //   poster:
//         //     "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
//         //   alt: "Full walkthrough — day to dusk lighting sequence",
//         // },
//       ],
//     },
//   },
//   {
//     _id: "2",
//     title: "Maitama Family Villa",
//     slug: "maitama-family-villa",
//     description:
//       "A 6-bedroom family home in Abuja's most prestigious neighbourhood, redesigned from the studs out to serve three generations while projecting warmth and understated authority.",
//     category: "Bedroom",
//     style: "Warm Contemporary",
//     client: "Private Family",
//     location: "Maitama, Abuja",
//     year: 2024,
//     featured: true,
//     published: true,
//     tags: ["family home", "warm", "villa", "abuja"],
//     challenge:
//       "The family needed spaces that worked simultaneously as a formal entertaining home and a relaxed family retreat — for young children and grandparents alike.",
//     solution:
//       "We zoned the ground floor into public and private arcs, connected by a landscaped atrium. Materials are durable and beautiful — sealed terrazzo, leather, solid hardwood.",
//     duration: "12 months",
//     area: "720 sqm",
//     highlights: [
//       "Custom terrazzo flooring",
//       "Indoor garden atrium",
//       "Smart zoned audio",
//       "Children's wing design",
//     ],
//     media: {
//       before: [
//         // {
//         //   type: "image",
//         //   src: "/images/portfolio/port2/lekki1.jpg",
//         //   alt: "Master bedroom, before",
//         // },
//       ],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port2/lekki1.jpg",
//           alt: "Master bedroom — Nigerian textile feature wall",
//         },
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&q=85",
//         //   alt: "Formal dining — hand-poured glass chandelier",
//         // },
//         // {
//         //   type: "video",
//         //   src: "https://videos.pexels.com/video-files/5624982/5624982-uhd_2560_1440_25fps.mp4",
//         //   poster:
//         //     "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
//         //   alt: "Walkthrough — ground floor living spaces",
//         // },
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1400&q=85",
//         //   alt: "Family living room — expansive sectional seating",
//         // },
//       ],
//     },
//   },
//   {
//     _id: "3",
//     title: "Lekki Modern Loft",
//     slug: "lekki-modern-loft",
//     description:
//       "A raw 220sqm shell transformed into a gallery-like open-plan loft for a couple of architects who had very exacting ideas about what they wanted — and trusted us to exceed them.",
//     category: "Kitchen",
//     style: "Minimalist Industrial",
//     client: "Architects",
//     location: "Lekki Phase 1, Lagos",
//     year: 2023,
//     featured: false,
//     published: true,
//     tags: ["loft", "minimalist", "industrial", "open-plan"],
//     challenge:
//       "Clients wanted zero visual noise — no visible storage, no handles, no ceiling fixtures — while still having a fully functional family kitchen and workspace.",
//     solution:
//       "Push-to-open cabinetry from floor to ceiling, integrated appliances, a poured concrete island with undermount everything. Track lighting recessed in a coffered grid.",
//     duration: "6 months",
//     area: "220 sqm",
//     highlights: [
//       "Full-height integrated storage",
//       "Poured concrete island",
//       "Bespoke steel windows",
//       "Polished screed flooring",
//     ],
//     media: {
//       before: [
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1200&q=80",
//         //   alt: "Kitchen, before",
//         // },
//       ],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port3/port.jpg",
//           alt: "Open kitchen — exposed concrete, blackened steel",
//         },
//         // {
//         //   type: "video",
//         //   src: "https://videos.pexels.com/video-files/7587596/7587596-uhd_2560_1440_25fps.mp4",
//         //   poster:
//         //     "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80",
//         //   alt: "Day-to-night lighting transformation",
//         // },
//       ],
//     },
//   },
//   {
//     _id: "4",
//     title: "Victoria Island Headquarters",
//     slug: "victoria-island-hq",
//     description:
//       "A 1,200sqm commercial fit-out for a pan-African investment firm. The brief: project gravitas, creativity, and global ambition — without a single square metre of beige.",
//     category: "Commercial",
//     style: "Corporate Luxe",
//     client: "Investment Firm",
//     location: "Victoria Island, Lagos",
//     year: 2023,
//     featured: true,
//     published: true,
//     tags: ["commercial", "office", "corporate", "vi"],
//     challenge:
//       "A financial firm needs to feel authoritative and trustworthy — but also attract millennial talent who want to work somewhere they're proud to show colleagues.",
//     solution:
//       "Dark, rich materials (smoked walnut, aged brass, charcoal plaster) anchor the partner spaces. Open floors use more light and material to feel energetic and human.",
//     duration: "8 months",
//     area: "1,200 sqm",
//     highlights: [
//       "Custom reception desk sculpture",
//       "11 meeting rooms",
//       "Partner suite fit-out",
//       "Acoustic engineering",
//     ],
//     // No before shots existed in the source data for this project.
//     media: {
//       before: [],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port4/ajah.jpg",
//           alt: "Partner meeting room — smoked glass and walnut",
//         },
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&q=85",
//         //   alt: "Open trading floor",
//         // },
//         // {
//         //   type: "video",
//         //   src: "https://videos.pexels.com/video-files/7578544/7578544-uhd_2560_1440_25fps.mp4",
//         //   poster:
//         //     "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
//         //   alt: "Entrance lobby reveal",
//         // },
//       ],
//     },
//   },
//   {
//     _id: "5",
//     title: "Old Ikoyi Heritage Residence",
//     slug: "old-ikoyi-residence",
//     description:
//       "A 1960s colonial-era home sensitively restored and updated for contemporary living. The project was as much about preservation as it was about design.",
//     category: "Dining Room",
//     style: "Heritage Contemporary",
//     client: "Private",
//     location: "Old Ikoyi, Lagos",
//     year: 2022,
//     featured: false,
//     published: true,
//     tags: ["heritage", "restoration", "ikoyi", "colonial"],
//     challenge:
//       "Original terrazzo floors, timber jalousies, and high coved ceilings were worth preserving — but decades of patchy renovations had created a confusing patchwork of eras.",
//     solution:
//       "We established a material hierarchy that honoured the original while introducing contemporary comfort. New elements are clearly new; original elements are lovingly restored.",
//     duration: "14 months",
//     area: "560 sqm",
//     highlights: [
//       "Original terrazzo restoration",
//       "Bespoke jalousie windows",
//       "Custom Nigerian art curation",
//       "Period-correct joinery",
//     ],
//     media: {
//       before: [
//         // {
//         //   type: "image",
//         //   src: "https://images.unsplash.com/photo-1561753757-d8880c5a3551?w=1200&q=80",
//         //   alt: "Dining room, before",
//         // },
//       ],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port5/wardrobe1.jpg",
//           alt: "Formal dining room — original terrazzo floors retained and restored",
//         },
//         {
//           type: "image",
//           src: "/images/portfolio/port5/wardrobe2.jpg",
//           alt: "Restored colonial verandah",
//         },
//         {
//           type: "image",
//           src: "/images/portfolio/port5/wardrobe3.jpg",
//           alt: "Garden-facing sitting room",
//         },
//       ],
//     },
//   },
//   {
//     _id: "6",
//     title: "GRA Ikeja Smart Home",
//     slug: "gra-ikeja-smart-home",
//     description:
//       "A young couple's first home — fully integrated with Crestron automation, solar power, and a design language that balances warmth with precision.",
//     category: "Living Room",
//     style: "Tech-forward Warm",
//     client: "Private Couple",
//     location: "GRA Ikeja, Lagos",
//     year: 2023,
//     featured: false,
//     published: false,
//     tags: ["smart home", "technology", "warm", "ikeja"],
//     challenge:
//       "Tech infrastructure — wiring conduits, AV racks, automation panels — tends to create cold, clinical aesthetics that conflict with how people actually want to live.",
//     solution:
//       "All infrastructure is concealed in a purpose-built plant room. Touch panels are flush-mounted in bespoke frames. The warmth of the materials comes first; the tech is invisible.",
//     duration: "7 months",
//     area: "320 sqm",
//     highlights: [
//       "Crestron full home automation",
//       "Solar + battery backup",
//       "Invisible speaker integration",
//       "Motorised curtain system",
//     ],
//     // No before shots existed in the source data for this project either.
//     media: {
//       before: [],
//       after: [
//         {
//           type: "image",
//           src: "/images/portfolio/port6/broken.jpg",
//           alt: "Living room — warm neutrals with integrated tech",
//         },
//         // {
//         //   type: "video",
//         //   src: "https://videos.pexels.com/video-files/6394040/6394040-uhd_2560_1440_25fps.mp4",
//         //   poster:
//         //     "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80",
//         //   alt: "Smart home automation demonstration",
//         // },
//       ],
//     },
//   },
// ];

export const PORTFOLIO_MOCK: PortfolioItemType[] = [
  {
    _id: "1",
    title: "Luxury Living & Dining Room Transformation",
    slug: "luxury-living-dining-room-transformation",
    description:
      "A complete transformation of an unfinished living and dining area into a luxurious contemporary interior featuring bespoke wall treatments, integrated lighting, premium furnishings, and elegant finishes.",
    category: ["Living Room", "Dining Room"],
    style: "Modern Luxury",
    client: "Private Residence",
    location: "Lekki, Lagos",
    year: 2024,
    featured: true,
    published: true,
    tags: [
      "living room",
      "dining room",
      "modern luxury",
      "interior design",
      "custom furniture",
      "feature wall",
      "lighting",
      "residential",
    ],

    challenge:
      "The property was delivered as a basic shell with unfinished feature walls and empty living and dining spaces. The client wanted a refined luxury interior that felt warm, functional, and suitable for entertaining while maintaining a timeless aesthetic.",

    solution:
      "We designed bespoke TV and dining feature walls, introduced custom display cabinetry with integrated ambient lighting, selected premium furniture and décor, incorporated marble-inspired finishes, and layered architectural lighting to create a cohesive modern luxury living experience.",

    highlights: [
      "Custom TV feature wall",
      "Integrated LED display cabinets",
      "Luxury dining furniture",
      "Decorative wall paneling",
      "Architectural lighting",
      "Premium marble accents",
      "Custom window treatments",
      "Contemporary luxury styling",
    ],

    media: {
      before: [
        {
          type: "image",
          src: "/images/portfolio/port10/dining_before.jpg",
          alt: "Unfinished dining room before interior fit-out",
        },
        {
          type: "image",
          src: "/images/portfolio/port10/palour_before.jpg",
          alt: "Unfinished living room before custom feature wall installation",
        },
      ],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port10/dining_after.jpg",
          alt: "Luxury dining room with bespoke furniture and statement lighting",
        },
        {
          type: "image",
          src: "/images/portfolio/port10/palour_after.jpg",
          alt: "Modern luxury living room featuring a bespoke illuminated TV wall",
        },
      ],
    },
  },
  {
    _id: "2",
    title: "Luxury Bedroom Transformation",
    slug: "luxury-bedroom-transformation",
    description:
      "A complete transformation of a simple bedroom into a warm, contemporary retreat featuring a bespoke walnut feature wall, ambient lighting, coordinated furnishings, and refined styling that elevates everyday comfort.",

    category: ["Bedroom", "Wardrobe"],
    style: "Contemporary Modern",
    client: "Private Residence",
    location: "Lekki, Lagos",
    year: 2024,
    featured: true,
    published: true,

    tags: [
      "bedroom",
      "modern bedroom",
      "feature wall",
      "ambient lighting",
      "custom woodwork",
      "wardrobe",
      "interior design",
      "residential",
    ],

    challenge:
      "The bedroom felt plain and unfinished despite having quality furniture. Blank walls, minimal lighting, and the absence of architectural detailing resulted in a space that lacked warmth, personality, and the luxurious atmosphere the client desired.",

    solution:
      "We designed a bespoke walnut wall panel system behind the bed, integrated concealed warm LED lighting, styled the bed with coordinated luxury bedding, introduced elegant bedside lighting, and created a cohesive palette that complements the existing custom wardrobe while adding depth and sophistication.",

    highlights: [
      "Custom walnut feature wall",
      "Integrated warm LED backlighting",
      "Luxury bedding and styling",
      "Contemporary bedside lighting",
      "Bespoke wood panel detailing",
      "Custom fitted wardrobe",
      "Warm contemporary colour palette",
      "Minimal luxury bedroom design",
    ],

    media: {
      before: [
        {
          type: "image",
          src: "/images/portfolio/port11/before.jpg",
          alt: "Bedroom before renovation with plain walls and minimal styling",
        },
      ],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port11/after.jpg",
          alt: "Luxury contemporary bedroom featuring a walnut feature wall with integrated LED lighting",
        },
      ],
    },
  },
  {
    _id: "3",
    title: "Luxury Walk-In Wardrobe & Display Unit",
    slug: "luxury-walk-in-wardrobe-display-unit",
    description:
      "A bespoke floor-to-ceiling wardrobe system that combines generous storage, illuminated display shelving, and a multifunctional entertainment niche. Designed with contemporary finishes, premium materials, and integrated lighting, the installation transforms the bedroom into a sophisticated and highly organized living space.",

    category: ["Bedroom", "Wardrobe"],
    style: "Modern Luxury",

    client: "Private Residence",
    location: "Lekki, Lagos",
    year: 2024,

    featured: false,
    published: true,

    tags: [
      "wardrobe",
      "custom cabinetry",
      "bedroom storage",
      "luxury wardrobe",
      "built-in wardrobe",
      "display shelving",
      "LED lighting",
      "modern interior",
      "joinery",
      "closet design",
    ],

    challenge:
      "The client wanted a statement wardrobe that provided maximum storage without overwhelming the bedroom. The design also needed dedicated display areas, concealed compartments, and a central feature that could function as an entertainment or vanity space while maintaining a clean, contemporary aesthetic.",

    solution:
      "We designed a fully bespoke floor-to-ceiling wardrobe featuring matte charcoal cabinetry paired with warm natural wood interiors. Integrated LED lighting highlights the open display shelves, while concealed hanging sections, adjustable shelving, drawers, and overhead cabinets maximize storage efficiency. A central display and media niche completes the composition, creating a luxurious focal point that balances elegance with practicality.",

    // duration: "5 weeks",
    // area: "18 sqm",

    highlights: [
      "Floor-to-ceiling custom cabinetry",
      "Integrated warm LED display lighting",
      "Soft-close doors and drawers",
      "Concealed hanging compartments",
      "Open illuminated display shelves",
      "Central TV/vanity display niche",
      "Premium matte and wood-grain finishes",
      "Large-capacity storage system",
      "Minimal contemporary design",
      "Custom internal organization",
    ],

    media: {
      before: [],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe1.jpg",
          alt: "Luxury floor-to-ceiling wardrobe with illuminated display shelving",
        },
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe2.jpg",
          alt: "Custom modern wardrobe with integrated lighting and central display unit",
        },
        {
          type: "image",
          src: "/images/portfolio/port5/wardrobe3.jpg",
          alt: "Interior view showing custom storage compartments, hanging space, and drawers",
        },
      ],
    },
  },
  {
    _id: "4",
    title: "Modern TV Wall & Media Console",
    slug: "modern-tv-wall-media-console",
    description:
      "A bespoke TV wall transformation featuring floating cabinetry, fluted wall panels, integrated LED lighting, illuminated display shelving, and premium finishes that create a refined contemporary living space.",
    category: ["TV Console", "Living Room"],
    style: "Modern Contemporary",
    client: "Private Residence",
    location: "Lagos, Nigeria",
    year: 2023,
    featured: true,
    published: true,
    tags: [
      "tv console",
      "media wall",
      "feature wall",
      "floating cabinet",
      "fluted panels",
      "led lighting",
      "living room",
      "custom joinery",
    ],
    challenge:
      "The homeowners wanted to transform plain living room walls into elegant focal points while concealing wiring, maximizing storage, and creating a luxurious entertainment area.",
    solution:
      "We designed bespoke floating media consoles paired with fluted wall panels, marble-effect feature panels, integrated ambient LED lighting, and illuminated display cabinets to create visually striking TV walls with clean, functional storage.",
    // duration: "5 weeks",
    // area: "28 sqm",
    highlights: [
      "Custom floating TV console",
      "Integrated LED ambient lighting",
      "Fluted feature wall panels",
      "Marble-effect TV backdrop",
      "Illuminated display shelving",
      "Hidden cable management",
      "Premium wood finishes",
      "Minimal contemporary design",
    ],
    media: {
      before: [
        {
          type: "image",
          src: "/images/portfolio/port4/ajah_before.jpg",
          alt: "Living room before TV wall installation",
        },
        {
          type: "image",
          src: "/images/portfolio/port4/lekki_before.jpg",
          alt: "Plain living room wall before media console installation",
        },
        {
          type: "image",
          src: "/images/portfolio/port4/port_before.jpg",
          alt: "Living room before feature wall transformation",
        },
      ],
      after: [
        {
          type: "image",
          src: "/images/portfolio/port4/ajah_after.jpg",
          alt: "Modern TV wall with illuminated display cabinet and floating media console",
        },
        {
          type: "image",
          src: "/images/portfolio/port4/lekki_after.jpg",
          alt: "Luxury marble feature TV wall with floating console and ambient LED lighting",
        },
        {
          type: "image",
          src: "/images/portfolio/port4/port_after.jpg",
          alt: "Contemporary TV feature wall with fluted panels and illuminated display shelving",
        },
      ],
    },
  },
  {
    _id: "5",
    title: "Contemporary Built-In Wardrobe with Illuminated Display Shelving",
    slug: "contemporary-built-in-wardrobe-illuminated-display-shelving",

    description:
      "A bespoke floor-to-ceiling wardrobe designed to maximize bedroom storage while creating a refined architectural feature. The design combines minimalist full-height cabinetry with a centrally illuminated open shelving unit, offering the perfect balance of concealed storage and decorative display. Premium finishes, integrated lighting, and carefully planned internal organization deliver a clean, contemporary solution for modern living.",

    category: ["Bedroom", "Wardrobe"],

    style: "Contemporary Minimalist",

    client: "Private Residence",
    location: "Lekki, Lagos",
    year: 2024,

    featured: false,
    published: true,

    tags: [
      "built-in wardrobe",
      "custom wardrobe",
      "bedroom storage",
      "floor-to-ceiling wardrobe",
      "wardrobe design",
      "display shelving",
      "LED lighting",
      "custom cabinetry",
      "modern bedroom",
      "minimalist wardrobe",
      "joinery",
      "interior design",
    ],

    challenge:
      "The client required a wardrobe that could provide generous storage while maintaining a clean, uncluttered bedroom aesthetic. The design needed dedicated hanging spaces, shelving, drawers, overhead storage, and an elegant display feature without compromising the minimalist appearance of the room.",

    solution:
      "We designed a fully bespoke floor-to-ceiling wardrobe featuring smooth matte cabinet fronts paired with warm wood-grain display shelving. A centrally positioned open shelving column is enhanced with integrated warm LED lighting to showcase decorative accessories while serving as the visual focal point. Behind the full-height doors, the wardrobe incorporates hanging rails, adjustable shelving, drawers, overhead compartments, and spacious storage sections, creating a highly functional and beautifully organized system.",

    // duration: "4 weeks",
    // area: "15 sqm",

    highlights: [
      "Floor-to-ceiling bespoke cabinetry",
      "Minimalist handle-mounted wardrobe doors",
      "Integrated warm LED display lighting",
      "Open decorative display shelving",
      "Spacious hanging compartments",
      "Adjustable shelving system",
      "Built-in drawer storage",
      "Overhead storage cabinets",
      "Premium matte finishes",
      "Warm wood-grain display interior",
      "Soft-close hinges and hardware",
      "Custom internal organization",
    ],

    media: {
      before: [],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port3/wardrobe1.jpg",
          alt: "Modern floor-to-ceiling wardrobe with illuminated central display shelving",
        },
        {
          type: "image",
          src: "/images/portfolio/port3/wardrobe2.jpg",
          alt: "Minimalist custom wardrobe featuring warm LED-lit display shelves",
        },
        {
          type: "image",
          src: "/images/portfolio/port3/wardrobe3.jpg",
          alt: "Interior view showing hanging space, shelving, drawers, and integrated wardrobe storage",
        },
        {
          type: "image",
          src: "/images/portfolio/port3/wardrobe4.jpg",
          alt: "Custom wardrobe with illuminated storage compartments and organized interior layout",
        },
      ],
    },
  },
  {
    _id: "6",
    title: "Luxury TV Feature Wall & Floating Media Console",
    slug: "luxury-tv-feature-wall-floating-media-console",

    description:
      "A bespoke TV feature wall transformation combining textured stone cladding, premium wall panelling, floating media cabinetry, illuminated display shelving, and integrated ambient lighting. Designed to conceal services while creating a sophisticated focal point that elevates the entire living room.",

    category: ["Living Room", "TV Console"],
    style: "Modern Luxury",

    client: "Private Residence",
    location: "Lagos, Nigeria",
    year: 2024,

    featured: true,
    published: true,

    tags: [
      "tv wall",
      "media console",
      "feature wall",
      "floating cabinet",
      "stone cladding",
      "wall panelling",
      "display shelving",
      "LED lighting",
      "living room",
      "custom joinery",
      "interior renovation",
      "luxury interiors",
    ],

    challenge:
      "The client wanted to transform a plain living room wall into a luxurious entertainment feature while concealing electrical installations, maintaining a clean minimalist appearance, and incorporating practical storage and display areas. The design also needed to complement the home's warm contemporary aesthetic without overwhelming the space.",

    solution:
      "We designed a fully bespoke media wall featuring a floating wood-finished console, custom decorative wall panelling with concealed cable routing, textured stone cladding, and illuminated open display shelving finished in rich walnut tones. Warm integrated LED lighting enhances depth and ambience, while the floating cabinetry provides concealed storage for media equipment and accessories, creating an elegant entertainment centre that serves as the focal point of the living room.",

    // duration: "4 weeks",
    // area: "26 sqm",

    highlights: [
      "Custom floating media console",
      "Premium stone-clad feature wall",
      "Decorative wall panelling",
      "Integrated warm LED lighting",
      "Illuminated open display shelving",
      "Concealed cable management",
      "Soft-close storage cabinets",
      "Premium walnut wood finish",
      "Minimal contemporary detailing",
      "Luxury living room transformation",
    ],

    media: {
      before: [
        {
          type: "image",
          src: "/images/portfolio/port2/before1.jpg",
          alt: "Plain living room wall before TV feature wall installation",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before2.jpg",
          alt: "Blank entertainment wall before custom media console installation",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before3.jpg",
          alt: "Media wall under construction showing framework for custom joinery",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before4.jpg",
          alt: "Media wall under construction showing framework for custom joinery",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before5.jpg",
          alt: "Media wall under construction showing framework for custom joinery",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before6.jpg",
          alt: "Media wall under construction showing framework for custom joinery",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/before7.jpg",
          alt: "Media wall under construction showing framework for custom joinery",
        },
      ],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port2/after1.jpg",
          alt: "Luxury TV feature wall with textured stone cladding, floating media console and illuminated display shelving",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after2.jpg",
          alt: "Modern floating TV console with stone feature wall and integrated ambient LED lighting",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after3.jpg",
          alt: "Custom media wall with decorative panelling, floating cabinetry and illuminated walnut display shelves",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after4.jpg",
          alt: "Custom media wall with decorative panelling, floating cabinetry and illuminated walnut display shelves",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after5.jpg",
          alt: "Custom media wall with decorative panelling, floating cabinetry and illuminated walnut display shelves",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after6.jpg",
          alt: "Custom media wall with decorative panelling, floating cabinetry and illuminated walnut display shelves",
        },
        {
          type: "image",
          src: "/images/portfolio/port2/after7.jpg",
          alt: "Custom media wall with decorative panelling, floating cabinetry and illuminated walnut display shelves",
        },
      ],
    },
  },

  // {
  //   _id: "11",
  //   title: "Modern Living Room Transformation",
  //   slug: "modern-living-room-transformation",
  //   description:
  //     "A complete transformation of a dated living room into a sophisticated contemporary space that balances comfort, functionality, and timeless elegance.",
  //   category: ["Living Room"],
  //   style: "Contemporary Luxury",
  //   client: "Private",
  //   location: "Eko Atlantic, Lagos",
  //   year: 2024,
  //   featured: true,
  //   published: true,
  //   tags: ["living room", "contemporary", "luxury", "modern"],
  //   challenge:
  //     "The existing living room lacked warmth, cohesion, and efficient space planning. The client wanted a premium entertainment space suitable for everyday living and hosting guests.",
  //   solution:
  //     "We introduced a refined neutral palette, bespoke wall finishes, layered lighting, custom furniture, and carefully selected décor to create a warm yet luxurious atmosphere.",
  //   duration: "9 months",
  //   area: "480 sqm",
  //   highlights: [
  //     "Custom TV feature wall",
  //     "Premium lighting design",
  //     "Bespoke furniture",
  //     "Luxury finishes",
  //   ],
  //   media: {
  //     before: [],
  //     after: [
  //       {
  //         type: "image",
  //         src: "/images/portfolio/port1/bariga-one-bed1.jpg",
  //         alt: "Modern living room transformation",
  //       },
  //       {
  //         type: "video",
  //         src: "/images/portfolio/port1/bariga-one-bed.mp4",
  //         poster:
  //           "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&q=80",
  //         alt: "Living room walkthrough",
  //       },
  //     ],
  //   },
  // },
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
