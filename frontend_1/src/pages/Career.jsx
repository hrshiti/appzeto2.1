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
            title: "Frontend Developer",
            type: "Full Time",
            description: "We are looking for a skilled Frontend Developer to build high-quality, responsive user interfaces using React and TailwindCSS.",
            location: "Remote",
            salary: "$80k-100k",
            id: 1
        },
        {
            title: "Backend Engineer",
            type: "Full Time",
            description: "Join our backend team to design and scale robust APIs and services using Node.js and Python. Experience with cloud infrastructure is a plus.",
            location: "London, UK",
            salary: "$90k-120k",
            id: 2
        },
        {
            title: "UI/UX Designer",
            type: "Remote",
            description: "Create intuitive and visually stunning user experiences. You will collaborate closely with product managers and developers.",
            location: "Remote",
            salary: "$70k-90k",
            id: 3
        },
        {
            title: "DevOps Engineer",
            type: "Full Time",
            description: "Maintain and improve our CI/CD pipelines and cloud infrastructure. Ensure reliability and scalability of our services.",
            location: "New York, USA",
            salary: "$100k-130k",
            id: 4
        },
        {
            title: "Product Manager",
            type: "Full Time",
            description: "Lead the product vision and strategy. Work with cross-functional teams to deliver value to our customers.",
            location: "Remote",
            salary: "$95k-115k",
            id: 5
        },
        {
            title: "Mobile Developer",
            type: "Remote",
            description: "Build native and cross-platform mobile applications for iOS and Android using React Native or Flutter.",
            location: "San Francisco, CA",
            salary: "$90k-110k",
            id: 6
        }
    ];

    const trustLogos = [
        "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/5/51/IBM_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg",
        "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
    ];

    return (
        <div className="bg-white min-h-screen font-display">
            <Navbar />

            {/* Header Section */}
            <div className="bg-[#0c0c0c] text-white py-24 text-center">
                <h1 className="text-5xl md:text-6xl font-bold mb-4">Career</h1>
                <div className="flex justify-center items-center space-x-2 text-sm md:text-base text-gray-400">
                    <Link to="/" className="hover:text-white transition-colors">Home</Link>
                    <span>&gt;</span>
                    <span className="text-purple-500 font-medium">Career</span>
                </div>
            </div>

            {/* Team Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="flex flex-col md:flex-row justify-between items-start mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight max-w-md">
                        Meet the team work behind our success
                    </h2>
                    <p className="mt-4 md:mt-0 max-w-lg text-gray-600 leading-relaxed">
                        Our team consists of a group of talents. We solve customer problems with sincerity. All of our team members are very intelligent and skilled.
                    </p>
                </div>

                <div className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                    <img
                        src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
                        alt="Team Working"
                        className="w-full h-full object-cover"
                    />
                </div>
            </div>

            {/* Open Positions Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 pb-24">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
                    Currently open positions
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {positions.map((position) => (
                        <div key={position.id} className="bg-white border border-gray-100 rounded-xl p-8 hover:shadow-xl transition-all duration-300 group cursor-pointer">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{position.title}</h3>
                                    <span className="text-sm font-medium text-gray-500 mt-1 block">{position.type}</span>
                                </div>
                                <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <span className="material-icons text-sm transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">arrow_forward</span>
                                </div>
                            </div>

                            <p className="text-gray-600 text-sm leading-relaxed mb-6 h-10 line-clamp-2">
                                {position.description}
                            </p>

                            <div className="flex items-center space-x-6 text-sm font-medium text-gray-800">
                                <div className="flex items-center space-x-2">
                                    <span className="material-icons text-gray-400 text-lg">location_on</span>
                                    <span>{position.location}</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <span className="material-icons text-gray-400 text-lg">attach_money</span>
                                    <span>{position.salary}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Trusted By Section */}
            <div className="bg-gray-50 py-12 border-t border-gray-100">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-gray-500 font-medium mb-8">Trusted by 1600+ of the world's most popular companies</p>
                    <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
                        {trustLogos.map((logo, index) => (
                            <img key={index} src={logo} alt="Company Logo" className="h-8 md:h-10 w-auto object-contain" />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Career;
