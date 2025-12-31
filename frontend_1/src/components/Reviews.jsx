import React from 'react';

const Reviews = () => {
    return (
        <section className="bg-[#cdbdae] py-24 font-serif overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <p className="text-white/80 font-medium tracking-widest uppercase mb-2">Testimonials</p>
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Clients Say</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-min">

                    {/* 1. Victoria Linton (Top Left) */}
                    <div className="md:col-span-4 bg-white rounded-[2rem] p-6 relative shadow-lg">
                        <div className="flex items-center space-x-4 mb-3">
                            <img
                                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                alt="Victoria"
                                className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                                <h3 className="font-bold text-gray-900 font-sans">Victoria Linton</h3>
                                <div className="flex text-yellow-400 text-xs">
                                    {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
                                </div>
                            </div>
                        </div>
                        <p className="text-gray-500 text-xs leading-relaxed font-sans mb-4">
                            Praesent urna neque viverra justo ultrices dui. Est lorem ipsum dolor sit amet consectetur adipiscing. Vitae nunc sed velit dignissim. In hendrerit gravida.
                        </p>
                        <span className="absolute top-4 right-6 text-gray-300 text-5xl font-serif">”</span>
                    </div>

                    {/* 2. Center Large Card (Middle - Spans tall) */}
                    <div className="md:col-span-4 md:row-span-2 bg-white rounded-[2.5rem] p-8 text-center flex flex-col items-center justify-center shadow-xl relative mt-8 md:mt-0">
                        <div className="absolute -top-10">
                            <div className="w-20 h-20 rounded-full p-1 bg-[#cdbdae]">
                                <img
                                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                                    alt="Excellent Job"
                                    className="w-full h-full rounded-full object-cover border-4 border-white"
                                />
                            </div>
                        </div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 mt-8 mb-2 uppercase tracking-wide">Excellent Job!</h3>
                        <div className="flex text-gray-300 text-sm mb-4">
                            {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
                        </div>
                        <p className="text-gray-500 text-sm leading-relaxed italic mb-6">
                            "A scelerisque purus semper eget duis at tellus. Amet cursus sit amet dictum sit justo. Varius sit amet."
                        </p>
                        <div className="font-handwriting text-3xl text-gray-400 rotate-[-5deg]">Fanny Dean</div>
                    </div>

                    {/* 3. Client Review (Top Right) */}
                    <div className="md:col-span-4 bg-white rounded-3xl p-6 shadow-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h3 className="font-bold text-gray-900 font-serif">Client Review</h3>
                            <span className="text-xs text-gray-400">@ArtfulWootton</span>
                        </div>
                        <p className="text-gray-500 text-xs italic mb-4">
                            "Rhoncus neque viverra justo ultrices duist lorem dolor sed consect adipiscing."
                        </p>
                        <div className="flex justify-between items-center bg-gray-50 rounded-full px-4 py-1">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider cursor-pointer">Read More &rarr;</span>
                            <div className="flex space-x-2 text-gray-300 text-xs">
                                <span>♡</span>
                                <span>⊞</span>
                                <span>↗</span>
                            </div>
                        </div>
                    </div>

                    {/* 4. Dimitri Woodhouse (Middle Left - Wide) */}
                    <div className="md:col-span-4 bg-white rounded-full p-2 pr-8 shadow-lg flex items-center mt-4">
                        <div className="flex-1 pl-8 py-2">
                            <p className="text-gray-500 text-xs italic mb-1">
                                "Mauris in aliquam se fringilla morbi tincidunt augue amet dui massa"
                            </p>
                            <div className="flex items-center justify-between">
                                <div>
                                    <h4 className="font-bold text-gray-900 text-xs uppercase">Dmitri Woodhouse</h4>
                                    <span className="text-[10px] text-gray-400">@yournamehere</span>
                                </div>
                                <div className="flex text-yellow-400 text-[10px]">
                                    {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
                                </div>
                            </div>
                        </div>
                        <img
                            src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                            alt="Dmitri"
                            className="w-16 h-16 rounded-full object-cover border-4 border-[#cdbdae]"
                        />
                    </div>



                    {/* 5. Nelly Vane (Middle Right - Pill) */}
                    <div className="md:col-span-4 bg-white rounded-full p-2 pl-2 shadow-lg flex items-center relative mt-4">
                        <img
                            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                            alt="Nelly"
                            className="w-16 h-16 rounded-full object-cover border-4 border-gray-100"
                        />
                        <div className="flex-1 px-4">
                            <h3 className="font-serif font-bold text-gray-900 text-sm">NELLY VANE</h3>
                            <p className="text-[10px] text-gray-500 leading-tight my-1">
                                Varius duis at consectetur lorem donec. Et tortor at risus viverra.
                            </p>
                            <div className="flex text-yellow-400 text-[10px]">
                                {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)} <span className="text-gray-300 ml-1">(5.0)</span>
                            </div>
                        </div>
                        <div className="absolute -top-2 -right-2 bg-[#9D8F8F] w-10 h-10 rounded-full flex items-center justify-center text-white border-4 border-[#cdbdae]">
                            <span className="material-icons text-sm">thumb_up</span>
                        </div>
                    </div>

                    {/* 6. Top-notch (Bottom Left) */}
                    <div className="md:col-span-3 bg-white rounded-3xl p-6 shadow-lg flex flex-col justify-between mt-4">
                        <div className="text-center">
                            <h3 className="font-serif font-bold text-xl text-gray-900 mb-2">Top-notch!</h3>
                            <p className="text-gray-500 text-xs mb-4">
                                Rhoncus urna neque viverra justo nec ultrices dui. Est lorem ipsum dolor.
                            </p>
                            <div className="flex justify-center text-gray-300 text-xs mb-1">
                                {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)} <span className="ml-1">(5.0)</span>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3 mt-4 bg-[#F2F0ED] p-2 rounded-xl">
                            <img
                                src="https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                alt="User"
                                className="w-8 h-8 rounded-full"
                            />
                            <div>
                                <div className="font-bold text-xs text-gray-800">Hindley Micawber</div>
                                <div className="text-[10px] text-gray-400">@yoursocialmedia</div>
                            </div>
                        </div>
                    </div>

                    {/* 7. Testimonial (Bottom Center-Left) */}
                    <div className="md:col-span-3 bg-white rounded-3xl p-6 shadow-lg flex flex-col relative mt-4">
                        <div className="flex items-start space-x-3 mb-4">
                            <div className="bg-[#cdbdae] p-1 rounded-full">
                                <img
                                    src="https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                    alt="Testimonial"
                                    className="w-12 h-12 rounded-full object-cover"
                                />
                            </div>
                            <div>
                                <h4 className="font-serif font-bold text-gray-900">TESTIMONIAL</h4>
                                <p className="text-xs text-gray-500 mt-1 italic">
                                    "In hac habitasse platea dictumst quisque sagittis pur convallis."
                                </p>
                            </div>
                        </div>
                        <div className="mt-auto text-right">
                            <span className="text-gray-400 font-bold text-xs">@CatherineDoe</span>
                            <div className="flex justify-end text-[#cdbdae] text-lg mt-1">★★★★★</div>
                        </div>
                        {/* Speech bubble tail mockup */}
                        <div className="absolute -bottom-2 left-8 w-6 h-6 bg-white transform rotate-45"></div>
                    </div>


                    {/* 8. Recommended (Bottom Center-Right) */}
                    <div className="md:col-span-3 bg-white rounded-3xl p-4 shadow-lg text-center mt-4">
                        <div className="relative mb-3">
                            <img
                                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80"
                                alt="Rec"
                                className="w-full h-24 object-cover rounded-xl grayscale opacity-80"
                            />
                            <div className="absolute top-0 left-4 bg-[#cdbdae] text-white w-6 h-8 flex items-end justify-center pb-1 rounded-b-lg shadow-sm">
                                <span className="text-xs">★</span>
                            </div>
                        </div>
                        <h4 className="font-serif font-bold text-gray-900 text-sm">RECOMMENDED!</h4>
                        <div className="flex justify-center text-yellow-400 text-xs my-1">
                            {'★★★★★'.split('').map((c, i) => <span key={i}>{c}</span>)}
                        </div>
                        <p className="text-[10px] text-gray-400 italic">"Habitant morbi tristique et netus blandit molestie."</p>
                    </div>

                    {/* 9. Bubble Quote (Bottom Right) */}
                    <div className="md:col-span-3 flex flex-col justify-end mt-4">
                        <div className="bg-white p-6 rounded-t-3xl rounded-br-3xl rounded-bl-none shadow-lg relative mb-4">
                            <p className="text-xs text-gray-500 italic">
                                "Vestibulum mattis enim aulit tortor se ullamcorper morbi pretium"
                            </p>
                            <div className="text-right font-handwriting text-gray-400 mt-2 text-lg">Jane</div>
                            <div className="text-right text-[10px] text-gray-300">@JaneProkofich</div>
                            <span className="text-4xl text-[#8E847F] absolute -bottom-4 left-4 font-serif">”</span>
                        </div>
                        <div className="flex justify-end pr-4">
                            <img
                                src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80"
                                alt="Jane"
                                className="w-10 h-10 rounded-full border-2 border-white shadow-md relative z-10"
                            />
                        </div>
                    </div>

                </div>
            </div>
            {/* Handwriting font injection */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@500&family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
                .font-serif { font-family: 'Playfair Display', serif; }
                .font-handwriting { font-family: 'Dancing Script', cursive; }
            `}</style>
        </section>
    );
};

export default Reviews;
