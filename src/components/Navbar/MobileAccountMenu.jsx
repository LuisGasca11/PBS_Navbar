import { useState, useRef, useEffect } from 'react';
import { X, User, HelpCircle, ShoppingBag, Download, LogOut, Settings } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MobileAccountMenu = () => {
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState('');
  const mobileAccountRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
      const userData = localStorage.getItem('user') || '';
      setIsLoggedIn(loggedIn);
      setUser(userData);
    };

    checkLoginStatus();
    window.addEventListener('localStorageUpdated', checkLoginStatus);
    
    return () => {
      window.removeEventListener('localStorageUpdated', checkLoginStatus);
    };
  }, []);

  const handleLoginClick = () => {
    setIsMobileAccountOpen(false);
    navigate('/login');
  };

  const handlePersonalizeClick = () => {
    setIsMobileAccountOpen(false);
    navigate('/panel');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser('');
    setIsMobileAccountOpen(false);
    window.dispatchEvent(new Event('localStorageUpdated'));
    navigate('/', { replace: true });
  };

  return (
    <>
      <button
        onClick={() => setIsMobileAccountOpen(true)}
        className="lg:hidden text-white bg-gray-800 p-3 rounded-md fixed top-4 right-4 z-50"
      >
        <User size={24} />
      </button>

      {isMobileAccountOpen && (
        <div
          className="lg:hidden fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
          onClick={() => setIsMobileAccountOpen(false)}
        />
      )}

      <div
        ref={mobileAccountRef}
        className={`lg:hidden fixed inset-y-0 right-0 z-50 w-full max-w-sm bg-[#3a3331] transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col ${
          isMobileAccountOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="relative p-6 flex justify-center items-center border-b border-gray-700/30 bg-[#3a3331]">
          <img
            src="/blizz-rmbg.png"
            alt="Blizzard"
            className="h-40 object-contain"
          />
          <button
            onClick={() => setIsMobileAccountOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700/50 p-2 rounded-lg transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 py-6">
          {isLoggedIn ? (
            <div className="text-center space-y-4">
              <div className="bg-green-500/20 border border-green-500/50 rounded-lg p-4">
                <p className="text-green-400 font-semibold text-sm">Conectado como:</p>
                <p className="text-white text-lg font-bold">{user}</p>
              </div>
              
              {/* Botón de Personalizar */}
              <button 
                onClick={handlePersonalizeClick}
                className="w-full flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-bold text-base transition-colors transform hover:scale-105 active:scale-95"
              >
                <Settings size={20} />
                Personalizar
              </button>
              
              {/* Botón de Cerrar sesión */}
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-3 rounded-lg font-bold text-base transition-colors transform hover:scale-105 active:scale-95"
              >
                <LogOut size={20} />
                Cerrar sesión
              </button>
            </div>
          ) : (
            <button 
              onClick={handleLoginClick}
              className="w-full bg-[#0074e0] hover:bg-[#0082ff] text-white py-4 rounded-lg font-bold text-base transition-colors transform hover:scale-105 active:scale-95"
            >
              Iniciar sesión
            </button>
          )}
        </div>

        <div className="px-6 space-y-1 flex-1">
          <a
            href="#personajes"
            className="flex items-center gap-4 py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
            onClick={() => setIsMobileAccountOpen(false)}
          >
            <User size={24} className="text-gray-400" />
            <span className="font-medium text-lg">Personajes de WoW</span>
          </a>

          <a
            href="#ajustes"
            className="block py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
            onClick={() => setIsMobileAccountOpen(false)}
          >
            <span className="font-medium text-lg">Ajustes de tu cuenta</span>
          </a>

          {!isLoggedIn && (
            <a
              href="#registrarse"
              className="block py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
              onClick={() => setIsMobileAccountOpen(false)}
            >
              <span className="font-medium text-lg">Registrarse</span>
            </a>
          )}
        </div>

        <div className="px-6 py-6 space-y-1 border-t border-gray-700/30">
          <a
            href="#asistencia"
            className="flex items-center gap-4 py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
            onClick={() => setIsMobileAccountOpen(false)}
          >
            <HelpCircle size={24} className="text-gray-400" />
            <span className="font-medium text-lg">Asistencia</span>
          </a>

          <a
            href="#tienda"
            className="flex items-center gap-4 py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
            onClick={() => setIsMobileAccountOpen(false)}
          >
            <ShoppingBag size={24} className="text-gray-400" />
            <span className="font-medium text-lg">Tienda</span>
          </a>

          <a
            href="#descarga"
            className="flex items-center gap-4 py-4 text-white hover:bg-white/5 rounded-lg px-3 transition-all duration-200 transform hover:translate-x-2"
            onClick={() => setIsMobileAccountOpen(false)}
          >
            <Download size={24} className="text-gray-400" />
            <span className="font-medium text-lg">
              Aplicación móvil de Battle.net
            </span>
          </a>
        </div>
      </div>
    </>
  );
};

export default MobileAccountMenu;