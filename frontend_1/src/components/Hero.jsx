import React from 'react';
import logo from '../assets/logo.png';

const Hero = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 w-full bg-white dark:bg-surface-dark border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center">
                            <img alt="Appzeto Logo" className="h-10 w-auto" src={logo} />
                        </div>
                        <div className="hidden md:flex items-center h-full">
                            {[
                                {
                                    title: "Solutions",
                                    description: "Comprehensive tech solutions for enterprise growth.",
                                    items: ["Enterprise AI", "Cloud Infrastructure", "Data Analytics", "Cybersecurity", "IoT Ecosystem"]
                                },
                                {
                                    title: "Services",
                                    description: "End-to-end development and specialized services.",
                                    items: ["Custom Software", "Mobile Development", "UI/UX Design", "QA & Testing", "DevOps Services"]
                                },
                                {
                                    title: "Portfolio",
                                    description: "Explore our success stories and impact.",
                                    items: ["Success Stories", "Case Studies", "Client Testimonials"]
                                },
                                {
                                    title: "Careers",
                                    description: "Join our team of innovators and creators.",
                                    items: ["Open Positions", "Life at Appzeto", "Internships"]
                                },
                                {
                                    title: "Contact Us",
                                    description: "Get in touch with our global team.",
                                    items: ["Sales Inquiry", "Technical Support", "Office Locations"]
                                }
                            ].map((navItem, index) => (
                                <div key={index} className="group static h-full flex items-center px-4">
                                    <button className="flex items-center space-x-1 text-gray-600 dark:text-gray-300 group-hover:text-primary dark:group-hover:text-primary font-medium transition-colors focus:outline-none h-full border-b-2 border-transparent group-hover:border-primary">
                                        <span>{navItem.title}</span>
                                        <span className="material-icons text-sm transition-transform duration-200 group-hover:-rotate-180">expand_more</span>
                                    </button>
                                    <div className="absolute top-20 left-0 w-full bg-white dark:bg-surface-dark border-t border-gray-100 dark:border-gray-800 shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700 transform origin-top -translate-y-10 group-hover:translate-y-0 z-50">
                                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                                            <div className="flex">
                                                <div className="w-1/4 pr-8 border-r border-gray-100 dark:border-gray-800 transform opacity-0 translate-x-[-10px] group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-out delay-100">
                                                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">{navItem.title}</h3>
                                                    <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                                        {navItem.description}
                                                    </p>
                                                    <a href="#" className="inline-flex items-center mt-4 text-sm font-semibold text-primary hover:text-teal-600">
                                                        View Overview <span className="material-icons text-sm ml-1">arrow_forward</span>
                                                    </a>
                                                </div>
                                                <div className="w-3/4 pl-8">
                                                    <div className="grid grid-cols-3 gap-y-4 gap-x-8">
                                                        {navItem.items.map((subItem, subIndex) => (
                                                            <a
                                                                key={subIndex}
                                                                href="#"
                                                                className="group/item mobile:block p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                                                            >
                                                                <div
                                                                    className="flex items-start space-x-3 transform opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500 ease-out"
                                                                    style={{ transitionDelay: `${subIndex * 150 + 300}ms` }}
                                                                >
                                                                    <div className="flex-shrink-0">
                                                                        <span className="material-icons text-gray-400 group-hover/item:text-primary transition-colors">chevron_right</span>
                                                                    </div>
                                                                    <div>
                                                                        <p className="text-sm font-semibold text-gray-900 dark:text-gray-100 group-hover/item:text-primary transition-colors">{subItem}</p>
                                                                    </div>
                                                                </div>
                                                            </a>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className="pl-4 ml-2 border-l border-gray-200 dark:border-gray-700 h-10 flex items-center">
                                <a className="bg-primary hover:bg-teal-600 text-white px-6 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/30" href="#">
                                    Get Quote
                                </a>
                            </div>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
                                <span className="material-icons text-3xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-grow flex relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-10 lg:pt-6 lg:pb-20 w-full relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        <div className="space-y-8 animate-fade-in-up">
                            <div className="inline-flex items-center space-x-2 bg-teal-50 dark:bg-teal-900/30 border border-teal-100 dark:border-teal-800 rounded-full px-4 py-1.5">
                                <span className="flex h-2 w-2 relative">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                                </span>
                                <span className="text-sm font-semibold text-primary tracking-wide uppercase">Reflect Technology</span>
                            </div>
                            <h1 className="text-5xl lg:text-6xl font-display font-extrabold text-gray-900 dark:text-white leading-tight">
                                Building the <span className="text-primary relative inline-block">
                                    Future
                                    <svg className="absolute w-full h-3 bottom-1 left-0 text-secondary -z-10 opacity-60" preserveAspectRatio="none" viewBox="0 0 100 10">
                                        <path d="M0 5 Q 50 10 100 5" fill="none" stroke="currentColor" strokeWidth="8"></path>
                                    </svg>
                                </span> of Digital Innovation
                            </h1>
                            <p className="text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-lg leading-relaxed">
                                We transform businesses with cutting-edge <span className="font-semibold text-gray-800 dark:text-gray-100">Web Development</span>, immersive <span className="font-semibold text-gray-800 dark:text-gray-100">Mobile Apps</span>, and intelligent <span className="font-semibold text-gray-800 dark:text-gray-100">AI &amp; ML</span> solutions.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <a className="inline-flex justify-center items-center px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-teal-500/30 hover:bg-teal-600 hover:shadow-teal-500/50 transform hover:-translate-y-1 transition-all duration-300 text-lg group" href="#">
                                    Explore Services
                                    <span className="material-icons ml-2 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                                </a>
                                <a className="inline-flex justify-center items-center px-8 py-4 bg-white dark:bg-surface-dark text-gray-700 dark:text-gray-200 font-semibold rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-300 text-lg" href="#">
                                    <span className="material-icons mr-2 text-primary">play_circle_filled</span>
                                    Watch Demo
                                </a>
                            </div>
                            <div className="pt-8 flex items-center space-x-6 text-gray-500 dark:text-gray-400 text-sm font-medium">
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-lg">verified</span>
                                    Top Rated Developer
                                </div>
                                <div className="flex items-center">
                                    <span className="material-icons text-primary mr-2 text-lg">rocket_launch</span>
                                    Agile Delivery
                                </div>
                            </div>
                        </div>
                        <div className="relative lg:h-full flex items-center justify-center">
                            <div className="relative w-full aspect-square max-w-lg mx-auto flex items-center justify-center">
                                <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 via-transparent to-secondary/30 rounded-full opacity-60 blur-3xl animate-pulse dark:opacity-40"></div>
                                <div className="relative z-10 w-full h-[80%] perspective-1000">
                                    <div className="absolute top-0 left-0 w-[90%] z-10 hover:scale-[1.02] transition-transform duration-500">
                                        <div className="relative bg-gray-800 rounded-t-xl p-[2%] shadow-2xl border-t border-l border-r border-gray-700/50">
                                            <div className="bg-slate-900 rounded-lg overflow-hidden aspect-[16/10] relative border border-gray-800 shadow-inner">
                                                <div className="h-[8%] bg-slate-800 flex items-center px-3 space-x-1.5 border-b border-slate-700/50 w-full z-20 relative">
                                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                                    <div className="ml-4 h-1.5 w-1/3 bg-slate-700 rounded-full opacity-50"></div>
                                                </div>
                                                <div className="relative w-full h-[92%]">
                                                    <div className="absolute inset-0 bg-slate-900 flex flex-col animate-carousel-cycle" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="w-full h-8 border-b border-gray-800 flex items-center px-4 space-x-2 bg-slate-900 z-20">
                                                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                                            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                                            <div className="flex-1 text-[8px] text-center text-gray-500 font-mono">appzeto.com</div>
                                                        </div>
                                                        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4 bg-gradient-to-br from-slate-900 to-slate-800 relative overflow-hidden">
                                                            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,_rgba(0,166,166,0.1),_transparent)]"></div>
                                                            <div className="w-full flex justify-between items-center mb-2 px-2 opacity-50">
                                                                <div className="w-12 h-2 bg-gray-700 rounded"></div>
                                                                <div className="flex space-x-2">
                                                                    <div className="w-6 h-1.5 bg-gray-700 rounded"></div>
                                                                    <div className="w-6 h-1.5 bg-gray-700 rounded"></div>
                                                                </div>
                                                            </div>
                                                            <div className="text-center space-y-2 z-10">
                                                                <div className="inline-block px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-[6px] text-primary tracking-widest">v2.0 RELEASE</div>
                                                                <div className="text-2xl font-bold text-white tracking-tight">Deploy Faster</div>
                                                                <div className="h-1 w-24 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent"></div>
                                                                <div className="text-[8px] text-gray-400 max-w-[120px] mx-auto leading-tight">Scale your applications with our cloud infrastructure.</div>
                                                                <div className="flex justify-center space-x-2 pt-1">
                                                                    <div className="px-3 py-1 bg-primary text-white text-[6px] rounded font-bold shadow-lg shadow-primary/20">Get Started</div>
                                                                    <div className="px-3 py-1 bg-gray-800 text-gray-300 border border-gray-700 text-[6px] rounded">Documentation</div>
                                                                </div>
                                                            </div>
                                                            <div className="absolute bottom-4 left-4 w-12 h-12 bg-gray-800 rounded-lg border border-gray-700 opacity-60 skew-y-6"></div>
                                                            <div className="absolute top-12 right-6 w-10 h-10 bg-gray-800 rounded-lg border border-gray-700 opacity-60 -skew-y-12"></div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-[#0d1117] flex flex-col p-4 animate-carousel-cycle delay-4000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="flex gap-2 mb-3">
                                                            <div className="px-2 py-0.5 bg-gray-800 rounded text-[6px] text-gray-400">main.py</div>
                                                            <div className="px-2 py-0.5 rounded text-[6px] text-gray-500">utils.py</div>
                                                        </div>
                                                        <div className="font-mono text-[8px] sm:text-[10px] space-y-1.5 opacity-80">
                                                            <div className="flex"><span className="text-primary mr-2">import</span> <span className="text-white">tensorflow</span> <span className="text-primary mx-2">as</span> <span className="text-white">tf</span></div>
                                                            <div className="flex"><span className="text-primary mr-2">def</span> <span className="text-secondary">analyze_data</span><span className="text-white">(input):</span></div>
                                                            <div className="flex pl-4"><span className="text-gray-400"># AI Processing logic</span></div>
                                                            <div className="flex pl-4"><span className="text-white">model = tf.keras.models.load()</span></div>
                                                            <div className="flex pl-4"><span className="text-primary">return</span> <span className="text-white">model.predict(input)</span></div>
                                                        </div>
                                                        <div className="mt-auto p-2 bg-gray-800/50 rounded border border-gray-700 flex items-center gap-3">
                                                            <div className="w-6 h-6 rounded-full border-2 border-t-primary border-r-secondary border-b-primary border-l-secondary animate-spin"></div>
                                                            <div className="text-[8px] text-primary">Compiling Neural Network...</div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 bg-slate-900 flex flex-col p-6 animate-carousel-cycle delay-8000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
                                                            <div className="flex items-center space-x-2">
                                                                <span className="material-icons text-green-500 text-sm">dns</span>
                                                                <span className="text-xs font-mono text-gray-300">SYSTEM_MONITOR</span>
                                                            </div>
                                                            <div className="flex space-x-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                                                <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse delay-75"></div>
                                                            </div>
                                                        </div>
                                                        <div className="space-y-5">
                                                            <div>
                                                                <div className="flex justify-between text-[10px] text-blue-400 font-mono mb-1">
                                                                    <span>CPU_USAGE</span>
                                                                    <span>87%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 w-[87%] shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                                                                </div>
                                                            </div>
                                                            <div>
                                                                <div className="flex justify-between text-[10px] text-purple-400 font-mono mb-1">
                                                                    <span>MEMORY_ALLOC</span>
                                                                    <span>64%</span>
                                                                </div>
                                                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                                    <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 w-[64%] shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                                                                </div>
                                                            </div>
                                                            <div className="p-3 bg-black/40 rounded border border-gray-800 font-mono text-[8px] text-green-400 leading-relaxed overflow-hidden">
                                                                <p className="truncate">> init_sequence_start</p>
                                                                <p className="truncate">> loading_modules... <span className="text-white">DONE</span></p>
                                                                <p>> <span className="animate-pulse">_</span></p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-800 h-3 sm:h-4 w-full rounded-b-lg shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] relative border-t border-gray-700">
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/4 h-1.5 bg-gray-700 rounded-b-md"></div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-[5%] right-0 w-[28%] z-20 translate-y-8 -translate-x-4 hover:translate-y-6 transition-transform duration-500">
                                        <div className="relative bg-gray-900 rounded-[1.5rem] sm:rounded-[2rem] p-[4%] shadow-2xl border-2 sm:border-4 border-gray-800">
                                            <div className="bg-white dark:bg-slate-900 rounded-[1.2rem] sm:rounded-[1.7rem] overflow-hidden aspect-[9/19] relative">
                                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[5%] bg-black rounded-b-lg z-20"></div>
                                                <div className="relative w-full h-full pt-[15%]">
                                                    <div className="absolute inset-0 pt-[20%] p-3 bg-slate-900 animate-carousel-cycle" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="w-full flex justify-between items-center mb-6">
                                                            <div className="w-6 h-6 rounded bg-primary/20 flex items-center justify-center">
                                                                <div className="w-3 h-3 bg-primary rounded-sm"></div>
                                                            </div>
                                                            <div className="w-4 h-4 rounded-full bg-gray-700"></div>
                                                        </div>
                                                        <div className="space-y-3">
                                                            <div className="text-xl font-bold text-white leading-none">Fast.<br />Secure.<br />Scalable.</div>
                                                            <div className="h-1 w-12 bg-secondary rounded"></div>
                                                            <div className="text-[8px] text-gray-400">Monitor your infrastructure in real-time.</div>
                                                            <div className="w-full py-2 bg-primary text-white text-[10px] font-bold rounded text-center shadow-lg shadow-primary/20">Start Now</div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 pt-[20%] p-3 bg-[#0d1117] animate-carousel-cycle delay-4000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="flex items-center justify-between mb-4 border-b border-gray-800 pb-2">
                                                            <div className="text-[8px] text-gray-400 font-mono">mobile_api.py</div>
                                                            <div className="flex space-x-1">
                                                                <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
                                                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-500"></div>
                                                            </div>
                                                        </div>
                                                        <div className="font-mono text-[8px] space-y-2 opacity-90">
                                                            <div><span className="text-purple-400">const</span> <span className="text-blue-400">App</span> = () => {'{'}</div>
                                                            <div className="pl-2"><span className="text-purple-400">return</span> (</div>
                                                            <div className="pl-4 text-green-400">{'<View style={s.c}>'}</div>
                                                            <div className="pl-6 text-green-400">{'<Text>Ready</Text>'}</div>
                                                            <div className="pl-4 text-green-400">{'</View>'}</div>
                                                            <div className="pl-2">);</div>
                                                            <div>{'}'}</div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 pt-[20%] p-3 bg-slate-900 animate-carousel-cycle delay-8000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="flex flex-col items-center justify-center h-full space-y-4">
                                                            <div className="relative w-16 h-16 flex items-center justify-center">
                                                                <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping"></div>
                                                                <div className="relative z-10 bg-gray-800 p-3 rounded-full border border-gray-700">
                                                                    <span className="material-icons text-primary text-xl">shield</span>
                                                                </div>
                                                            </div>
                                                            <div className="w-full bg-gray-800 rounded-lg p-3 border border-gray-700">
                                                                <div className="flex justify-between items-center mb-1">
                                                                    <span className="text-[8px] text-gray-400">Threat Level</span>
                                                                    <span className="text-[8px] text-green-400 font-bold">LOW</span>
                                                                </div>
                                                                <div className="h-1.5 w-full bg-gray-700 rounded-full overflow-hidden">
                                                                    <div className="h-full w-[10%] bg-green-500"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute top-[5%] -right-4 lg:-right-8 bg-white dark:bg-surface-dark p-3 sm:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 animate-bounce" style={{ animationDuration: '3s' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary/10 p-2 rounded-lg">
                                                <span className="material-icons text-primary">bolt</span>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Efficiency</div>
                                                <div className="font-bold text-gray-900 dark:text-white">+240%</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="absolute bottom-[10%] -left-4 lg:-left-8 bg-white dark:bg-surface-dark p-3 sm:p-4 rounded-xl shadow-xl border border-gray-100 dark:border-gray-700 z-30 animate-bounce" style={{ animationDuration: '4.5s' }}>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-secondary/20 p-2 rounded-lg">
                                                <span className="material-icons text-yellow-700 dark:text-yellow-400">security</span>
                                            </div>
                                            <div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">Security</div>
                                                <div className="font-bold text-gray-900 dark:text-white">Enterprise</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden lg:block animate-bounce">
                    <span className="material-icons text-gray-400 dark:text-gray-600">keyboard_arrow_down</span>
                </div>
            </main>
            <section className="border-t border-gray-200 dark:border-gray-800 bg-primary/5 dark:bg-primary/10 overflow-hidden py-2">
                <div className="flex animate-scroll whitespace-nowrap group">
                    {[
                        { icon: 'web', label: 'Web Dev' },
                        { icon: 'smartphone', label: 'App Dev' },
                        { icon: 'psychology', label: 'AI Solutions' },
                        { icon: 'cloud', label: 'Cloud Ops' },
                        { icon: 'security', label: 'Cybersecurity' },
                        { icon: 'bar_chart', label: 'Data Analytics' },
                        { icon: 'brush', label: 'UI/UX Design' },
                        { icon: 'settings', label: 'DevOps' },
                        { icon: 'link', label: 'Blockchain' },
                    ].map((item, index) => (
                        <div key={index} className="flex items-center space-x-2 mx-6 cursor-pointer hover:scale-105 transition-transform">
                            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-base">{item.icon}</span>
                            </div>
                            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                    {[
                        { icon: 'web', label: 'Web Dev' },
                        { icon: 'smartphone', label: 'App Dev' },
                        { icon: 'psychology', label: 'AI Solutions' },
                        { icon: 'cloud', label: 'Cloud Ops' },
                        { icon: 'security', label: 'Cybersecurity' },
                        { icon: 'bar_chart', label: 'Data Analytics' },
                        { icon: 'brush', label: 'UI/UX Design' },
                        { icon: 'settings', label: 'DevOps' },
                        { icon: 'link', label: 'Blockchain' },
                    ].map((item, index) => (
                        <div key={`duplicate-${index}`} className="flex items-center space-x-2 mx-6 cursor-pointer hover:scale-105 transition-transform">
                            <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                                <span className="material-icons text-gray-500 dark:text-gray-400 text-base">{item.icon}</span>
                            </div>
                            <span className="font-semibold text-sm text-gray-700 dark:text-gray-300">{item.label}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default Hero;
