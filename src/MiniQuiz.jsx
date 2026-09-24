import React, { useState } from 'react';
import { HelpCircle, Heart, Sparkles, RefreshCw, Mail, XCircle } from 'lucide-react';



export default function MiniQuiz() {
    const quizData = [
        {
          id: 1,
          question: "Apa film pertama kali yang kita tonton di bioskop?",
          options: [
            { key: 'a', text: "Film Pengabdi Setan" },
            { key: 'b', text: "Film Spiderman" },
            { key: 'c', text: "Film dan Bandung" },
            { key: 'd', text: "Film Nawila" },
          ],
          correctAnswer: 'b'
        },
        {
          id: 2,
          question: "Apa makanan favorit kita?",
          options: [
            { key: 'a', text: "Rabboki Cheese" },
            { key: 'b', text: "Pancong" },
            { key: 'c', text: "Kebab" },
            { key: 'd', text: "Ayam geprek" },
          ],
          correctAnswer: 'a'
        },
        {
          id: 3,
          question: "Tempat favorit?",
          options: [
            { key: 'a', text: "Bioskop" },
            { key: 'b', text: "Timezone" },
            { key: 'c', text: "Cafe simpang" },
            { key: 'd', text: "Rumah Yasmine" },
          ],
          correctAnswer: 'a' // <-- Diubah dari 'd' ke 'a' (Bioskop)
        },
        {
          id: 4,
          question: "Love language kita?",
          options: [
            { key: 'a', text: "Di Cium" },
            { key: 'b', text: "Di peluk" },
            { key: 'c', text: "Di Gandeng" },
            { key: 'd', text: "Benar semua" },
          ],
          correctAnswer: 'd'
        },
        {
          id: 5,
          question: "Berawal dari dimana kita bertemu?",
          options: [
            { key: 'a', text: "Instagram" },
            { key: 'b', text: "Secara langsung tanpa sengaja" },
            { key: 'c', text: "Telegram" },
            { key: 'd', text: "Di pasar hewan" },
          ],
          correctAnswer: 'c'
        }
      ];

  const [userAnswers, setUserAnswers] = useState({});
  const [showResultModal, setShowResultModal] = useState(false);
  const [isPerfect, setIsPerfect] = useState(false);

  const handleSelectOption = (questionId, optionKey) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleSubmit = () => {
    let correctCount = 0;
    quizData.forEach(item => {
      if (userAnswers[item.id] === item.correctAnswer) {
        correctCount++;
      }
    });

    if (correctCount === quizData.length) {
      setIsPerfect(true);
    } else {
      setIsPerfect(false);
    }
    setShowResultModal(true);
  };

  const handleReset = () => {
    setUserAnswers({});
    setShowResultModal(false);
  };

  const allAnswered = Object.keys(userAnswers).length === quizData.length;

  return (
    <section id="quiz" className="scroll-mt-20 sm:scroll-mt-28 py-6 border-t border-pink-900/40">
      <div className="text-center mb-6 sm:mb-8">
        <span className="text-[10px] sm:text-xs uppercase tracking-widest text-pink-300 font-sans flex items-center justify-center gap-1">
          <Sparkles className="w-3 h-3" /> QUIZZZ <Sparkles className="w-3 h-3" />
        </span>
        <h2 className="text-xl sm:text-2xl font-light italic mt-0.5 text-pink-100">Mini Quiz Tentang Kita</h2>
        <p className="text-xs text-pink-200/70 font-sans mt-1">Buat kita-kita ajaa xixi</p>
      </div>

      <div className="space-y-6 max-w-md mx-auto">
        {quizData.map((item, index) => (
          <div key={item.id} className="bg-pink-950/40 backdrop-blur-md border border-pink-500/20 rounded-2xl p-4 sm:p-5 shadow-xl text-left">
            <div className="flex items-start gap-2.5 mb-3">
              <span className="w-6 h-6 rounded-full bg-pink-800/60 border border-pink-400/40 text-pink-200 flex items-center justify-center text-xs font-bold font-sans shrink-0 mt-0.5">
                {index + 1}
              </span>
              <h3 className="text-xs sm:text-sm font-serif italic text-pink-100 font-medium leading-relaxed">
                {item.question}
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-2 pl-8">
              {item.options.map(option => {
                const isSelected = userAnswers[item.id] === option.key;
                return (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => handleSelectOption(item.id, option.key)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-sans transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                      isSelected
                        ? 'bg-pink-600/90 border-pink-400 text-white font-medium shadow-md shadow-pink-500/30 scale-[1.01]'
                        : 'bg-pink-900/20 border-pink-500/10 text-pink-200/80 hover:bg-pink-900/40 hover:text-white'
                    }`}
                  >
                    <span><strong className="uppercase mr-1.5">{option.key}.</strong> {option.text}</span>
                    {isSelected && <Heart className="w-3.5 h-3.5 text-white fill-white shrink-0 ml-2" />}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="text-center pt-2">
          <button
            type="button"
            disabled={!allAnswered}
            onClick={handleSubmit}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-full text-xs sm:text-sm font-sans tracking-wider transition-all duration-300 border shadow-xl cursor-pointer ${
              allAnswered
                ? 'bg-pink-600 hover:bg-pink-500 text-white border-pink-400/50 hover:scale-105 active:scale-95 shadow-pink-500/30'
                : 'bg-pink-950/40 border-pink-500/20 text-pink-300/40 cursor-not-allowed'
            }`}
          >
            {allAnswered ? 'Cek Jawaban Kamu ✨' : 'Jawab Semua Pertanyaan Dulu Ya 💕'}
          </button>
        </div>
      </div>

      {/* MODAL / POP-UP HASIL */}
      {showResultModal && (
        <div className="fixed inset-0 z-[10000] bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
          <div className="relative max-w-sm w-full bg-[#3a223c] border border-pink-500/40 rounded-3xl p-6 shadow-2xl text-center overflow-hidden">
            
            <div className="absolute top-2 right-3 text-pink-400/30 text-xl animate-pulse">✨</div>
            <div className="absolute bottom-2 left-3 text-pink-400/30 text-xl animate-pulse">🌸</div>

            {isPerfect ? (
              <div className="flex flex-col items-center py-2">
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-pink-900/80 border border-pink-400/50 flex items-center justify-center shadow-[0_0_30px_rgba(244,114,182,0.5)] animate-bounce">
                    <Mail className="w-10 h-10 text-pink-300" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full p-1 shadow-lg animate-pulse">
                    <Heart className="w-4 h-4 fill-white" />
                  </div>
                </div>

                <span className="text-[10px] uppercase tracking-widest text-pink-300 font-sans block mb-1">
                  — PERFECT SCORE —
                </span>
                
                <h3 className="text-xl sm:text-2xl font-serif italic text-pink-100 font-bold mb-3">
                  100% jawaban anda benar ❤️
                </h3>

                <p className="text-xs text-pink-200/80 font-sans leading-relaxed mb-6 px-2">
                  Wah hebat banget! Kamu masih ingat semua kenangan dan hal-hal favorit kita. Makin sayang deh! 🥰
                </p>

                <button
                  type="button"
                  onClick={handleReset}
                  className="inline-flex items-center gap-2 bg-pink-600 hover:bg-pink-500 text-white px-6 py-2.5 rounded-full text-xs font-sans border border-pink-400/40 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Coba Lagi
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center py-2">
                <div className="w-16 h-16 rounded-full bg-rose-950/80 border border-rose-500/40 flex items-center justify-center mb-4 shadow-lg shadow-rose-900/30">
                  <XCircle className="w-8 h-8 text-rose-400" />
                </div>

                <span className="text-[10px] uppercase tracking-widest text-rose-300 font-sans block mb-1">
                  — OOPS! —
                </span>

                <h3 className="text-lg sm:text-xl font-serif italic text-pink-100 font-bold mb-3">
                  Yahhh anda kurang tepat, belajar lagi yaa hihi! 😜
                </h3>

                <p className="text-xs text-pink-200/70 font-sans leading-relaxed mb-6">
                  Masih ada jawaban yang belum pas nih. Coba ingat-ingat lagi dan jawab ulang ya!
                </p>

                <button
                  type="button"
                  onClick={() => setShowResultModal(false)}
                  className="inline-flex items-center gap-2 bg-pink-900/80 hover:bg-pink-800 text-pink-100 px-6 py-2.5 rounded-full text-xs font-sans border border-pink-500/30 shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <RefreshCw className="w-3.5 h-3.5" /> Coba Perbaiki
                </button>
              </div>
            )}

          </div>
        </div>
      )}
    </section>
  );
}