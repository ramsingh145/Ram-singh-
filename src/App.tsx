/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useScroll, useTransform } from "motion/react";
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
import { useState, useRef } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 px-6 py-8 flex justify-between items-center mix-blend-difference">
      <div className="flex items-center gap-2">
        <span className="font-serif text-2xl tracking-tighter italic">TI</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.3em] opacity-60 mt-1">Transport India</span>
      </div>
      
      <div className="hidden md:flex gap-12 text-[11px] uppercase tracking-[0.2em] font-medium">
        <a href="#services" className="hover:text-brand-gold transition-colors">Services</a>
        <a href="#about" className="hover:text-brand-gold transition-colors">About</a>
        <a href="#contact" className="hover:text-brand-gold transition-colors">Contact</a>
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

const Hero = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);

  return (
    <section className="relative h-screen flex flex-col justify-center px-6 md:px-20 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute right-0 top-1/4 -z-10 opacity-10 select-none pointer-events-none">
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
          <button className="group flex items-center gap-4 bg-white text-black px-8 py-4 rounded-full font-medium text-sm hover:bg-brand-gold hover:text-white transition-all duration-500">
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

const Services = () => {
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
    <section id="services" className="py-32 px-6 md:px-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {services.map((s, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
            className="group p-8 border border-white/5 hover:border-brand-gold/30 transition-all duration-700"
          >
            <div className="flex justify-between items-start mb-12">
              <div className="text-brand-gold">{s.icon}</div>
              <span className="font-mono text-xs opacity-20">{s.id}</span>
            </div>
            <h3 className="text-2xl font-serif mb-4">{s.title}</h3>
            <p className="text-sm text-white/40 leading-relaxed mb-8">{s.desc}</p>
            <div className="w-0 group-hover:w-full h-[1px] bg-brand-gold transition-all duration-700"></div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

const About = () => {
  return (
    <section id="about" className="py-32 px-6 md:px-20 relative">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div className="relative">
          <div className="aspect-[4/5] bg-brand-gray overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&q=80&w=1000" 
              alt="Logistics" 
              className="w-full h-full object-cover grayscale opacity-50 hover:scale-105 transition-transform duration-1000"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 glass p-10 max-w-xs hidden md:block">
            <p className="font-serif italic text-lg mb-4">"Precision in every mile, integrity in every deal."</p>
            <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">— Ram Singh, Founder</span>
          </div>
        </div>

        <div>
          <h2 className="text-4xl md:text-6xl font-serif mb-8">Legacy of <br /><span className="italic">Trust</span></h2>
          <p className="text-white/60 leading-relaxed mb-12 max-w-md">
            Based in the heart of Bhilwara, Transport India has grown from a local carrier to a regional powerhouse. We understand the rhythm of Indian commerce.
          </p>
          
          <div className="space-y-6">
            <div className="flex items-center gap-6 p-6 glass rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <User size={20} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest opacity-40 mb-1">Proprietor</p>
                <p className="font-serif text-xl">Ram Singh</p>
              </div>
            </div>

            <div className="flex items-center gap-6 p-6 glass rounded-2xl">
              <div className="w-12 h-12 rounded-full bg-brand-gold/10 flex items-center justify-center text-brand-gold">
                <MapPin size={20} />
              </div>
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

const Contact = () => {
  return (
    <section id="contact" className="py-32 px-6 md:px-20 bg-brand-gray/30">
      <div className="max-w-6xl mx-auto glass p-12 md:p-20 rounded-[40px] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-gold/5 blur-[100px]"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
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

          <form className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <input type="text" placeholder="NAME" className="bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" />
              <input type="email" placeholder="EMAIL" className="bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" />
            </div>
            <input type="text" placeholder="SUBJECT" className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors" />
            <textarea placeholder="MESSAGE" rows={4} className="w-full bg-transparent border-b border-white/10 py-4 text-xs tracking-widest focus:border-brand-gold outline-none transition-colors resize-none"></textarea>
            <button className="w-full py-6 border border-white/10 text-xs tracking-[0.3em] hover:bg-white hover:text-black transition-all duration-500">SEND MESSAGE</button>
          </form>
        </div>
      </div>
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
  return (
    <div className="min-h-screen selection:bg-brand-gold selection:text-black">
      <Navbar />
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
