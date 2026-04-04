/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { 
  Truck, 
  Globe, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Phone, 
  User, 
  ArrowRight,
  Menu,
  X
} from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

const BackgroundElements = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  const orbX1 = useTransform(springX, [-0.5, 0.5], [-50, 50]);
  const orbY1 = useTransform(springY, [-0.5, 0.5], [-50, 50]);
  const orbX2 = useTransform(springX, [-0.5, 0.5], [50, -50]);
  const orbY2 = useTransform(springY, [-0.5, 0.5], [50, -50]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-brand-dark">
      {/* Floating Orbs with Mouse Parallax */}
      <motion.div 
        style={{ x: orbX1, y: orbY1 }}
        animate={{ 
          scale: [1, 1.2, 0.9, 1]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-brand-gold/5 rounded-full blur-[120px]"
      />
      <motion.div 
        style={{ x: orbX2, y: orbY2 }}
        animate={{ 
          scale: [1, 0.8, 1.1, 1]
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] bg-white/5 rounded-full blur-[150px]"
      />
      
      {/* 3D Moving Grid */}
      <div className="absolute inset-0 opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]">
        <motion.div 
          animate={{ y: [0, 40] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:40px_40px]"
        />
      </div>

      {/* Continuous Moving Particles (Speed Lines) */}
      <div className="absolute inset-0 opacity-20">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: "-10%", y: `${Math.random() * 100}%`, opacity: 0 }}
            animate={{ 
              x: "110%", 
              opacity: [0, 1, 1, 0] 
            }}
            transition={{ 
              duration: 5 + Math.random() * 10, 
              repeat: Infinity, 
              delay: Math.random() * 10,
              ease: "linear"
            }}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-brand-gold/40 to-transparent"
            style={{ width: `${100 + Math.random() * 300}px` }}
          />
        ))}
      </div>

      {/* Subtle Noise Overlay */}
      <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
    </div>
  );
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl tracking-tighter italic">TI</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1">Transport India</span>
      </div>
      
      <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-[0.2em] font-medium items-center">
        <a href="#services" className="hover:text-brand-gold transition-colors">Services</a>
        <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
        <a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a>
        <button 
          onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
          className="bg-white text-black px-6 py-2 rounded-full hover:bg-brand-gold hover:text-white transition-all duration-500"
        >
          INQUIRE
        </button>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full left-0 w-full bg-brand-dark p-8 flex flex-col gap-6 text-sm uppercase tracking-widest border-b border-white/10"
        >
          <a href="#services" onClick={() => setIsOpen(false)}>Services</a>
          <a href="#about" onClick={() => setIsOpen(false)}>About</a>
          <a href="#contact" onClick={() => setIsOpen(false)}>Contact</a>
        </motion.div>
      )}
    </nav>
  );
};

const SmokeEffect = () => {
  return (
    <div className="absolute left-0 bottom-1/4 flex gap-2 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
          animate={{ 
            opacity: [0, 0.2, 0], 
            scale: [0.5, 2, 3],
            x: [-20, -100 - (i * 20)],
            y: [-10, -40 - (Math.random() * 20)]
          }}
          transition={{ 
            duration: 2 + Math.random(), 
            repeat: Infinity, 
            delay: i * 0.4,
            ease: "easeOut"
          }}
          className="w-8 h-8 bg-white/20 rounded-full blur-xl"
        />
      ))}
    </div>
  );
};

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  
  // More dynamic truck transforms
  const truckX = useTransform(scrollY, [0, 1000], [0, 400]);
  const truckY = useTransform(scrollY, [0, 1000], [0, 100]);
  const truckScale = useTransform(scrollY, [0, 800], [1, 1.5]);
  const truckRotateY = useTransform(scrollY, [0, 800], [25, 10]);
  const truckRotateX = useTransform(scrollY, [0, 800], [0, 5]);
  const truckRotateZ = useTransform(scrollY, [0, 800], [0, -2]);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden perspective-2000">
      {/* Enhanced 3D Truck Animation */}
      <motion.div 
        initial={{ x: "-100%", y: "20%", rotateY: 45, scale: 0.6, opacity: 0 }}
        animate={{ x: "-10%", y: "10%", rotateY: 25, scale: 1, opacity: 0.3 }}
        transition={{ duration: 3, ease: [0.22, 1, 0.36, 1] }}
        style={{ 
          x: truckX, 
          y: truckY,
          scale: truckScale, 
          rotateY: truckRotateY,
          rotateX: truckRotateX,
          rotateZ: truckRotateZ,
          transformStyle: "preserve-3d"
        }}
        className="absolute right-0 top-1/4 -z-10 select-none pointer-events-none transform-gpu"
      >
        <div className="relative">
          <img 
            src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=1200" 
            alt="3D Truck" 
            className="w-[70vw] h-auto grayscale object-contain drop-shadow-[0_35px_35px_rgba(0,0,0,0.5)]"
            referrerPolicy="no-referrer"
          />
          <SmokeEffect />
        </div>
      </motion.div>

      <motion.div style={{ y: y1 }} className="absolute right-0 top-1/4 -z-20 opacity-10 select-none pointer-events-none">
        <h1 className="text-[30vw] font-serif italic leading-none text-edge-outline">INDIA</h1>
      </motion.div>

      <div className="max-w-4xl">
        <motion.p 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="font-mono text-[10px] uppercase tracking-[0.5em] text-brand-gold mb-6"
        >
          Established Excellence • Bhilwara
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="text-6xl md:text-9xl font-serif leading-[0.9] tracking-tighter mb-12"
        >
          Moving <br />
          <span className="italic">The Future</span> <br />
          Of Logistics.
        </motion.h1>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="flex flex-col md:flex-row gap-8 items-start md:items-center"
        >
          <button 
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-sm hover:bg-brand-gold hover:text-white transition-all duration-500"
          >
            GET A QUOTE
            <ArrowRight className="group-hover:translate-x-2 transition-transform" size={18} />
          </button>
          <p className="max-w-xs text-sm text-white/50 leading-relaxed">
            Premium transportation solutions tailored for the modern industrial landscape of India.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-12 left-6 md:left-20 flex gap-4 items-center">
        <div className="w-12 h-[1px] bg-white/20"></div>
        <span className="font-mono text-[9px] uppercase tracking-widest opacity-40">Scroll to explore</span>
      </div>
    </section>
  );
};

const Marquee = () => {
  return (
    <div className="py-20 border-y border-white/5 overflow-hidden whitespace-nowrap">
      <div className="flex animate-scroll">
        {[...Array(10)].map((_, i) => (
          <span key={i} className="text-4xl md:text-6xl font-serif italic mx-12 opacity-20">
            Transport India • Logistics • Warehousing • Supply Chain •
          </span>
        ))}
      </div>
    </div>
  );
};

const TruckDriveBy = () => {
  const { scrollYProgress } = useScroll();
  const x = useTransform(scrollYProgress, [0.3, 0.7], ["-100%", "200%"]);
  
  return (
    <div className="h-32 w-full relative overflow-hidden pointer-events-none my-20">
      <motion.div 
        style={{ x }}
        className="absolute bottom-0 flex items-end gap-4 opacity-20 filter grayscale"
      >
        <div className="w-96 h-24 bg-white/10 rounded-lg relative overflow-hidden">
          <div className="absolute top-2 left-2 w-12 h-4 bg-brand-gold/20 rounded"></div>
          <div className="absolute bottom-0 left-0 w-full h-2 bg-black/40"></div>
        </div>
        <div className="w-32 h-32 bg-white/10 rounded-t-2xl relative overflow-hidden">
          <div className="absolute top-4 right-4 w-8 h-8 bg-brand-gold/20 rounded"></div>
        </div>
      </motion.div>
    </div>
  );
};

const Services = ({ onInquire }: { onInquire: (title: string) => void }) => {
  const services = [
    {
      title: "Industrial Freight",
      desc: "Heavy-duty transportation solutions for the textile and manufacturing sectors of Rajasthan.",
      icon: <Truck size={32} strokeWidth={1} />,
      id: "01"
    },
    {
      title: "Global Network",
      desc: "Seamless integration with international shipping routes and pan-India distribution.",
      icon: <Globe size={32} strokeWidth={1} />,
      id: "02"
    },
    {
      title: "Secure Transit",
      desc: "Advanced tracking and insurance protocols ensuring the safety of every shipment.",
      icon: <ShieldCheck size={32} strokeWidth={1} />,
      id: "03"
    }
  ];

  return (
    <section id="services" className="py-32 px-6 md:px-20 perspective-1000">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            whileHover={{ 
              rotateX: -5, 
              rotateY: 5, 
              z: 50,
              boxShadow: "0 25px 50px -12px rgba(197, 160, 89, 0.15)"
            }}
            className="group p-8 border border-white/5 hover:border-brand-gold/30 transition-all duration-700 bg-brand-gray/20 backdrop-blur-sm transform-gpu"
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="flex justify-between items-start mb-12" style={{ transform: "translateZ(30px)" }}>
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="text-brand-gold cursor-pointer"
              >
                {s.icon}
              </motion.div>
              <span className="font-mono text-xs opacity-20">{s.id}</span>
            </div>
            <h3 className="text-2xl font-serif mb-4" style={{ transform: "translateZ(20px)" }}>{s.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-8" style={{ transform: "translateZ(10px)" }}>{s.desc}</p>
            <button 
              onClick={() => onInquire(s.title)}
              className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-brand-gold hover:gap-4 transition-all duration-500"
              style={{ transform: "translateZ(25px)" }}
            >
              Inquire Now <ArrowRight size={14} />
            </button>
            <div className="mt-8 w-0 group-hover:w-full h-[1px] bg-brand-gold transition-all duration-700"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-20 relative perspective-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div 
          initial={{ opacity: 0, rotateY: 20 }}
          whileInView={{ opacity: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative transform-gpu"
          style={{ transformStyle: "preserve-3d" }}
        >
          <div className="aspect-[4/5] bg-brand-gray overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" 
              alt="Logistics" 
              className="w-full h-full object-cover grayscale opacity-50 hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <motion.div 
            whileHover={{ translateZ: 50, rotateX: -5 }}
            className="absolute -bottom-10 -right-10 glass p-10 max-w-xs hidden md:block shadow-2xl transform-gpu"
          >
            <p className="font-serif italic text-lg mb-4">"Precision in every mile, integrity in every deal."</p>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">— Ram Singh, Founder</span>
          </motion.div>
        </motion.div>

        <div>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Legacy of <br /><span className="italic">Trust</span></h2>
          <p className="text-white/60 leading-relaxed mb-12 max-w-md">
            Based in the heart of Bhilwara, Transport India has grown from a local carrier to a regional powerhouse. We understand the rhythm of Indian commerce.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 glass rounded-2xl group/item transition-all hover:translate-x-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: -5 }}
                className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold transition-colors group-hover/item:bg-brand-gold/20"
              >
                <User size={20} />
              </motion.div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Proprietor</p>
                <p className="font-serif text-xl">Ram Singh</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 glass rounded-2xl group/item transition-all hover:translate-x-2">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold transition-colors group-hover/item:bg-brand-gold/20"
              >
                <MapPin size={20} />
              </motion.div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Location</p>
                <p className="font-serif text-xl">Bhilwara, Rajasthan</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Contact = ({ initialSubject }: { initialSubject?: string }) => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success'>('idle');
  const [subject, setSubject] = useState("");

  // Sync subject with prop when it changes
  useEffect(() => {
    if (initialSubject) {
      setSubject(initialSubject);
    }
  }, [initialSubject]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => setStatus('idle'), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-32 px-6 md:px-20 bg-brand-gray/30 perspective-1000">
      <motion.div 
        whileHover={{ rotateY: -2, rotateX: 2 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="max-w-6xl mx-auto glass p-12 md:p-20 rounded-[40px] relative overflow-hidden transform-gpu shadow-2xl"
        style={{ transformStyle: "preserve-3d" }}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px]"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20" style={{ transform: "translateZ(20px)" }}>
          <div>
            <h2 className="text-4xl md:text-6xl font-serif mb-8 italic">Let's Connect.</h2>
            <p className="text-white/40 mb-12">Ready to optimize your supply chain? Reach out to our headquarters in Bhilwara for a personalized consultation.</p>
            
            <div className="space-y-8">
              <a href="tel:9521518553" className="flex items-center gap-6 group">
                <div className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center group-hover:border-brand-gold transition-colors">
                  <Phone size={20} className="group-hover:text-brand-gold transition-colors" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Direct Line</p>
                  <p className="text-2xl font-serif">+91 95215 18553</p>
                </div>
              </a>
            </div>
          </div>

          {status === 'success' ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center p-12"
            >
              <div className="w-20 h-20 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold mb-6">
                <ShieldCheck size={40} />
              </div>
              <h3 className="text-2xl font-serif mb-2">Message Sent</h3>
              <p className="text-white/40 text-sm">Thank you, Ram Singh will get back to you shortly.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <input required type="text" placeholder="NAME" className="bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" />
                <input required type="email" placeholder="EMAIL" className="bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" />
              </div>
              <input 
                required 
                type="text" 
                placeholder="SUBJECT" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" 
              />
              <textarea required placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors resize-none"></textarea>
              <button 
                disabled={status === 'sending'}
                className="w-full py-6 border border-white/10 text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? 'SENDING...' : 'SEND MESSAGE'}
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="py-20 px-6 md:px-20 border-t border-white/5">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div>
          <div className="flex items-center gap-2 mb-6">
            <span className="font-serif text-2xl tracking-tighter italic">TI</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1">Transport India</span>
          </div>
          <p className="text-[10px] uppercase tracking-widest opacity-30">© 2026 Transport India. All Rights Reserved.</p>
        </div>
        
        <div className="flex gap-12 text-[10px] uppercase tracking-widest opacity-50">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  const [inquirySubject, setInquirySubject] = useState("");

  const handleServiceInquiry = (serviceTitle: string) => {
    setInquirySubject(`Inquiry regarding ${serviceTitle}`);
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-black bg-brand-dark relative">
      <BackgroundElements />
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <TruckDriveBy />
        <Services onInquire={handleServiceInquiry} />
        <About />
        <Contact initialSubject={inquirySubject} />
      </main>
      <Footer />
    </div>
  );
}
