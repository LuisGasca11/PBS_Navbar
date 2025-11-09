import { useState, useEffect } from 'react';

const Body = () => {
  const [bodyImage, setBodyImage] = useState(
    localStorage.getItem('bodyImage') || 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920'
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setBodyImage(localStorage.getItem('bodyImage') || 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-900 via-blue-900/40 to-purple-900/30 pt-24 overflow-hidden">
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-15"
        style={{ backgroundImage: `url(${bodyImage})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900"></div>
      
      <div className="absolute top-1/4 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-1/3 right-16 w-48 h-48 bg-cyan-400/5 rounded-full blur-2xl animate-bounce"></div>
      <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-purple-500/10 rounded-full blur-lg animate-pulse delay-1000"></div>
      
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-transparent to-gray-900"></div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-96px)] text-center px-4">
        <div className="mb-8 opacity-80">
        </div>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-white mb-6 tracking-tighter drop-shadow-2xl">
          WORLD OF
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 animate-pulse">
            WARCRAFT
          </span>
        </h1>

        <div className="relative mb-12">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-30"></div>
          <p className="text-xl md:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-4xl leading-relaxed relative font-medium">
            Antes de que te estalle el futuro, te invitamos a que descubras la personalización que te espera
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl">
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
            <div className="text-3xl font-bold text-cyan-400 mb-2">10M+</div>
            <div className="text-gray-300">Jugadores activos</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
            <div className="text-3xl font-bold text-cyan-400 mb-2">8</div>
            <div className="text-gray-300">Expansiones épicas</div>
          </div>
          <div className="bg-gray-800/40 backdrop-blur-sm rounded-xl p-6 border border-blue-500/20 hover:border-blue-400/40 transition-all">
            <div className="text-3xl font-bold text-cyan-400 mb-2">20+</div>
            <div className="text-gray-300">Años de historia</div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>
          
          <a
            href="https://us.shop.battle.net/es-es/product/world-of-warcraft-midnight#optLogin=true"
            target="_blank"
            rel="noopener noreferrer"
            className="relative inline-block"
          >
            <button className="relative bg-gradient-to-r from-blue-700 to-blue-800 hover:from-blue-600 hover:to-cyan-700 text-white px-16 py-6 rounded-lg text-xl font-bold transition-all transform group-hover:scale-105 shadow-2xl border border-cyan-400/30">
              <span className="flex items-center justify-center">
                Comenzar Aventura
                <svg
                  className="w-5 h-5 ml-3 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </span>
            </button>
          </a>
        </div>

        <p className="text-gray-400 mt-8 text-sm max-w-2xl">
          Únete a la legión de héroes que forjan su destino en Azeroth. 
          <span className="text-cyan-400 font-semibold"> ¡La batalla te espera!</span>
        </p>

        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2"></div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-50"></div>
    </div>
  );
};

export default Body;