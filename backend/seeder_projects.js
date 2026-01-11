const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDB = require('./src/config/db');
const Project = require('./src/models/Project');

dotenv.config();
connectDB();

const projects = [
    {
        title: "Fleet Master Pro",
        category: "Logistics",
        industry: "Global Logistics",
        thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80",
        shortDescription: "A large-scale fleet management system for a global shipping giant, featuring real-time telemetry and AI-driven route optimization.",
        techTags: ["IoT", "Node.js", "AWS", "React"],
        isFeatured: true,
        hero: {
            title: "Fleet Master Pro",
            subtitle: "Enterprise Logistics Ecosystem",
            coverImage: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80"
        },
        info: {
            client: "TransWorld Shipping",
            year: "2023",
            duration: "8 Months",
            technologies: [
                { name: "Node.js", icon: "Server" },
                { name: "AWS", icon: "Cloud" },
                { name: "React", icon: "Code" }
            ]
        },
        overview: {
            text: "Fleet Master Pro was developed for one of the world's largest logistics providers to solve the complexity of managing 50,000+ vehicles across multiple continents. The system integrates IoT sensors, GPS tracking, and predictive maintenance schedules into a unified dashboard.",
            mediaUrl: "https://images.unsplash.com/photo-1566576912902-1dcd47eb7952?auto=format&fit=crop&q=80"
        },
        challenge: {
            description: "Managing massive data streams from IoT sensors while maintaining sub-second latency.",
            points: ["High Latency", "Data Fragmentation", "Legacy Systems"]
        },
        solution: {
            description: "A serverless microservices architecture on AWS using Kinesis for stream processing.",
            points: ["Real-time Processing", "Unified Dashboard", "Scalable Infrastructure"]
        },
        results: [
            { label: "Cost Reduction", value: "22%" },
            { label: "Delivery Speed", value: "+18%" }
        ],
        testimonial: {
            text: "The efficiency gains we've seen since deploying Fleet Master Pro are staggering.",
            author: "Marcus Thorne",
            role: "Director of Logistics"
        }
    },
    {
        title: "Neon Banking",
        category: "Fintech",
        industry: "Finance",
        thumbnail: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
        shortDescription: "Complete digital transformation of a legacy banking institution into a modern, mobile-first financial powerhouse.",
        techTags: ["Fintech", "Mobile App", "Security", "Swift"],
        isFeatured: true,
        hero: {
            title: "Neon Banking",
            subtitle: "Digital Banking Revolution",
            coverImage: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80"
        },
        info: {
            client: "Neon Financial Group",
            year: "2024",
            duration: "12 Months",
            technologies: [
                { name: "Swift", icon: "Smartphone" },
                { name: "Node.js", icon: "Server" },
                { name: "MongoDB", icon: "Database" }
            ]
        },
        overview: {
            text: "Neon Banking represents a complete overhaul of traditional banking.",
            mediaUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80"
        },
        challenge: {
            description: "Migrating 2 million users from a 20-year-old mainframe system.",
            points: ["Zero Downtime Requirement", "Data Integrity", "Security Compliance"]
        },
        solution: {
            description: "We implemented a dual-run strategy with a custom synchronization layer.",
            points: ["Phased Migration", "Dual-Run Sync", "Modern UI/UX"]
        },
        results: [
            { label: "Mobile Engagement", value: "+300%" },
            { label: "Support Calls", value: "-50%" }
        ],
        testimonial: {
            text: "Appzeto redefined our digital identity. The UI is breathtaking.",
            author: "Elena Rodriguez",
            role: "CEO, Neon Group"
        }
    },
    {
        title: "HealthHub EHR",
        category: "Healthcare",
        industry: "Medical",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80",
        shortDescription: "A centralized Electronic Health Record system connecting 200+ hospitals with real-time patient data sharing.",
        techTags: ["EHR", "Blockchain", "HIPAA", "React"],
        isFeatured: false,
        hero: {
            title: "HealthHub EHR",
            subtitle: "Connected Healthcare",
            coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80"
        },
        info: {
            client: "Ministry of Health",
            year: "2023",
            duration: "18 Months",
            technologies: [
                { name: "Blockchain", icon: "Database" },
                { name: "React", icon: "Code" }
            ]
        },
        overview: { text: "HealthHub is a nationwide initiative to unify patient records.", mediaUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?auto=format&fit=crop&q=80" },
        challenge: { description: "Ensuring absolute privacy.", points: ["Data Privacy", "Interoperability"] },
        solution: { description: "Private blockchain layer.", points: ["Immutable Logs", "Zero-Trust"] },
        results: [{ label: "Errors Reduced", value: "15%" }, { label: "Time Saved", value: "30 mins" }],
        testimonial: { text: "Security and compliance were our biggest hurdles.", author: "Dr. Aris Varma", role: "CTO" }
    },
    {
        title: "Fresh Mart App",
        category: "E-Commerce",
        industry: "Retail",
        thumbnail: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80",
        shortDescription: "A hyper-local grocery delivery app connecting 500+ local organic farms directly to urban consumers.",
        techTags: ["React Native", "Firebase", "Stripe"],
        isFeatured: true,
        hero: {
            title: "Fresh Mart App",
            subtitle: "Groceries in Minutes",
            coverImage: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80"
        },
        info: {
            client: "Fresh Mart Inc.",
            year: "2024",
            duration: "6 Months",
            technologies: [
                { name: "React Native", icon: "Smartphone" },
                { name: "Firebase", icon: "Database" }
            ]
        },
        overview: { text: "Fresh Mart revolutionizes how city dwellers shop for food.", mediaUrl: "https://images.unsplash.com/photo-1583258292688-d0213dc5a3a8?auto=format&fit=crop&q=80" },
        challenge: { description: "Syncing real-time inventory.", points: ["Inventory Sync", "Vendor Onboarding"] },
        solution: { description: "Vendor-side lite app.", points: ["Real-time Sync", "Direct Chat"] },
        results: [{ label: "Revenue", value: "+35%" }, { label: "Waste Reduced", value: "40%" }],
        testimonial: { text: "This app saved our farm.", author: "Sophia Laurent", role: "Founder" }
    },
    {
        title: "Retail Revive",
        category: "E-Commerce",
        industry: "Retail",
        thumbnail: "https://images.unsplash.com/photo-1441986300917-64674bd80026?auto=format&fit=crop&q=80",
        shortDescription: "Omnichannel inventory and sales platform connecting 500 physical stores with a massive online presence.",
        techTags: ["Next.js", "Redis", "ElasticSearch"],
        isFeatured: false,
        hero: {
            title: "Retail Revive",
            subtitle: "Seamless Shopping",
            coverImage: "https://images.unsplash.com/photo-1441986300917-64674bd80026?auto=format&fit=crop&q=80"
        },
        info: {
            client: "Aura Lifestyle",
            year: "2024",
            duration: "10 Months",
            technologies: [
                { name: "Next.js", icon: "Layout" },
                { name: "Redis", icon: "Database" }
            ]
        },
        overview: { text: "Retail Revive bridges the gap between physical and digital.", mediaUrl: "https://images.unsplash.com/photo-1472851294608-415522f96385?auto=format&fit=crop&q=80" },
        challenge: { description: "Syncing inventory across 500 stores.", points: ["Latency", "Scale"] },
        solution: { description: "Redis-based inventory engine.", points: ["Sub-ms Updates", "Event Driven"] },
        results: [{ label: "Online Rev", value: "+35%" }, { label: "Accuracy", value: "99.8%" }],
        testimonial: { text: "Appzeto transformed our business.", author: "Robert Chen", role: "CTO" }
    }
];

const importData = async () => {
    try {
        await Project.deleteMany();
        await Project.insertMany(projects);
        console.log('Data Imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

importData();
