// 1. Import Images from Assets/Projects
import foodHero from '../assets/projects/appzeto-food-hero.jpg';
import food1 from '../assets/projects/appzeto-food-1.jpg';
import food2 from '../assets/projects/appzeto-food-2.jpg';
import food3 from '../assets/projects/appzeto-food-3.jpg';
import food4 from '../assets/projects/appzeto-food-4.jpg';

import logis1 from '../assets/projects/taxi user.webp';
import logis2 from '../assets/projects/taxi app.webp';
import logis3 from '../assets/projects/travel_tour1.jpg';

import health1 from '../assets/projects/hospital management.jpg';
import health2 from '../assets/projects/hospital management1.jpg';
import health3 from '../assets/projects/hospital_management3.jpg';

import ecom1 from '../assets/projects/ecommerce2.webp';
import ecom2 from '../assets/projects/ecommerce1.jpg';
import ecomNew from '../assets/projects/ecommerce.jpeg';
import ecom3 from '../assets/projects/ott platform.webp';

import appDev from '../assets/projects/appdeveloment.png';
import bankingHero from '../assets/projects/hotel booking dashboard2.avif'; // Update: Using dashboard img for banking
import retailHero from '../assets/projects/software.webp'; // Update: Using software img for retail

// New Imports
import cabbieoImg from '../assets/projects/Cabbieo/WhatsApp Image 2026-01-13 at 3.16.50 PM.jpeg';
import decorryImg from '../assets/projects/decory/hero-image.jpg';
import ourDealsImg from '../assets/projects/our-deals/WhatsApp Image 2026-01-13 at 3.16.50 PM.jpeg';
import healthApp from '../assets/apps/health.png';
import shopApp from '../assets/apps/shop.png';

export const projectsData = [
    {
        id: "cabbieo",
        title: "Cabbieo",
        slug: "cabbieo-taxi",
        subtitle: "Next-Gen Ride Booking",
        category: "TAXI BOOKING",
        description: "A premium ride-booking platform offering seamless user experiences, real-time tracking, and efficient driver dispatching.",
        fullDescription: "Cabbieo redefines urban mobility with a user-centric design and robust backend. From instant bookings to scheduled rides, it handles complex logistics with ease, ensuring passengers get to their destinations safely and on time.",
        thumbnail: cabbieoImg,
        coverImage: cabbieoImg,
        images: [
            cabbieoImg,
            logis1,
            logis2
        ],
        tags: ["Mobile App", "Maps", "Real-time", "Taxi"],
        industry: "Transportation",
        client: "Cabbieo Inc.",
        year: "2024",
        challenge: "Creating a highly responsive dispatch algorithm to minimize wait times during peak hours.",
        solution: "Implemented an intelligent dispatch system using WebSocket for real-time driver-passenger matching.",
        features: [
            "Live Tracking",
            "Secure Payments",
            "Ride Scheduling",
            "Driver Ratings",
            "In-App Chat"
        ],
        results: [
            "40% faster pickup times",
            "High user retention rate",
            "Seamless payment integration"
        ],
        testimonial: {
            text: "Cabbieo has transformed our taxi operations. The app is intuitive and the dispatch system is flawless.",
            author: "Operations Manager",
            role: "Cabbieo"
        }
    },
    {
        id: "decorry",
        title: "Decorry",
        slug: "decorry-interior",
        subtitle: "Modern Interior Design",
        category: "E-COMMERCE",
        description: "An immersive e-commerce platform for premium home decor, featuring AR visualization and curated collections.",
        fullDescription: "Decorry brings the showroom experience to your screen. With high-quality visuals and an easy-to-navigate interface, customers can discover and purchase unique furniture and decor items to transform their living spaces.",
        thumbnail: decorryImg,
        coverImage: decorryImg,
        images: [
            decorryImg,
            ecom1,
            ecom2
        ],
        tags: ["E-commerce", "Interior Design", "Web App", "UI/UX"],
        industry: "Retail / Home Decor",
        client: "Decorry Studio",
        year: "2024",
        challenge: "Showcasing high-fidelity textures and product details without compromising site performance.",
        solution: "Utilized advanced image optimization and lazy loading techniques alongside a high-performance frontend framework.",
        features: [
            "360-degree Product View",
            "AR Room Placement",
            "Curated Lookbooks",
            "Secure Checkout",
            "Wishlist & Collections"
        ],
        results: [
            "Increased average order value",
            "Significant reduction in returns",
            "Award-winning UI design"
        ],
        testimonial: {
            text: "Our online sales skyrocketed after launching the new platform. Customers love the visual experience.",
            author: "Sarah Jenkins",
            role: "Founder, Decorry"
        }
    },
    {
        id: "health-hub",
        title: "HEALTHHUB EHR",
        slug: "health-hub-ecosystem",
        subtitle: "Connected Healthcare",
        category: "HEALTHCARE",
        description: "A centralized Electronic Health Record system connecting 200+ hospitals with real-time patient data sharing.",
        fullDescription: "HealthHub is a nationwide initiative to unify patient records. It allows doctors to access critical medical history instantly, reducing errors and saving lives in emergency situations.",
        thumbnail: food2,
        coverImage: food2,
        images: [
            food2,
            health2,
            health3
        ],
        tags: ["EHR", "Blockchain", "HIPAA", "React"],
        industry: "Medical / Enterprise",
        client: "National health Ministry",
        year: "2023",
        challenge: "Ensuring absolute privacy which meeting stringent government compliance standards across multiple regional jurisdictions.",
        solution: "A private blockchain layer for immutable audit logs and a zero-trust architecture for patient data access.",
        features: [
            "Universal Patient Identifier",
            "Emergency Fast-Access Mode",
            "Encrypted Lab Results Sync",
            "AI Diagnostic Assistant",
            "Family Care Portal"
        ],
        results: [
            "15% reduction in diagnostic errors",
            "Average 30 mins saved per patient visit",
            "Certified HIPAA Gold Standard"
        ],
        testimonial: {
            text: "Security and compliance were our biggest hurdles. Appzeto's zero-trust approach gave us the confidence to finally move to a fully digital health ecosystem.",
            author: "Dr. Aris Varma",
            role: "Chief Technology Officer, Ministry of Health"
        }
    },
    {
        id: "our-deals",
        title: "Our Deals",
        slug: "our-deals-app",
        subtitle: "Best Local Offers",
        category: "E-COMMERCE",
        description: "A hyper-local deals discovery app connecting users with the best discounts and offers closer to them.",
        fullDescription: "Our Deals aggregates exclusive offers from local businesses, restaurants, and service providers. It empowers small businesses to reach relevant customers while helping users save money on their daily purchases.",
        thumbnail: ourDealsImg,
        coverImage: ourDealsImg,
        images: [
            ourDealsImg,
            food3,
            food4
        ],
        tags: ["Deals", "Mobile App", "Location-based", "Marketing"],
        industry: "Retail / Marketing",
        client: "Our Deals Ltd.",
        year: "2024",
        challenge: "Ensuring real-time accuracy of limited-time offers and location-based notifications.",
        solution: "Built a geofencing engine that triggers notifications when users are near a participating store with active deals.",
        features: [
            "Location-based Alerts",
            "QR Redistemption",
            "Vendor Dashboard",
            "Personalized Feed",
            "Social Sharing"
        ],
        results: [
            "High daily active users",
            "Increased foot traffic for partners",
            "Successful regional launch"
        ],
        testimonial: {
            text: "Our Deals helped us bring in new customers during our slow hours. It's a fantastic tool for local marketing.",
            author: "Local Business Owner",
            role: "Partner"
        }
    },
    {
        id: "retail-revive",
        title: "RETAIL REVIVE",
        slug: "omnichannel-retail",
        subtitle: "Seamless Shopping",
        category: "E-COMMERCE",
        description: "Omnichannel inventory and sales platform connecting 500 physical stores with a massive online presence.",
        fullDescription: "Retail Revive bridges the gap between physical and digital shopping. It provides a single pool of inventory and unified customer profiles, enabling 'buy online, return in-store' at scale.",
        thumbnail: ecomNew,
        coverImage: ecomNew,
        images: [
            ecomNew,
            ecom2,
            shopApp
        ],
        tags: ["Next.js", "GraphQL", "Redis", "ElasticSearch"],
        industry: "Retail / Fashion",
        client: "Aura Lifestyle Group",
        year: "2024",
        challenge: "Syncing inventory in real-time across 500 physical locations to avoid overselling online.",
        solution: "A custom-built inventory engine using Redis for sub-millisecond updates and a robust event-driven architecture.",
        features: [
            "Unified Inventory Pool",
            "In-Store Digital Concierge",
            "AI Inventory Forecasting",
            "Multi-Carrier Shipping Sync",
            "Global Loyalty Program"
        ],
        results: [
            "20% increase in store footfall",
            "35% growth in online revenue",
            "Inventory accuracy at 99.8%"
        ],
        testimonial: {
            text: "Appzeto didn't just build a platform; they transformed how we do business. Their omnichannel solution has bridged the gap between our physical stores and online presence perfectly.",
            author: "Robert Chen",
            role: "CTO, Aura Lifestyle"
        }
    }
];
