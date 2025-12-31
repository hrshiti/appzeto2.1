import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';

const Career = () => {

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const positions = [
        {
            id: 1,
            role: "Frontend Developer",
            department: "Engineering",
            tags: ["React", "TailwindCSS", "TypeScript"],
            description: "We are looking for a skilled Frontend Developer to build high-quality, responsive user interfaces. You will work closely with our design team to translate Figma designs into pixel-perfect code.",
            image: "https://images.unsplash.com/photo-1587620962725-abab7fe55159?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 2,
            role: "Backend Engineer",
            department: "Engineering",
            tags: ["Node.js", "Python", "AWS"],
            description: "Join our backend team to design and scale robust APIs and services. You'll deal with high-concurrency systems and help optimize our cloud infrastructure.",
            image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 3,
            role: "UI/UX Designer",
            department: "Design",
            tags: ["Figma", "Prototyping", "User Research"],
            description: "Create intuitive and visually stunning user experiences. You will collaborate closely with product managers to define the user journey and visual language.",
            image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        },
        {
            id: 4,
            role: "DevOps Engineer",
            department: "Operations",
            tags: ["Docker", "Kubernetes", "CI/CD"],
            description: "Maintain and improve our CI/CD pipelines and cloud infrastructure. You will ensure the reliability, security, and scalability of our services.",
            image: "https://images.unsplash.com/photo-1667372393119-c81c0cda0c18?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
        }
    ];

    const stats = [
        { label: "Projects Completed", value: "850+" },
        { label: "Years of Experience", value: "18+" },
        { label: "Happy Customers", value: "500+" },
    ];

    return (
        <div className="bg-black min-h-screen font-sans text-white overflow-x-hidden selection:bg-[#B9FD02] selection:text-black">
            <Navbar />

            {/* --- HERO SECTION --- */}
            <div className="relative pt-16 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Text Content */}
                    <div className="lg:col-span-7 space-y-8 z-10">
                        <div className="flex items-center space-x-3 mb-6">
                            <span className="w-8 h-[2px] bg-white"></span>
                            <span className="text-sm uppercase tracking-wider font-medium text-gray-300">Award Winning Digital Agency</span>
                        </div>

                        <h1 className="text-5xl md:text-7xl font-bold leading-tight">
                            Where Innovation Meets <span className="text-[#B9FD02]">Career Excellence</span>
                        </h1>

                        <div className="flex flex-wrap gap-3">
                            {["Software Development", "Product Design", "Digital Marketing", "Cloud Solutions"].map((item, idx) => (
                                <span key={idx} className="px-4 py-2 rounded-full border border-gray-700 text-sm md:text-base text-gray-300 hover:border-[#B9FD02] hover:text-[#B9FD02] transition-colors cursor-default">
                                    {item}
                                </span>
                            ))}
                        </div>

                        {/* Main Image Area with Overlay */}
                        <div className="relative mt-12 group">
                            <div className="relative rounded-[2.5rem] overflow-hidden aspect-[16/9] border border-gray-800">
                                <img
                                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                                    alt="Team Application"
                                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-700"
                                />
                                {/* Overlay review card */}
                                <div className="absolute bottom-6 left-6 bg-[#B9FD02] text-black px-6 py-3 rounded-full flex items-center gap-4 shadow-xl z-20">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-[#B9FD02]"></div>
                                        ))}
                                        <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-xs border-2 border-[#B9FD02]">+</div>
                                    </div>
                                    <div>
                                        <div className="font-bold text-sm">4.9 Star</div>
                                        <div className="text-xs opacity-80">Employee Reviews</div>
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Star elements */}
                            <div className="absolute -top-6 -left-8 text-[#B9FD02] animate-bounce duration-1000">
                                <svg width="50" height="50" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" /></svg>
                            </div>
                        </div>

                        <div className="text-gray-400 max-w-xl text-lg leading-relaxed">
                            Join a team that pushes boundaries. We are looking for passionate individuals ready to make an impact in the digital world.
                        </div>
                    </div>

                    {/* Right Column: Stats & Badge */}
                    <div className="lg:col-span-5 relative mt-12 lg:mt-0 flex flex-col items-end">

                        {/* Spinning Badge */}
                        <div className="mb-12 relative group">
                            <div className="relative w-32 h-32 md:w-40 md:h-40 flex items-center justify-center bg-black rounded-full border border-gray-800 group-hover:border-[#B9FD02] transition-colors">
                                <svg className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] text-white group-hover:text-[#B9FD02]" viewBox="0 0 100 100">
                                    <defs>
                                        <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                                    </defs>
                                    <text fontSize="11" fill="currentColor">
                                        <textPath xlinkHref="#circle" letterSpacing="2">
                                            JOIN OUR TEAM •  BUILD THE FUTURE •
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="w-20 h-20 bg-[#B9FD02] rounded-full flex items-center justify-center">
                                    <span className="material-icons text-4xl text-black transform -rotate-45">arrow_forward</span>
                                </div>
                            </div>
                        </div>

                        {/* Green Stats Card */}
                        <div className="bg-[#B9FD02] rounded-[2rem] p-8 md:p-10 w-full max-w-sm text-black">
                            <div className="space-y-8">
                                {stats.map((stat, idx) => (
                                    <div key={idx} className="border-b border-black/10 last:border-0 pb-6 last:pb-0">
                                        <div className="text-4xl font-bold mb-1">{stat.value}</div>
                                        <div className="text-sm font-medium opacity-80">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- SCROLLING TICKER --- */}
            <div className="bg-[#B9FD02] py-4 overflow-hidden -rotate-1 transform origin-left md:origin-center scale-105 border-y-4 border-black">
                <div className="whitespace-nowrap flex animate-[scroll_20s_linear_infinite]">
                    {[1, 2, 3, 4, 5, 6].map((_, i) => (
                        <div key={i} className="flex items-center mx-4 text-black font-bold text-xl md:text-2xl uppercase tracking-wider">
                            <span>Development</span>
                            <span className="mx-6 text-3xl h-full flex items-center justify-center">✷</span>
                            <span>Design</span>
                            <span className="mx-6 text-3xl">✷</span>
                            <span>Marketing</span>
                            <span className="mx-6 text-3xl">✷</span>
                            <span>Strategy</span>
                            <span className="mx-6 text-3xl">✷</span>
                        </div>
                    ))}
                </div>
            </div>

            {/* --- OPEN POSITIONS LIST --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">

                <div className="flex flex-col md:flex-row justify-between items-end mb-20 border-l-4 border-[#B9FD02] pl-6">
                    <div>
                        <div className="text-[#B9FD02] font-medium mb-2 uppercase tracking-wide">Open Positions</div>
                        <h2 className="text-4xl md:text-6xl font-bold">Discover Our<br />Career Opportunities</h2>
                    </div>
                    <p className="max-w-md text-gray-400 mt-6 md:mt-0 text-right md:text-left">
                        We define our success by the success of our people. Join us and help create digital solutions that matter.
                    </p>
                </div>

                <div className="flex flex-col space-y-6">
                    {positions.map((job, index) => (
                        <div key={job.id} className="group relative bg-[#0a0a0a] rounded-3xl p-8 transition-all duration-500 hover:bg-[#111] border border-gray-900 overflow-hidden">
                            <div className="relative z-10 flex flex-col lg:flex-row gap-8 lg:items-center">

                                {/* Index Number */}
                                <div className="text-2xl font-mono text-gray-600 font-bold">
                                    0{index + 1}.
                                </div>

                                {/* Title & Tags */}
                                <div className="flex-1">
                                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-[#B9FD02] transition-colors">
                                        {job.role}
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {job.tags.map((tag, i) => (
                                            <span key={i} className="px-3 py-1 rounded-md bg-white text-black text-xs font-bold uppercase">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                    <p className="mt-6 text-gray-400 leading-relaxed max-w-2xl">
                                        {job.description}
                                    </p>
                                </div>

                                {/* Action Area */}
                                <div className="flex items-center gap-4 lg:self-center self-start mt-4 lg:mt-0">
                                    <button className="bg-[#B9FD02] hover:bg-white text-black font-bold py-3 px-8 rounded-full transition-all duration-300">
                                        Apply Now
                                    </button>
                                    <div className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all">
                                        <span className="material-icons transform -rotate-45 group-hover:rotate-0 transition-transform">arrow_forward</span>
                                    </div>
                                </div>
                            </div>

                            {/* Hover Image Reveal */}
                            <div className="absolute top-1/2 right-1/4 transform -translate-y-1/2 translate-x-12 opacity-0 group-hover:opacity-20 lg:group-hover:opacity-100 lg:group-hover:translate-x-0 transition-all duration-700 pointer-events-none w-64 h-40 hidden lg:block rounded-xl overflow-hidden shadow-2xl border-2 border-[#B9FD02] grayscale group-hover:grayscale-0">
                                <img src={job.image} alt={job.role} className="w-full h-full object-cover" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes scroll {
                    0% { transform: translateX(0); }
                    100% { transform: translateX(-50%); }
                }
            `}</style>
        </div>
    );
};

export default Career;
