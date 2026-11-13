import { PortfolioItemType } from "@/types";

export const PORTFOLIO_PROJECTS: PortfolioItemType[] = [
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
        {
          type: "image",
          src: "/images/portfolio/port10/interior_after.jpg",
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

    category: ["Bedroom"],
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
    title: "Bedroom Interior with Walk-In Wardrobe",
    slug: "luxury-walk-in-wardrobe-display-unit",
    description:
      "A bespoke floor-to-ceiling wardrobe system that combines generous storage, illuminated display shelving, and a multifunctional entertainment niche. Designed with contemporary finishes, premium materials, and integrated lighting, the installation transforms the bedroom into a sophisticated and highly organized living space.",

    category: ["Bedroom"],
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
    title: "Contemporary Living Room Interior",
    slug: "modern-tv-wall-media-console",
    description:
      "A bespoke TV wall transformation featuring floating cabinetry, fluted wall panels, integrated LED lighting, illuminated display shelving, and premium finishes that create a refined contemporary living space.",
    category: ["Living Room"],
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
    title: "Contemporary Bedroom Interior",
    slug: "contemporary-built-in-wardrobe-illuminated-display-shelving",

    description:
      "A bespoke floor-to-ceiling wardrobe designed to maximize bedroom storage while creating a refined architectural feature. The design combines minimalist full-height cabinetry with a centrally illuminated open shelving unit, offering the perfect balance of concealed storage and decorative display. Premium finishes, integrated lighting, and carefully planned internal organization deliver a clean, contemporary solution for modern living.",

    category: ["Bedroom"],

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
        {
          type: "image",
          src: "/images/portfolio/port3/wardrobe5.jpg",
          alt: "Custom wardrobe with illuminated storage compartments and organized interior layout",
        },
      ],
    },
  },
  {
    _id: "6",
    title: "Living Room Interior with Feature Wall",
    slug: "luxury-tv-feature-wall-floating-media-console",

    description:
      "A bespoke TV feature wall transformation combining textured stone cladding, premium wall panelling, floating media cabinetry, illuminated display shelving, and integrated ambient lighting. Designed to conceal services while creating a sophisticated focal point that elevates the entire living room.",

    category: ["Living Room"],
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
  {
    _id: "7",
    title: "Modern Kitchen Renovation",
    slug: "modern-kitchen-renovation",
    description:
      "A complete kitchen transformation featuring bespoke cabinetry, premium countertops, kitchen islands, integrated appliances, layered lighting, and contemporary finishes that elevate both functionality and aesthetics.",

    category: ["Kitchen"],
    style: "Modern Contemporary",
    client: "Private Residence",
    location: "Lagos, Nigeria",
    year: 2023,
    featured: true,
    published: true,

    tags: [
      "modern kitchen",
      "kitchen renovation",
      "custom cabinetry",
      "kitchen island",
      "contemporary kitchen",
      "interior renovation",
      "premium finishes",
      "integrated appliances",
      "lighting design",
      "luxury kitchen",
    ],

    challenge:
      "The existing kitchens were outdated, lacked storage efficiency, and no longer reflected the homeowners' lifestyles. Each space required a complete redesign that improved workflow, increased storage capacity, and delivered a timeless contemporary aesthetic.",

    solution:
      "We completely reimagined each kitchen with custom-built cabinetry, durable stone countertops, integrated appliances, modern kitchen islands where applicable, layered ambient and task lighting, and carefully selected finishes that maximize functionality while creating elegant, inviting spaces.",

    // duration: "6 weeks",
    // area: "35 sqm",

    highlights: [
      "Custom-built kitchen cabinetry",
      "Premium stone countertops",
      "Contemporary kitchen islands",
      "Integrated built-in appliances",
      "Ambient LED ceiling lighting",
      "Modern backsplash finishes",
      "Optimized storage solutions",
      "Luxury contemporary detailing",
    ],

    media: {
      before: [
        {
          type: "image",
          src: "/images/portfolio/port8/before3.jpg",
          alt: "Kitchen under construction before cabinetry installation",
        },
        {
          type: "image",
          src: "/images/portfolio/port8/before1.jpg",
          alt: "Kitchen with red cabinetry before renovation",
        },
        {
          type: "image",
          src: "/images/portfolio/port8/before2.jpg",
          alt: "Kitchen with dark wood cabinets before renovation",
        },
      ],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port8/after3.jpg",
          alt: "Modern beige kitchen with custom cabinetry, stone island, and integrated appliances",
        },
        {
          type: "image",
          src: "/images/portfolio/port8/after1.jpg",
          alt: "Modern kitchen with charcoal cabinetry, island, and recessed ceiling lighting",
        },
        {
          type: "image",
          src: "/images/portfolio/port8/after2.jpg",
          alt: "Luxury contemporary kitchen with glossy cabinetry, marble backsplash, and warm LED lighting",
        },
      ],
    },
  },
  {
    _id: "8",
    title: "Contemporary Luxury Bedroom Interior",
    slug: "contemporary-luxury-bedroom-interior",
    description:
      "A refined contemporary bedroom featuring a bespoke upholstered bed with an elegant vertical-panel headboard, mirrored accents, coordinated bedside cabinetry, and carefully layered neutral furnishings. The design combines understated luxury with comfort, creating a serene and sophisticated private retreat.",
    category: ["Bedroom"],
    style: "Contemporary Modern",
    client: "Private Residence",
    location: "Lagos, Nigeria",
    year: 2024,
    featured: true,
    published: true,
    tags: [
      "bedroom",
      "luxury bedroom",
      "upholstered bed",
      "custom headboard",
      "bedroom furniture",
      "bedside cabinets",
      "neutral interiors",
      "contemporary bedroom",
      "interior design",
      "residential",
    ],
    challenge:
      "The client wanted a bedroom that felt elegant, comfortable, and visually cohesive. The design needed a distinctive bed feature, coordinated furniture, and a refined neutral palette without making the space feel overly decorative.",
    solution:
      "We introduced a bespoke upholstered bed with a full-height vertical-panel headboard, complemented by mirrored detailing and matching bedside cabinets. Carefully selected neutral fabrics, coordinated bedding, a matching upholstered bench, and subtle architectural lighting bring warmth, balance, and understated luxury to the space.",
    highlights: [
      "Custom upholstered king-size bed",
      "Full-height vertical-panel headboard",
      "Decorative mirrored headboard accents",
      "Matching bedside cabinets",
      "Coordinated luxury bedding",
      "Custom upholstered bedroom bench",
      "Floor-length window treatments",
      "Warm neutral colour palette",
      "Contemporary bedroom styling",
    ],
    media: {
      before: [],

      after: [
        {
          type: "image",
          src: "/images/portfolio/port12/bedroom_1.jpg",
          alt: "Contemporary luxury bedroom with an upholstered king-size bed and vertical-panel headboard",
        },
        {
          type: "image",
          src: "/images/portfolio/port12/bedroom_2.jpg",
          alt: "Luxury bedroom featuring coordinated upholstered furniture and elegant neutral finishes",
        },
        {
          type: "image",
          src: "/images/portfolio/port12/bedroom_3.jpg",
          alt: "Modern bedroom with bespoke furnishings, decorative headboard, and refined interior styling",
        },
      ],
    },
  },
];
