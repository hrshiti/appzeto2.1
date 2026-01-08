// 1. Import Images from Assets
import foodAppImg from '../assets/apps/food.png';
import goAppImg from '../assets/apps/go.png';
import healthAppImg from '../assets/apps/health.png';
import shopAppImg from '../assets/apps/shop.png';

// Service Previews (Generic Tech UI)
import aiServiceImg from '../assets/ai_ml_service_preview_1767285486518.png';
import cloudServiceImg from '../assets/cloud_computing_service_preview_1767285540190.png';
import mobileServiceImg from '../assets/mobile_apps_service_preview_1767285521524.png';
import uiServiceImg from '../assets/ui_ux_design_service_preview_1767285557945.png';
import webServiceImg from '../assets/web_dev_service_preview_1767285503403.png';

// Food Series
import food1 from '../assets/appzeto-food-1.jpg';
import food2 from '../assets/appzeto-food-2.jpg';
import food3 from '../assets/appzeto-food-3.jpg';
import food4 from '../assets/appzeto-food-4.jpg';
import foodHero from '../assets/appzeto-food-hero.jpg';


export const projectsData = [
    {
        id: "fleet-master",
        title: "FLEET MASTER PRO",
        slug: "fleet-master-pro",
        subtitle: "Enterprise Logistics Ecosystem",
        category: "LOGISTICS",
        description: "A large-scale fleet management system for a global shipping giant, featuring real-time telemetry and AI-driven route optimization.",
        fullDescription: "Fleet Master Pro was developed for one of the world's largest logistics providers to solve the complexity of managing 50,000+ vehicles across multiple continents. The system integrates IoT sensors, GPS tracking, and predictive maintenance schedules into a unified dashboard.",
        thumbnail: goAppImg,
        coverImage: goAppImg,
        images: [
            goAppImg,
            food4,
            food2,
            goAppImg
        ],
        tags: ["IoT", "Node.js", "AWS", "React"],
        industry: "Global Logistics",
        client: "TransWorld Shipping",
        year: "2023",
        challenge: "Managing massive data streams from IoT sensors while maintaining sub-second latency for dispatchers across different time zones.",
        solution: "A serverless microservices architecture on AWS using Kinesis for stream processing and a highly optimized React dashboard for visualization.",
        features: [
            "Real-time IoT Telemetry",
            "Predictive Maintenance AI",
            "Dynamic Dispatching System",
            "Automated Compliance Filing",
            "Cross-Border Customs Integration"
        ],
        results: [
            "22% reduction in fuel costs",
            "18% increase in delivery speed",
            "99.9% system availability"
        ],
        testimonial: {
            text: "The efficiency gains we've seen since deploying Fleet Master Pro are staggering. It's not just a tool; it's the backbone of our global operations.",
            author: "Marcus Thorne",
            role: "Director of Logistics, TransWorld"
        }
    },
    {
        id: "neon-bank",
        title: "NEON BANKING",
        slug: "neon-banking-ui",
        subtitle: "Digital Banking Revolution",
        category: "FINTECH",
        description: "Complete digital transformation of a legacy banking institution into a modern, mobile-first financial powerhouse.",
        fullDescription: "Neon Banking represents a complete overhaul of traditional banking. We redesigned the core banking experience from the ground up, focusing on speed, security, and a minimalist UI that makes complex financial tasks intuitive.",
        thumbnail: uiServiceImg,
        coverImage: uiServiceImg,
        images: [
            shopAppImg,
            healthAppImg,
            food3,
            shopAppImg
        ],
        tags: ["Fintech", "Mobile App", "Security", "Swift"],
        industry: "Financial Services",
        client: "Neon Financial Group",
        year: "2024",
        challenge: "Migrating 2 million users from a 20-year-old mainframe system to a modern cloud-native architecture without a second of downtime.",
        solution: "We implemented a dual-run strategy with a custom synchronization layer that allowed for a phased migration over six months.",
        features: [
            "Biometric Multi-Sig Security",
            "Instant Cross-Border FX",
            "AI Spending Insights",
            "Crypto-Asset Wallet",
            "Smart Savings Goals"
        ],
        results: [
            "300% increase in mobile engagement",
            "50% reduction in support calls",
            "Top-rated banking app in 2024"
        ],
        testimonial: {
            text: "Appzeto redefined our digital identity. The UI is breathtaking, and the migration was handled with surgical precision. Highly recommended.",
            author: "Elena Rodriguez",
            role: "CEO, Neon Financial Group"
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
        thumbnail: healthAppImg,
        coverImage: healthAppImg,
        images: [
            healthAppImg,
            food1,
            goAppImg,
            healthAppImg
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
        id: "fresh-mart",
        title: "FRESH MART APP",
        slug: "fresh-mart-delivery",
        subtitle: "Groceries in Minutes",
        category: "E-COMMERCE",
        description: "A hyper-local grocery delivery app connecting 500+ local organic farms directly to urban consumers.",
        fullDescription: "Fresh Mart revolutionizes how city dwellers shop for food. By cutting out the middlemen and prioritizing local produce, we ensure fresher food and fairer prices for farmers, all accessible via a slick mobile interface.",
        thumbnail: foodAppImg,
        coverImage: foodHero,
        images: [
            foodAppImg,
            food1,
            food2,
            food3,
            food4
        ],
        tags: ["Next.js", "React Native", "Firebase", "Stripe"],
        industry: "Retail / Food Tech",
        client: "Fresh Mart Inc.",
        year: "2024",
        challenge: "Syncing real-time inventory from hundreds of small, non-digital farm vendors.",
        solution: "A vendor-side 'Lite' app that allows farmers to update stock with a single tap, syncing instantly to the consumer platform.",
        features: [
            "Farm-to-Table Tracking",
            "Live Delivery GPS",
            "AI Recipe Suggestions",
            "Subscription Boxes",
            "Vendor Direct Chat"
        ],
        results: [
            "20% increase in farmer revenue",
            "35% growth in monthly orders",
            "Inventory waste reduced by 40%"
        ],
        testimonial: {
            text: "This app didn't just help our business; it saved our farm. The direct connection to customers is exactly what the industry needed.",
            author: "Sophia Laurent",
            role: "Founder, Green Valley Farms"
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
        thumbnail: shopAppImg,
        coverImage: shopAppImg,
        images: [
            shopAppImg,
            foodHero,
            food2,
            shopAppImg
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
