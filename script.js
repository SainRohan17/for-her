import React, { useState, useRef, useEffect } from 'react';
import { Heart, Music } from 'lucide-react';

const ProposalWebsite = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Our First Smile Together",
      text: "That moment when our eyes met and the world stopped. Your smile lit up my entire universe and I knew something special was beginning.",
      image: "https://images.unsplash.com/photo-1518568814500-bf0f8d125f46?w=1200&q=80",
      spotify: "YOUR_SPOTIFY_EMBED_1"
    },
    {
      id: 2,
      title: "The Day We Laughed Until Dawn",
      text: "Remember staying up all night, talking about everything and nothing? Your laughter is my favorite sound in the world.",
      image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=1200&q=80",
      spotify: "YOUR_SPOTIFY_EMBED_2"
    },
    {
      id: 3,
      title: "When You Held My Hand",
      text: "The first time our fingers intertwined, I felt home. That simple gesture meant everything to me.",
      image: "https://images.unsplash.com/photo-1522673607236-f516fb9b3a8d?w=1200&q=80",
      spotify: "YOUR_SPOTIFY_EMBED_3"
    },
    {
      id: 4,
      title: "Dancing in the Rain",
      text: "We were soaked, but it didn't matter. Dancing with you in that moment, I felt truly alive and free.",
      image: "https://images.unsplash.com/photo-1518621736915-f3b1c41bfd00?w=1200&q=80",
      spotify: "YOUR_SPOTIFY_EMBED_4"
    },
    {
      id: 5,
      title: "Every Sunset With You",
      text: "Each sunset we watched together was more beautiful than the last. Because I was watching them with you.",
      image: "https://images.unsplash.com/photo-1495954380655-c0c4f0e0d7a2?w=1200&q=80",
      spotify: "YOUR_SPOTIFY_EMBED_5"
    }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showProposal, setShowProposal] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [noHoverCount, setNoHoverCount] = useState(0);
  const noButtonRef = useRef(null);

  const cardRefs = useRef([]);
  const [dragStart, setDragStart] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (currentIndex >= cards.length) {
      setTimeout(() => setShowProposal(true), 300); 
    }
  }, [currentIndex, cards.length]);

  const handleDragStart = (e, index) => {
    if (index !== currentIndex) return;
    setIsDragging(true);
    const clientX = e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    setDragStart({ x: clientX, y: clientY });
    if (e.type === 'touchstart') {
      e.target.style.touchAction = 'none';
    }
  };

  const handleDragMove = (e, index) => {
    if (!isDragging || index !== currentIndex || !dragStart) return;
    e.preventDefault(); 
    const clientX = e.type === 'touchmove' ? e.touches[0].clientX : e.clientX;
    const clientY = e.type === 'touchmove' ? e.touches[0].clientY : e.clientY;
    setDragOffset({
      x: clientX - dragStart.x,
      y: clientY - dragStart.y
    });
  };

  const handleDragEnd = (e, index) => {
    if (!isDragging || index !== currentIndex) return;
    setIsDragging(false);
    
    if (e.target.style) {
      e.target.style.touchAction = 'auto';
    }

    if (Math.abs(dragOffset.x) > 100) {
      setCurrentIndex(prev => prev + 1);
    }
    
    setDragOffset({ x: 0, y: 0 });
    setDragStart(null);
  };

  const handleYes = () => {
    setShowConfetti(true);
    setShowMessage(true);
  };

  const handleNoHover = () => {
    const button = noButtonRef.current;
    if (button) {
      const container = button.parentElement;
      const containerRect = container.parentElement.getBoundingClientRect(); 
      const buttonRect = button.getBoundingClientRect();
      
      const maxX = containerRect.width - buttonRect.width - 80; 
      const maxY = containerRect.height - buttonRect.height - 80;
      
      const newX = Math.random() * maxX;
      const newY = Math.random() * maxY;
      
      setNoButtonPos({ 
        x: newX - (containerRect.width/2 - buttonRect.width/2), 
        y: newY - (containerRect.height/2 - buttonRect.height/2)
      });
      setNoHoverCount(prev => prev + 1);
    }
  };

  const Confetti = () => {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="confetti"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              backgroundColor: ['#FFB6C1', '#FFC0CB', '#FF69B4', '#FF1493', '#C71585'][Math.floor(Math.random() * 5)]
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center p-4 overflow-hidden font-sans">
      <style>{`
        /* --- FONT IMPORTS REMOVED TO USE GENERIC SANS-SERIF --- */
        
        .card-stack {
          position: relative;
          width: 100%;
          max-width: 450px;
          height: 600px;
        }

        .memory-card-item {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
          cursor: grab;
          user-select: none;
          touch-action: none;
        }

        .memory-card-item:active {
          cursor: grabbing;
        }

        .confetti {
          position: absolute;
          width: 10px;
          height: 10px;
          top: -10px;
          animation: fall 3s linear infinite;
        }

        @keyframes fall {
          to {
            transform: translateY(100vh) rotate(360deg);
          }
        }

        .glow-button {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(255, 105, 180, 0.5), 0 0 40px rgba(255, 105, 180, 0.3);
          }
          50% {
            box-shadow: 0 0 30px rgba(255, 105, 180, 0.8), 0 0 60px rgba(255, 105, 180, 0.5);
          }
        }

        .no-button {
          transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55), background-color 0.3s, color 0.3s, box-shadow 0.3s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .fade-in {
          animation: fadeIn 0.5s ease-out;
        }
      `}</style>

      {showConfetti && <Confetti />}

      {!showProposal ? (
        <div className="w-full max-w-lg">
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-light text-gray-800 mb-2"> 
              Our Story
            </h1>
            <p className="text-gray-600"> 
              Swipe to relive our memories
            </p>
            <div className="mt-4 flex justify-center gap-2">
              {cards.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    idx < currentIndex ? 'w-2 bg-pink-300' : idx === currentIndex ? 'w-8 bg-pink-500' : 'w-2 bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="card-stack">
            {cards.map((card, index) => {
              const isActive = index === currentIndex;
              const isPast = index < currentIndex;
              const isFuture = index > currentIndex;
              
              let transform = '';
              let opacity = 1;
              let zIndex = cards.length - index;

              if (isPast) {
                transform = `translateX(-120%) rotate(-10deg)`;
                opacity = 0;
              } else if (isFuture) {
                const offset = (index - currentIndex) * 10;
                transform = `translateY(${offset}px) scale(${1 - (index - currentIndex) * 0.05})`;
                opacity = 1 - (index - currentIndex) * 0.2;
                zIndex = cards.length - index;
              } else if (isActive && isDragging) {
                const rotation = dragOffset.x * 0.1;
                transform = `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`;
              }

              return (
                <div
                  key={card.id}
                  ref={el => cardRefs.current[index] = el}
                  className="memory-card-item"
                  style={{
                    transform,
                    opacity,
                    zIndex,
                    transition: isDragging && isActive ? 'none' : 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                    pointerEvents: isActive ? 'auto' : 'none'
                  }}
                  onMouseDown={(e) => handleDragStart(e, index)}
                  onMouseMove={(e) => handleDragMove(e, index)}
                  onMouseUp={(e) => handleDragEnd(e, index)}
                  onMouseLeave={(e) => handleDragEnd(e, index)}
                  onTouchStart={(e) => handleDragStart(e, index)}
                  onTouchMove={(e) => handleDragMove(e, index)}
                  onTouchEnd={(e) => handleDragEnd(e, index)}
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${card.image})` }}
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50" />
                  
                  <div className="relative h-full flex flex-col justify-between p-8 text-white">
                    <div>
                      <h2 className="text-3xl md:text-4xl font-light mb-4">
                        {card.title}
                      </h2>
                      <p className="text-lg md:text-xl leading-relaxed font-light">
                        {card.text}
                      </p>
                    </div>

                    <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                      <div className="flex items-center gap-2 mb-2">
                        <Music size={18} />
                        <span className="text-sm">Our Song</span>
                      </div>
                      <div className="text-xs text-white/70">
                        Add Spotify embed here
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <p className="text-gray-500 text-sm">
              ➡️ Swipe left to continue
            </p>
          </div>
        </div>
      ) : (
        <div className="text-center max-w-3xl mx-auto px-6 fade-in">
          {!showMessage ? (
            <>
              <Heart className="text-pink-500 mx-auto mb-6 animate-pulse" size={64} />
              <h1 className="text-5xl md:text-7xl font-light text-gray-800 mb-12">
                Will You Be Mine Again?
              </h1>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative h-64 sm:h-32 p-4">
                <button
                  onClick={handleYes}
                  className="glow-button bg-gradient-to-r from-pink-500 to-rose-500 text-white px-12 py-4 rounded-full text-xl font-semibold hover:scale-110 transition-transform duration-300 z-10"
                >
                  YESSSS! 💖
                </button>
                
                <button
                  ref={noButtonRef}
                  onMouseEnter={handleNoHover}
                  onTouchStart={handleNoHover}
                  className="no-button bg-gray-300 text-gray-600 px-12 py-4 rounded-full text-xl font-semibold absolute"
                  style={{
                    transform: `translate(${noButtonPos.x}px, ${noButtonPos.y}px)`,
                  }}
                >
                  No
                </button>
              </div>
              
              {noHoverCount > 3 && (
                <p className="text-pink-600 mt-8 text-lg animate-pulse">
                  The button knows you don't mean it... 😼
                </p>
              )}
            </>
          ) : (
            <div className="fade-in">
              <div className="text-6xl mb-8 animate-bounce">💍💖🎉</div>
              <h2 className="text-4xl md:text-6xl font-light text-gray-800 mb-8">
                A Beautiful New Beginning
              </h2>
              <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-pink-200">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light mb-6">
                  Every ending is just the start of something more beautiful. What we had was special, and what we'll build together will be extraordinary. I promise to cherish every moment, to grow with you, and to love you more deeply each day.
                </p>
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed font-light">
                  Thank you for giving us another chance to write our story. This time, let's make it our greatest chapter yet. Here's to new memories, endless laughter, and a love that only grows stronger.
                </p>
                <Heart className="text-pink-500 mx-auto mt-8" size={48} />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProposalWebsite;