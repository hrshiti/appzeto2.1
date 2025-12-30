import React from 'react';

const Hero = () => {
    return (
        <div className="bg-background-light dark:bg-background-dark font-body antialiased transition-colors duration-300 min-h-screen flex flex-col">
            <nav className="sticky top-0 z-50 w-full glass-effect bg-surface-light/80 dark:bg-surface-dark/80 border-b border-gray-200 dark:border-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <div className="flex-shrink-0 flex items-center">
                            <img alt="Appzeto Logo" className="h-10 w-auto" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAKtMn7mVnySJk-C2mBRJKUp2-77_lqRQDyt2rCWi-t8BubDO2To6qiCqfOuDya7jGHYoiblKkEDO9QNwCdyxrRv-kaF3X8Hm3sdMmzZOyFi1yWY8nY4UV7WYB637HjcFsbPyG3tZ6WZwOPUi1-vHl_Otwhlt6K9RORWMqpps7beSDco5XGHYUfMebNAZfPSGEBaJU8vftsy12v3_VBS-8ZIn2TzllluTc9BcOdlYRC_p8PZlDixnLR2_jAXDVPy297lIHwA6kYczyN" />
                        </div>
                        <div className="hidden md:flex space-x-8 items-center">
                            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#">Services</a>
                            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#">Technologies</a>
                            <a className="text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary font-medium transition-colors" href="#">About Us</a>
                            <a className="bg-primary hover:bg-teal-600 text-white px-5 py-2.5 rounded-full font-semibold transition-all shadow-lg shadow-primary/30" href="#">
                                Get Started
                            </a>
                        </div>
                        <div className="md:hidden flex items-center">
                            <button className="text-gray-600 dark:text-gray-300 hover:text-primary focus:outline-none">
                                <span className="material-icons text-3xl">menu</span>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="flex-grow flex items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl dark:bg-primary/20"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-secondary/20 rounded-full blur-3xl dark:bg-secondary/10"></div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 w-full relative z-10">
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
                                                    <div className="absolute inset-0 bg-slate-50 dark:bg-slate-900 flex animate-carousel-cycle" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="w-[18%] bg-white dark:bg-slate-800 h-full border-r border-gray-200 dark:border-gray-700 p-2 flex flex-col gap-2">
                                                            <div className="h-6 w-6 bg-primary/20 rounded mb-2 mx-auto"></div>
                                                            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded"></div>
                                                            <div className="h-1.5 w-3/4 bg-gray-100 dark:bg-gray-700 rounded mx-auto"></div>
                                                            <div className="h-1.5 w-full bg-gray-100 dark:bg-gray-700 rounded"></div>
                                                        </div>
                                                        <div className="flex-1 p-4 flex flex-col gap-3">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                                <div className="h-6 w-6 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                            </div>
                                                            <div className="grid grid-cols-3 gap-3">
                                                                <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm border border-gray-100 dark:border-gray-700 h-16">
                                                                    <div className="h-1.5 w-12 bg-primary/40 rounded mb-2"></div>
                                                                    <div className="h-4 w-16 bg-gray-800 dark:bg-gray-200 rounded"></div>
                                                                </div>
                                                                <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm border border-gray-100 dark:border-gray-700 h-16">
                                                                    <div className="h-1.5 w-12 bg-secondary/60 rounded mb-2"></div>
                                                                    <div className="h-4 w-10 bg-gray-800 dark:bg-gray-200 rounded"></div>
                                                                </div>
                                                                <div className="bg-white dark:bg-slate-800 p-2 rounded shadow-sm border border-gray-100 dark:border-gray-700 h-16">
                                                                    <div className="h-1.5 w-12 bg-blue-400 rounded mb-2"></div>
                                                                    <div className="h-4 w-14 bg-gray-800 dark:bg-gray-200 rounded"></div>
                                                                </div>
                                                            </div>
                                                            <div className="flex-1 bg-white dark:bg-slate-800 rounded shadow-sm border border-gray-100 dark:border-gray-700 p-3 flex items-end gap-2 relative overflow-hidden">
                                                                <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent"></div>
                                                                <div className="w-full h-1/3 bg-primary/20 rounded-t"></div>
                                                                <div className="w-full h-2/3 bg-primary/40 rounded-t"></div>
                                                                <div className="w-full h-1/2 bg-primary/60 rounded-t"></div>
                                                                <div className="w-full h-3/4 bg-primary rounded-t"></div>
                                                            </div>
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
                                                    <div className="absolute inset-0 bg-white dark:bg-slate-900 animate-carousel-cycle delay-8000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="h-[40%] bg-slate-100 dark:bg-slate-800 flex items-center justify-center relative overflow-hidden">
                                                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
                                                            <span className="material-icons text-4xl text-gray-400 dark:text-gray-600">shopping_bag</span>
                                                        </div>
                                                        <div className="p-4">
                                                            <div className="h-3 w-1/2 bg-gray-800 dark:bg-gray-200 rounded mb-2"></div>
                                                            <div className="h-2 w-1/3 bg-primary rounded mb-4"></div>
                                                            <div className="flex gap-2 mb-3">
                                                                <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                                                                <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                                                                <div className="h-8 w-8 rounded bg-gray-100 dark:bg-gray-800"></div>
                                                            </div>
                                                            <div className="h-8 w-full bg-secondary text-gray-900 font-bold text-[10px] flex items-center justify-center rounded uppercase tracking-wider">Add to Cart</div>
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
                                                    <div className="absolute inset-0 pt-[20%] p-3 bg-white dark:bg-slate-900 animate-carousel-cycle" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="flex justify-between items-center mb-4">
                                                            <div className="h-6 w-6 rounded bg-gray-100 dark:bg-gray-800"></div>
                                                            <div className="h-6 w-6 rounded-full bg-primary/20"></div>
                                                        </div>
                                                        <div className="bg-primary/10 rounded-xl p-3 mb-4">
                                                            <div className="text-[8px] text-gray-500 dark:text-gray-400">Balance</div>
                                                            <div className="text-sm font-bold text-primary">$12,450</div>
                                                        </div>
                                                        <div className="space-y-2">
                                                            <div className="h-8 bg-gray-50 dark:bg-gray-800 rounded flex items-center px-2">
                                                                <div className="w-4 h-4 rounded-full bg-secondary/50 mr-2"></div>
                                                                <div className="h-2 w-10 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                            </div>
                                                            <div className="h-8 bg-gray-50 dark:bg-gray-800 rounded flex items-center px-2">
                                                                <div className="w-4 h-4 rounded-full bg-blue-400/50 mr-2"></div>
                                                                <div className="h-2 w-12 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 pt-[30%] p-4 bg-primary flex flex-col items-center animate-carousel-cycle delay-4000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="w-10 h-10 rounded-xl bg-white mb-4 flex items-center justify-center shadow-lg">
                                                            <span className="material-icons text-primary text-lg">lock</span>
                                                        </div>
                                                        <div className="w-full h-8 bg-white/20 rounded mb-2"></div>
                                                        <div className="w-full h-8 bg-white/20 rounded mb-4"></div>
                                                        <div className="w-full h-8 bg-secondary rounded shadow-lg flex items-center justify-center">
                                                            <div className="w-10 h-1.5 bg-gray-900/50 rounded-sm"></div>
                                                        </div>
                                                    </div>
                                                    <div className="absolute inset-0 pt-[20%] bg-slate-50 dark:bg-slate-900 animate-carousel-cycle delay-8000" style={{ animationFillMode: 'backwards' }}>
                                                        <div className="p-3 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-slate-800 flex gap-2">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                                                            <div className="flex-1 space-y-1 py-1">
                                                                <div className="w-16 h-1.5 bg-gray-200 dark:bg-gray-700 rounded"></div>
                                                                <div className="w-10 h-1.5 bg-gray-100 dark:bg-gray-800 rounded"></div>
                                                            </div>
                                                        </div>
                                                        <div className="h-24 bg-gray-200 dark:bg-gray-800 relative">
                                                            <div className="absolute inset-0 flex items-center justify-center text-gray-300 dark:text-gray-600">
                                                                <span className="material-icons text-2xl">image</span>
                                                            </div>
                                                        </div>
                                                        <div className="p-3 flex gap-2">
                                                            <span className="material-icons text-xs text-red-400">favorite</span>
                                                            <span className="material-icons text-xs text-gray-400">chat_bubble</span>
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
            <section className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-surface-dark">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <span className="material-icons text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">web</span>
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Web Dev</span>
                        </div>
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <span className="material-icons text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">smartphone</span>
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">App Dev</span>
                        </div>
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <span className="material-icons text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">psychology</span>
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">AI Solutions</span>
                        </div>
                        <div className="flex items-center space-x-3 group cursor-pointer">
                            <div className="p-2 bg-gray-100 dark:bg-gray-800 rounded-lg group-hover:bg-primary/10 transition-colors">
                                <span className="material-icons text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors">cloud</span>
                            </div>
                            <span className="font-semibold text-gray-700 dark:text-gray-300 group-hover:text-primary transition-colors">Cloud Ops</span>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Hero;
