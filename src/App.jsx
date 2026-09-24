import React, { useState, useRef, useEffect, useMemo } from 'react';
import { Music, VolumeX, Heart, Sparkles, Compass, BookOpen, Image as ImageIcon, Star, MessageCircle, Menu, X, Play, Pause, SkipBack, SkipForward, MapPin, Bus } from 'lucide-react';
import MiniQuiz from './MiniQuiz';

// Import foto dari folder assets
import arilyasmin from './assets/arilyasmin.jpeg';
import arilyasmin2 from './assets/arilyasmin2.jpeg';
import arilyasmin3 from './assets/arilyasmin3.jpeg';
import arilyasmin4 from './assets/arilyasmin4.jpeg';
import arilyasmin5 from './assets/arilyasmin5.jpeg';
import arilyasmin6 from './assets/arilyasmin6.jpeg';
import arilyasmin7 from './assets/arilyasmin7.jpeg';

// Import lagu dari folder assets
import song1 from './assets/mylove.mp3';
import song2 from './assets/shapeofmyheart.mp3';
import song3 from './assets/dekatdihati.mp3';
import song4 from './assets/cintaterakhir.mp3';
import song5 from './assets/jagaselaluhatimu.mp3';

// Komponen Navbar Sticky Melayang
function Navbar({ activeTab, scrollToSection }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    scrollToSection(id);
    setIsOpen(false);
  };

  const navItems = [
    { id: 'home', label: 'Home', icon: Compass },
    { id: 'memories', label: 'Memories', icon: BookOpen },
    { id: 'gallery', label: 'Gallery', icon: ImageIcon },
    { id: 'reasons', label: 'Reasons', icon: Star },
    { id: 'message', label: 'Message', icon: MessageCircle },
    { id: 'playlist', label: 'Playlist', icon: Music },
  ];

  return (
    <>
      {/* 1. NAVBAR MOBILE */}
      <header className="sticky top-0 left-0 w-full z-[9999] sm:hidden bg-[#2d1b2e]/95 backdrop-blur-md border-b border-pink-500/20 px-4 py-3 shadow-xl">
        <div className="flex items-center justify-between max-w-md mx-auto">
          <span className="text-sm font-serif italic text-pink-100 font-semibold tracking-wide">
            Our Love Story
          </span>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg bg-pink-900/40 text-pink-200 border border-pink-500/30 hover:bg-pink-800/60 transition-all cursor-pointer hover:scale-105"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="bg-[#2d1b2e]/95 border-t border-pink-500/20 mt-3 pt-3 pb-4 space-y-2 rounded-b-xl shadow-2xl animate-fade-in-down">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-sans transition-all duration-300 cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-pink-600/90 text-white font-medium shadow-md shadow-pink-500/30'
                      : 'text-pink-200 hover:bg-pink-900/40 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* 2. NAVBAR DESKTOP */}
      <nav className="hidden sm:flex fixed top-4 left-1/2 -translate-x-1/2 z-[9999] bg-[#2d1b2e]/90 backdrop-blur-md border border-pink-500/30 px-3 py-1.5 rounded-full shadow-2xl max-w-2xl w-auto items-center justify-center gap-1 font-sans text-xs">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNavClick(item.id)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full cursor-pointer select-none transition-all duration-300 ease-out transform hover:scale-105 whitespace-nowrap ${
                activeTab === item.id 
                  ? 'bg-pink-600/90 text-white shadow-md font-medium' 
                  : 'text-pink-200 hover:text-white hover:bg-pink-900/30'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

export default function App() {
  const [showMainContent, setShowMainContent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTextIndex, setLoadingTextIndex] = useState(0);
  const [selectedFlower, setSelectedFlower] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [activeTab, setActiveTab] = useState('home');

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef(null);

  // KUNCI DATA PARTIKEL GLOBAL (Agar tidak berpindah/patah saat re-render)
  const floatingItems = useMemo(() => {
    const itemsList = ['🌸', '✨', '🌺', '💖', '🌸', '🌼', '🍓'];
    return Array.from({ length: 22 }).map((_, i) => ({
      id: i,
      char: itemsList[i % itemsList.length],
      left: Math.random() * 95,
      duration: 5 + Math.random() * 6,
      delay: Math.random() * 4,
      size: 0.9 + Math.random() * 0.7
    }));
  }, []);

  // STATE UNTUK LOVE DAY COUNTER
  const [timeTogether, setTimeTogether] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Tanggal mulai jadian: 1 Januari 2025
    const startDate = new Date('2025-01-01T00:00:00');

    const updateTimer = () => {
      const now = new Date();
      const difference = now.getTime() - startDate.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeTogether({ days, hours, minutes, seconds });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  const loadingQuotes = [
    "Haloo selamat datang",
    "Di website sederhana ini",
    "Mempersiapkan cerita ariel & yasmine",
    "Selamat datang dicerita kita berdua❤️"
  ];

  // DAFTAR LAGU PLAYLIST
  const playlist = [
    {
      title: "My Love",
      artist: "Westlife",
      src: song1
    },
    {
      title: "Shape Of My Heart",
      artist: "Backstreet Boys",
      src: song2
    },
    {
      title: "Dekat Di Hati",
      artist: "RAN",
      src: song3
    },
    {
      title: "Cinta Terakhir",
      artist: "Ari lasso",
      src: song4
    },
    {
      title: "Jaga Selalu Hatimu",
      artist: "Seventeen",
      src: song5
    }
  ];

  const currentTrack = playlist[currentTrackIndex];

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
    };
  }, [currentTrackIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleStartJourney = () => {
    setIsLoading(true);
    setLoadingTextIndex(0);

    const interval = setInterval(() => {
      setLoadingTextIndex((prev) => {
        if (prev < loadingQuotes.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 850);

    setTimeout(() => {
      setIsLoading(false);
      setShowMainContent(true);
    }, 3500);
  };

  // DATA MEMORIES
  const memories = [
    {
      id: 1,
      image: arilyasmin,
      title: "Hari Pertama Berjumpa",
      date: "Awal Cerita",
      desc: "Momen di mana semuanya dimulai. Senyum yang bikin canggung tapi selalu memorable."
    },
    {
      id: 2,
      image: arilyasmin2,
      title: "Tempat Favorit Bertukar Cerita",
      date: "Kencan Sederhana",
      desc: "Duduk berjam-jam cuma buat bahas hal-hal random tanpa rasa bosan."
    },
    {
      id: 3,
      image: arilyasmin3,
      title: "Perjalanan Singkat Berdua",
      date: "Momen Bahagia",
      desc: "Langkah kecil yang bikin kita sadar kalau perjalanan ini jauh lebih indah kalau bareng kamu."
    }
  ];

  // DATA GALLERY
  const galleryImages = [
    { id: 1, src: arilyasmin4, caption: "Senyum favoritku" },
    { id: 2, src: arilyasmin5, caption: "Sudut kenangan" },
    { id: 3, src: arilyasmin6, caption: "Suasana sore itu" },
    { id: 4, src: arilyasmin7, caption: "Sederhana tapi hangat" },
  ];

  const flowers = [
    { id: 1, name: 'Bunga Sakura', emoji: '🌸', message: 'Terima Kasih sudah saling percaya' },
    { id: 2, name: 'Mawar Merah', emoji: '🌹', message: 'Terima kasih sudah mencintai dan menemani prosesku.' },
    { id: 3, name: 'Matahari', emoji: '🌻', message: 'Kamu sudah berhasil menjadi tempat pulang terbaik' },
    { id: 4, name: 'Tulip', emoji: '🌷', message: 'Semoga cerita indah kita berlanjut selamanya.' },
    { id: 5, name: 'Bunga Sepatu', emoji: '🌺', message: 'Di antara ribuan hal di dunia, aku paling bersyukur menemukanmu.' },
    { id: 6, name: 'Bunga Kuning', emoji: '🌼', message: 'I love you, now and always.' },
  ];

  const reasons = [
    "Cara kamu tersenyum saat antusias menceritakan hal kecil.",
    "Sabar dan selalu mendengarkan cerita-ceritaku.",
    "Bikin hari biasa jadi berkesan cuma karena ada kamu.",
    "Ketenangan yang aku rasain tiap kali di sampingmu.",
    "Selalu jadi orang pertama yang bikin aku bersyukur tiap hari."
  ];

  const scrollToSection = (id) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#2d1b2e] text-pink-100 font-serif relative select-none">
      
      {/* Audio Element Hidden */}
      <audio ref={audioRef} src={currentTrack.src} onEnded={handleNext} />

      {/* TUNGGAL: BACKGROUND PARTIKEL GLOBAL (Berjalan terus tanpa putus dari loading sampai konten utama) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
        {floatingItems.map((item) => (
          <div
            key={item.id}
            className="flower-fall select-none filter drop-shadow-[0_0_8px_rgba(244,114,182,0.4)]"
            style={{
              left: `${item.left}%`,
              animationDuration: `${item.duration}s`,
              animationDelay: `${item.delay}s`,
              fontSize: `${item.size}rem`,
            }}
          >
            {item.char}
          </div>
        ))}
      </div>

      {/* 1. LAYAR ANIMASI LOADING */}
      {isLoading && (
        <div className="fixed inset-0 z-[10000] bg-[#2d1b2e] flex flex-col items-center justify-center p-6 text-center animate-fade-in">
          <div className="relative z-10 max-w-sm w-full flex flex-col items-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-pink-500/20 animate-ping"></div>
              <div className="w-20 h-20 rounded-full bg-pink-900/60 border border-pink-400/40 backdrop-blur-md flex items-center justify-center shadow-[0_0_30px_rgba(244,114,182,0.4)]">
                <Heart className="w-10 h-10 text-pink-400 fill-pink-400 animate-bounce" />
              </div>
            </div>

            <p className="text-sm sm:text-base italic text-pink-100 font-serif min-h-[3rem] flex items-center justify-center px-4 transition-all duration-500">
              "{loadingQuotes[loadingTextIndex]}"
            </p>

            <div className="w-48 h-1.5 bg-pink-950 rounded-full overflow-hidden border border-pink-500/30 mt-6 shadow-inner">
              <div className="h-full bg-gradient-to-r from-pink-500 via-rose-400 to-pink-300 rounded-full animate-pulse transition-all duration-300 w-full origin-left scale-x-100"></div>
            </div>

            <span className="text-[10px] text-pink-300/60 uppercase tracking-widest font-sans mt-3">
              PREPARING YOUR LOVE STORY
            </span>
          </div>
        </div>
      )}

      {/* 2. OPENING SCREEN */}
      {!showMainContent && !isLoading && (
        <div className="fixed inset-0 z-50 bg-[#2d1b2e] flex flex-col items-center justify-center p-4 sm:p-6 text-center">
          <div className="animate-float max-w-xs sm:max-w-md w-full border border-pink-500/40 bg-pink-950/40 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-2xl relative z-10 transition-all duration-300">
            <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.3em] text-pink-300 font-sans block mb-4">
              ✨ FOR YOU, MY EVERYTHING ✨
            </span>
            
            <h1 className="text-3xl sm:text-5xl font-light italic text-pink-100 mb-2">
              A Little Story
            </h1>
            
            <h2 className="text-xl sm:text-3xl font-serif italic text-pink-300 font-medium mb-6">
              Written With Love
            </h2>

            <div className="w-12 h-[1px] bg-pink-400/40 mx-auto mb-6"></div>

            <p className="text-xs text-pink-200/70 font-sans mb-6 leading-relaxed">
              Sebuah arsip kecil berisi dokumentasi dan cerita manis ariel & yasmine.
            </p>

            <button
              type="button"
              onClick={handleStartJourney}
              className="inline-flex items-center justify-center gap-2 bg-pink-600/90 hover:bg-pink-500 text-white px-6 sm:px-8 py-3.5 rounded-full text-xs sm:text-sm font-sans tracking-wider transition-all duration-300 ease-out transform hover:scale-110 active:scale-95 shadow-xl border border-pink-400/40 hover:shadow-pink-500/60 cursor-pointer w-full sm:w-auto"
            >
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '6s' }} /> Jelajahi Cerita Kita
            </button>
          </div>
        </div>
      )}

      {/* 3. TAMPILAN UTAMA KONTEN */}
      {showMainContent && (
        <div className="min-h-screen relative animate-fade-in">
          
          <Navbar activeTab={activeTab} scrollToSection={scrollToSection} />

          <main className="max-w-md mx-auto px-4 pb-28 space-y-16 sm:space-y-24 relative z-10 pt-6 sm:pt-20">

            {/* SECTION 1: HOME */}
            <section id="home" className="text-center pt-2 scroll-mt-20 sm:scroll-mt-28">
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans block mb-1.5">OUR MEMORY ARCHIVE</span>
              <h1 className="text-2xl sm:text-4xl font-light italic mb-3">Our Love Story</h1>
              <p className="text-xs text-pink-200/70 font-sans leading-relaxed max-w-xs mx-auto">
                Website sederhana yang dibuat oleh ariel untuk menyimpan setiap cerita, senyuman, dan momen manis bersama yasmine.
              </p>
              <div className="w-12 h-[1px] bg-pink-400/30 mx-auto mt-5"></div>
            </section>

            {/* LOVE DAY COUNTER */}
            <div className="bg-[#3a223c]/80 backdrop-blur-lg border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto my-6 text-center relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest text-pink-300/70 font-sans block mb-1">
                — TOGETHER FOREVER —
              </span>
              <h3 className="text-sm font-serif italic text-pink-100 mb-4">
                We've been together for
              </h3>

              <div className="grid grid-cols-4 gap-2 my-2">
                <div className="bg-pink-950/60 border border-pink-500/30 rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg sm:text-xl font-bold font-sans text-pink-300">{timeTogether.days}</span>
                  <span className="text-[9px] uppercase tracking-wider text-pink-200/60 font-sans mt-0.5">Days</span>
                </div>

                <div className="bg-pink-950/60 border border-pink-500/30 rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg sm:text-xl font-bold font-sans text-pink-300">{timeTogether.hours}</span>
                  <span className="text-[9px] uppercase tracking-wider text-pink-200/60 font-sans mt-0.5">Hours</span>
                </div>

                <div className="bg-pink-950/60 border border-pink-500/30 rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg sm:text-xl font-bold font-sans text-pink-300">{timeTogether.minutes}</span>
                  <span className="text-[9px] uppercase tracking-wider text-pink-200/60 font-sans mt-0.5">Mins</span>
                </div>

                <div className="bg-pink-950/60 border border-pink-500/30 rounded-2xl p-2.5 flex flex-col items-center justify-center shadow-inner">
                  <span className="text-lg sm:text-xl font-bold font-sans text-pink-300 animate-pulse">{timeTogether.seconds}</span>
                  <span className="text-[9px] uppercase tracking-wider text-pink-200/60 font-sans mt-0.5">Secs</span>
                </div>
              </div>

              <p className="text-[11px] italic text-pink-200/70 font-serif mt-4">
                "And every second with you is my favorite story."
              </p>
            </div>

            {/* DISTANCE CARD WITH BUS ICON */}
            <div className="bg-[#3a223c]/80 backdrop-blur-lg border border-pink-500/20 rounded-3xl p-6 shadow-2xl max-w-sm mx-auto my-6 text-center relative overflow-hidden">
              <span className="text-[10px] uppercase tracking-widest text-pink-300/70 font-sans block mb-2">
                — OUR DISTANCE —
              </span>

              <div className="relative w-full py-6 flex items-center justify-between px-2">
                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 300 100" fill="none" preserveAspectRatio="none">
                  <path
                    d="M 45,65 Q 150,10 255,65"
                    stroke="rgba(244, 114, 182, 0.4)"
                    strokeWidth="2"
                    strokeDasharray="6 6"
                  />
                </svg>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-pink-900/80 border border-pink-400/50 flex items-center justify-center shadow-lg shadow-pink-500/30 mb-2 transition-transform hover:scale-110">
                    <MapPin className="w-5 h-5 text-pink-300 fill-pink-500/30" />
                  </div>
                  <span className="text-xs font-semibold text-pink-100 font-sans">Bekasi</span>
                  <span className="text-[10px] text-pink-300/60 font-sans">Jawa Barat</span>
                </div>

                <div className="relative z-10 -mt-10 flex flex-col items-center gap-1">
                  <div className="bg-pink-900/90 border border-pink-400/40 p-1.5 rounded-full shadow-md backdrop-blur-md">
                    <Bus className="w-4 h-4 text-pink-300 animate-bounce" />
                  </div>

                  <div className="bg-pink-950/90 border border-pink-400/40 rounded-full px-3 py-1 shadow-lg backdrop-blur-md">
                    <span className="text-[11px] font-bold text-pink-200 font-sans">± 135 km</span>
                  </div>
                </div>

                <div className="relative z-10 flex flex-col items-center">
                  <div className="w-11 h-11 rounded-full bg-pink-900/80 border border-pink-400/50 flex items-center justify-center shadow-lg shadow-pink-500/30 mb-2 transition-transform hover:scale-110">
                    <MapPin className="w-5 h-5 text-pink-300 fill-pink-500/30" />
                  </div>
                  <span className="text-xs font-semibold text-pink-100 font-sans">Serang</span>
                  <span className="text-[10px] text-pink-300/60 font-sans">Banten</span>
                </div>
              </div>

              <p className="text-xs italic text-pink-200/70 font-serif mt-2">
                "Sejauh apa pun jarak Bekasi – Serang, ujungnya tetap ke kamu xixi."
              </p>
            </div>

            {/* SECTION 2: MEMORIES */}
            <section id="memories" className="scroll-mt-20 sm:scroll-mt-28">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans">CHAPTERS</span>
                <h2 className="text-xl sm:text-2xl font-light italic mt-0.5">Precious Memories</h2>
              </div>

              <div className="space-y-6 sm:space-y-8">
                {memories.map((item) => (
                  <div key={item.id} className="bg-pink-950/40 backdrop-blur-md border border-pink-500/20 rounded-2xl p-4 sm:p-5 shadow-xl transition-all duration-300 ease-out transform hover:-translate-y-2 hover:scale-[1.02] hover:border-pink-400/60 hover:shadow-2xl hover:shadow-pink-500/20 group cursor-pointer">
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-3.5 bg-gray-900">
                      <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider text-pink-400 font-sans block mb-1">{item.date}</span>
                    <h3 className="text-base sm:text-lg font-serif italic text-pink-100 mb-1.5 group-hover:text-pink-300 transition-colors">{item.title}</h3>
                    <p className="text-xs text-pink-200/70 font-sans leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 3: GALLERY */}
            <section id="gallery" className="scroll-mt-20 sm:scroll-mt-28">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans">SNAPSHOTS</span>
                <h2 className="text-xl sm:text-2xl font-light italic mt-0.5">Our Gallery</h2>
              </div>

              <div className="grid grid-cols-2 gap-2.5 sm:gap-3">
                {galleryImages.map((img) => (
                  <div key={img.id} className="group relative rounded-xl overflow-hidden bg-pink-950/50 border border-pink-500/20 aspect-square shadow-lg transition-all duration-300 ease-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-pink-500/30 hover:border-pink-400/50 cursor-pointer">
                    <img src={img.src} alt={img.caption} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2.5">
                      <p className="text-[10px] sm:text-[11px] text-pink-100 italic transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">{img.caption}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* SECTION 4: REASONS */}
            <section id="reasons" className="scroll-mt-20 sm:scroll-mt-28">
              <div className="text-center mb-6 sm:mb-8">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans">WHY YOU</span>
                <h2 className="text-xl sm:text-2xl font-light italic mt-0.5">Reasons I Love You</h2>
              </div>

              <div className="space-y-2.5 sm:space-y-3">
                {reasons.map((reason, index) => (
                  <div key={index} className="flex items-start gap-2.5 bg-pink-950/30 border border-pink-500/20 p-3.5 rounded-xl backdrop-blur-sm transition-all duration-300 ease-out transform hover:-translate-y-0.5 hover:translate-x-1 hover:bg-pink-900/40 hover:border-pink-400/40 hover:shadow-md hover:shadow-pink-500/20 cursor-pointer group">
                    <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400/30 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-125 group-hover:fill-pink-400" />
                    <p className="text-xs text-pink-100 font-sans leading-relaxed group-hover:text-white transition-colors">{reason}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* PANGGIL KOMPONEN MINI QUIZ */}
            <MiniQuiz />

            {/* SECTION 5: MESSAGE / BOUQUET */}
            <section id="message" className="scroll-mt-20 sm:scroll-mt-28 pt-4 border-t border-pink-900/40 text-center">
              <div className="flex items-center justify-center gap-1.5 text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans mb-1.5">
                <Sparkles className="w-3 h-3" /> LITTLE MESSAGES <Sparkles className="w-3 h-3" />
              </div>
              <h2 className="text-xl sm:text-2xl font-serif italic mb-1.5">A Digital Bouquet</h2>
              <p className="text-xs text-pink-200/70 font-sans mb-6">
                Pilih salah satu bunga untuk membaca pesan tersembunyi
              </p>

              <div className="relative h-56 sm:h-64 w-full flex items-center justify-center mb-4">
                <div className="absolute bottom-2 w-16 h-14 bg-pink-900/50 backdrop-blur-md rounded-b-3xl border border-pink-400/30 flex items-center justify-center shadow-lg z-10">
                  <Heart className="w-4 h-4 text-pink-300 fill-pink-300/30 animate-pulse" />
                </div>

                <div className="relative w-40 sm:w-48 h-full">
                  {flowers.map((flower, idx) => {
                    const angle = (idx - (flowers.length - 1) / 2) * 18;
                    return (
                      <button
                        type="button"
                        key={flower.id}
                        onClick={() => setSelectedFlower(flower)}
                        className="absolute bottom-10 left-1/2 -ml-5 sm:-ml-6 transition-all duration-300 ease-out transform hover:scale-130 active:scale-110 focus:outline-none cursor-pointer group z-20"
                        style={{
                          transform: `rotate(${angle}deg) translateY(-70px) rotate(${-angle}deg)`
                        }}
                      >
                        <span className="text-3xl sm:text-4xl filter drop-shadow-md group-hover:drop-shadow-[0_0_12px_rgba(244,114,182,1)] inline-block transition-transform duration-300 group-hover:-translate-y-2">
                          {flower.emoji}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="min-h-[85px] flex items-center justify-center">
                {selectedFlower ? (
                  <div className="bg-pink-950/60 backdrop-blur-md border border-pink-500/30 rounded-2xl p-4 shadow-xl w-full transition-all duration-300 hover:border-pink-400/60 hover:shadow-pink-500/20">
                    <p className="text-xs sm:text-sm italic text-pink-100">
                      "{selectedFlower.message}"
                    </p>
                    <span className="text-[11px] text-pink-400 mt-2 block font-sans">
                      — {selectedFlower.name} {selectedFlower.emoji}
                    </span>
                  </div>
                ) : (
                  <p className="text-xs italic text-pink-300/50 font-sans">
                    Klik salah satu bunga di atas ✨
                  </p>
                )}
              </div>
            </section>

            {/* SECTION 6: SPECIAL PLAYLIST */}
            <section id="playlist" className="scroll-mt-20 sm:scroll-mt-28 pt-8 border-t border-pink-900/40 text-center">
              <div className="text-center mb-6">
                <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300/80 font-sans block mb-1">— OUR SONGS —</span>
                <h2 className="text-2xl sm:text-3xl font-serif italic text-pink-100">FAVORIT MUSIC</h2>
                <p className="text-xs text-pink-200/60 font-sans mt-1">Songs that always remind me of you</p>
              </div>

              {/* KOTAK PLAYER + PLAYLIST TERPADU */}
              <div className="bg-[#3a223c]/80 backdrop-blur-lg border border-pink-500/20 rounded-3xl p-5 sm:p-6 shadow-2xl max-w-sm mx-auto flex flex-col items-center relative overflow-hidden">
                
                {/* PIRINGAN HITAM / VINYL BERPUTAR */}
                <div className="relative mb-5">
                  <div className={`w-36 h-36 sm:w-44 sm:h-44 rounded-full bg-gradient-to-tr from-pink-950 via-[#1f1120] to-pink-900 border-4 border-pink-500/20 shadow-2xl flex items-center justify-center transition-all duration-700 ${isPlaying ? 'animate-spin' : ''}`} style={{ animationDuration: '12s' }}>
                    <div className="w-28 h-28 rounded-full border border-pink-500/10 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border border-pink-500/15 flex items-center justify-center">
                        <div className="w-10 h-10 rounded-full bg-pink-700/60 border-2 border-pink-400/40 flex items-center justify-center">
                          <div className="w-3 h-3 rounded-full bg-[#2d1b2e]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* JUDUL DAN ARTIS LAGU AKTIF */}
                <h3 className="text-base sm:text-lg font-serif italic text-pink-100 font-medium">
                  {currentTrack.title}
                </h3>
                <p className="text-xs text-pink-300/70 font-sans mt-0.5 mb-4">
                  {currentTrack.artist}
                </p>

                {/* PROGRESS BAR SLIDER */}
                <div className="w-full space-y-1 mb-5">
                  <input
                    type="range"
                    min="0"
                    max={duration || 100}
                    value={currentTime}
                    onChange={handleSeek}
                    className="w-full h-1 bg-pink-950 rounded-lg appearance-none cursor-pointer accent-pink-400"
                  />
                  <div className="flex justify-between text-[10px] text-pink-300/50 font-sans px-1">
                    <span>{formatTime(currentTime)}</span>
                    <span>{formatTime(duration)}</span>
                  </div>
                </div>

                {/* TOMBOL KONTROL MUSIK */}
                <div className="flex items-center justify-center gap-5 mb-6">
                  <button 
                    type="button" 
                    onClick={handlePrev}
                    className="text-pink-300/60 hover:text-pink-100 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <SkipBack className="w-5 h-5 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={togglePlay}
                    className="w-11 h-11 rounded-full bg-pink-900/60 hover:bg-pink-800/80 border border-pink-400/30 flex items-center justify-center text-pink-100 shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                  </button>

                  <button 
                    type="button" 
                    onClick={handleNext}
                    className="text-pink-300/60 hover:text-pink-100 transition-colors cursor-pointer hover:scale-110 active:scale-95"
                  >
                    <SkipForward className="w-5 h-5 fill-current" />
                  </button>
                </div>

                {/* DAFTAR LAGU DI DALAM KOTAK YANG SAMA */}
                <div className="w-full border-t border-pink-500/15 pt-4 space-y-2">
                  <span className="text-[10px] uppercase tracking-wider text-pink-300/60 font-sans block text-left mb-2">Tracklist</span>
                  {playlist.map((track, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => {
                        setCurrentTrackIndex(idx);
                        setIsPlaying(true);
                      }}
                      className={`w-full flex items-center justify-between p-2.5 rounded-xl text-left transition-all duration-200 cursor-pointer ${
                        currentTrackIndex === idx 
                          ? 'bg-pink-900/50 border border-pink-400/30 text-white' 
                          : 'hover:bg-pink-900/20 text-pink-200/70 hover:text-pink-100'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs font-sans text-pink-400/60">{idx + 1}</span>
                        <div>
                          <p className="text-xs font-medium font-serif leading-none">{track.title}</p>
                          <p className="text-[10px] text-pink-300/50 font-sans mt-0.5">{track.artist}</p>
                        </div>
                      </div>
                      {currentTrackIndex === idx && isPlaying && (
                        <Music className="w-3.5 h-3.5 text-pink-400 animate-pulse" />
                      )}
                    </button>
                  ))}
                </div>

              </div>
            </section>

          </main> 

          {/* FOOTER / WATERMARK */}
          <footer className="w-full py-10 text-center text-pink-200/80 text-sm font-sans border-t border-pink-500/20 mt-16 relative z-10">
            <p className="px-4">
              © 2026 — Made with love and affection, for the two of us.
            </p>
          </footer>

          {/* MUSIC BUTTON QUICK CONTROL */}
          <div className="fixed bottom-5 right-5 z-[9999]">
            <button 
              type="button"
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-pink-900/80 backdrop-blur-md border border-pink-400/30 flex items-center justify-center text-pink-200 shadow-xl transition-all duration-300 ease-out transform hover:scale-125 hover:-translate-y-1 hover:shadow-2xl hover:shadow-pink-500/50 hover:bg-pink-700/90 active:scale-95 cursor-pointer group"
            >
              {isPlaying ? <Music className="w-4 h-4 animate-spin group-hover:text-white" /> : <VolumeX className="w-4 h-4 group-hover:text-white" />}
            </button>
          </div>

        </div>
      )}
    </div>
  );
}