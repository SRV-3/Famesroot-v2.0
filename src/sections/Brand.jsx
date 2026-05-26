import { motion } from 'motion/react';

const BRANDS = [
    { name: 'OnePlus', img: 'https://i.pinimg.com/1200x/73/28/43/732843c9b9d7c71ad3e7f0058811ddbf.jpg' },
    { name: 'Filmora', img: 'https://i.pinimg.com/1200x/9b/69/11/9b691112d68201cb572b3ef19a4f299f.jpg' },
    { name: 'Grab', img: 'https://i.pinimg.com/736x/0d/1f/2d/0d1f2dcca634b9afc9e1bc46f448ac06.jpg' },
    { name: 'Mamaearth', img: 'https://i.pinimg.com/736x/1f/96/17/1f961724d1c573fc48633a6b9ad36832.jpg' },
    { name: 'KukuFM', img: 'https://i.pinimg.com/736x/90/6a/22/906a22acabd6d38268105048a751d808.jpg' },
    { name: 'Mogu Mogu', img: 'https://i.pinimg.com/1200x/66/44/06/664406ba37c69f89bd310c2ab3b255d5.jpg' },
    { name: 'Probo', img: 'https://i.pinimg.com/1200x/00/92/c1/0092c1e41f1159cd5793704f3c04e555.jpg' }
];

export default function Brand() {
    // Duplicate brands array twice to ensure perfect looping
    const marqueeItems = [...BRANDS, ...BRANDS, ...BRANDS];

    return (
        <section className="relative w-full bg-[#030303] py-24 overflow-hidden border-t border-white/[0.03]">
            {/* Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[50vh] bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 blur-[120px] rounded-[100%] opacity-50" />
                <div className="noise-overlay opacity-[0.05]" />
            </div>

            <div className="container mx-auto px-6 md:px-12 max-w-7xl relative z-10 mb-16 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="inline-flex items-center gap-4"
                >
                    <span className="w-12 h-[1px] bg-primary/80" />
                    <h2 className="text-primary font-bold tracking-[0.3em] text-xs md:text-sm uppercase drop-shadow-[0_0_15px_rgba(255,0,0,0.5)]">
                        Brands That Trust Famesroot
                    </h2>
                    <span className="w-12 h-[1px] bg-primary/80" />
                </motion.div>
            </div>

            {/* Infinite Marquee Wrapper */}
            <div className="relative w-full overflow-hidden flex z-10 group">

                {/* Fade Masks for edges */}
                <div className="absolute top-0 left-0 w-32 md:w-64 h-full bg-gradient-to-r from-[#030303] to-transparent z-20 pointer-events-none" />
                <div className="absolute top-0 right-0 w-32 md:w-64 h-full bg-gradient-to-l from-[#030303] to-transparent z-20 pointer-events-none" />

                {/* Scrolling Track */}
                <div className="animate-marquee gap-8 md:gap-12 px-4 md:px-6">
                    {marqueeItems.map((brand, i) => (
                        <div key={`${brand.name}-${i}`} className="flex items-center gap-8 md:gap-12">
                            {/* Premium Glassmorphism Card */}
                            <div className="w-[180px] h-[80px] md:w-[240px] md:h-[100px] flex items-center justify-center rounded-2xl bg-white/[0.02] border border-white/[0.05] backdrop-blur-xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)] hover:bg-white/[0.05] hover:border-primary/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_10px_30px_rgba(255,0,0,0.1),inset_0_1px_1px_rgba(255,255,255,0.2)] cursor-pointer group/card relative overflow-hidden">

                                {/* Card Hover Glow */}
                                <div className="absolute inset-0 bg-gradient-to-b from-primary/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 z-0" />

                                {/* Logo Image */}
                                <img 
                                    src={brand.img} 
                                    alt={brand.name} 
                                    className="max-w-[100px] md:max-w-[140px] max-h-[40px] md:max-h-[50px] object-contain transition-all duration-500 z-10"
                                />
                            </div>

                            {/* Separator Star */}
                            <div className="flex items-center justify-center">
                                <svg className="w-4 h-4 md:w-5 md:h-5 text-primary/40 drop-shadow-[0_0_8px_rgba(255,0,0,0.5)]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 0l2.5 9.5L24 12l-9.5 2.5L12 24l-2.5-9.5L0 12l9.5-2.5z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
