import React from 'react';
import { Compass, BookOpen, Image as ImageIcon, Star, MessageCircle } from 'lucide-react';

export default function Navbar({ activeTab, scrollToSection }) {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-pink-950/70 backdrop-blur-md border border-pink-500/30 px-4 py-2.5 rounded-full shadow-2xl max-w-md w-[92%] flex items-center justify-between font-sans text-xs">
      <button 
        onClick={() => scrollToSection('home')} 
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${activeTab === 'home' ? 'bg-pink-600/80 text-white shadow-md' : 'text-pink-200 hover:text-white'}`}
      >
        <Compass className="w-3.5 h-3.5" /> Home
      </button>
      <button 
        onClick={() => scrollToSection('memories')} 
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${activeTab === 'memories' ? 'bg-pink-600/80 text-white shadow-md' : 'text-pink-200 hover:text-white'}`}
      >
        <BookOpen className="w-3.5 h-3.5" /> Memories
      </button>
      <button 
        onClick={() => scrollToSection('gallery')} 
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${activeTab === 'gallery' ? 'bg-pink-600/80 text-white shadow-md' : 'text-pink-200 hover:text-white'}`}
      >
        <ImageIcon className="w-3.5 h-3.5" /> Gallery
      </button>
      <button 
        onClick={() => scrollToSection('reasons')} 
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${activeTab === 'reasons' ? 'bg-pink-600/80 text-white shadow-md' : 'text-pink-200 hover:text-white'}`}
      >
        <Star className="w-3.5 h-3.5" /> Reasons
      </button>
      <button 
        onClick={() => scrollToSection('message')} 
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${activeTab === 'message' ? 'bg-pink-600/80 text-white shadow-md' : 'text-pink-200 hover:text-white'}`}
      >
        <MessageCircle className="w-3.5 h-3.5" /> Message
      </button>
    </nav>
  );
}