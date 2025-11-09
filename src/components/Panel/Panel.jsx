import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Upload, RotateCcw } from 'lucide-react';

const Panel = () => {
  const navigate = useNavigate();
  const [navbarLogo, setNavbarLogo] = useState(
    localStorage.getItem('navbarLogo') || '/blizz-rmbg.png'
  );
  const [bodyImage, setBodyImage] = useState(
    localStorage.getItem('bodyImage') || 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920'
  );

  const handleLogoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newLogo = reader.result;
        setNavbarLogo(newLogo);
        localStorage.setItem('navbarLogo', newLogo);
        window.dispatchEvent(new Event('localStorageUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBodyImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage = reader.result;
        setBodyImage(newImage);
        localStorage.setItem('bodyImage', newImage);
        window.dispatchEvent(new Event('localStorageUpdated'));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetToDefaults = () => {
    const defaultLogo = '/blizz-rmbg.png';
    const defaultBodyImage = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=1920';
    setNavbarLogo(defaultLogo);
    setBodyImage(defaultBodyImage);
    localStorage.setItem('navbarLogo', defaultLogo);
    localStorage.setItem('bodyImage', defaultBodyImage);
    window.dispatchEvent(new Event('localStorageUpdated'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6 lg:mb-8 px-2"
        >
          <ArrowLeft size={20} />
          <span className="text-sm lg:text-base">Volver al inicio</span>
        </button>

        <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/30 p-4 lg:p-8 mx-2 lg:mx-0">
          <div className="text-center lg:text-left mb-6 lg:mb-8">
            <h1 className="text-2xl lg:text-4xl font-bold text-white mb-2">
              Panel de Personalización
            </h1>
            <p className="text-gray-400 text-sm lg:text-base">
              Personaliza tu experiencia en World of Warcraft
            </p>
          </div>

          <div className="space-y-6 lg:space-y-8">
            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/30">
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Upload size={20} className="text-blue-400" />
                Logo de la Navbar
              </h2>
              <div className="space-y-4">
                <div className="flex flex-col lg:flex-row items-center gap-4 lg:gap-6">
                  <div className="bg-gray-900 rounded-lg p-3 lg:p-4 border-2 border-gray-700 w-full lg:w-auto">
                    <img 
                      src={navbarLogo} 
                      alt="Preview Logo" 
                      className="h-16 lg:h-20 object-contain mx-auto"
                    />
                  </div>
                  <div className="flex-1 w-full">
                    <label className="block">
                      <span className="sr-only">Elegir logo</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleLogoChange}
                        className="block w-full text-sm text-gray-300
                          file:mr-2 lg:file:mr-4 file:py-2 lg:file:py-3 file:px-4 lg:file:px-6
                          file:rounded-lg file:border-0
                          file:text-xs lg:file:text-sm file:font-semibold
                          file:bg-blue-600 file:text-white
                          hover:file:bg-blue-700
                          file:cursor-pointer cursor-pointer
                          file:transition-all"
                      />
                    </label>
                    <p className="text-xs text-gray-400 mt-2 text-center lg:text-left">
                      Sube una imagen para el logo de la barra de navegación
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 lg:p-6 border border-gray-700/30">
              <h2 className="text-xl lg:text-2xl font-semibold text-white mb-4 flex items-center gap-2 justify-center lg:justify-start">
                <Upload size={20} className="text-cyan-400" />
                Imagen de Fondo Principal
              </h2>
              <div className="space-y-4">
                <div 
                  className="h-48 lg:h-64 rounded-lg overflow-hidden border-2 border-gray-700 relative"
                  style={{
                    backgroundImage: `url(${bodyImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/60 to-gray-900 flex items-center justify-center">
                    <span className="text-white text-xs lg:text-sm bg-black/70 px-3 lg:px-4 py-1 lg:py-2 rounded-lg font-semibold">
                      Vista previa del fondo
                    </span>
                  </div>
                </div>
                <label className="block">
                  <span className="sr-only">Elegir imagen de fondo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleBodyImageChange}
                    className="block w-full text-sm text-gray-300
                      file:mr-2 lg:file:mr-4 file:py-2 lg:file:py-3 file:px-4 lg:file:px-6
                      file:rounded-lg file:border-0
                      file:text-xs lg:file:text-sm file:font-semibold
                      file:bg-cyan-600 file:text-white
                      hover:file:bg-cyan-700
                      file:cursor-pointer cursor-pointer
                      file:transition-all"
                  />
                </label>
                <p className="text-xs text-gray-400 text-center lg:text-left">
                  Esta imagen aparecerá como fondo del contenido principal
                </p>
              </div>
            </div>

            <button
              onClick={resetToDefaults}
              className="w-full bg-gray-700 hover:bg-gray-600 text-white px-4 lg:px-6 py-3 lg:py-4 rounded-xl transition-all font-semibold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm lg:text-base"
            >
              <RotateCcw size={18} className="lg:size-5" />
              Restaurar valores por defecto
            </button>

            <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-4 lg:p-6">
              <h3 className="text-base lg:text-lg font-semibold text-blue-300 mb-2 text-center lg:text-left">
                Información importante
              </h3>
              <ul className="text-xs lg:text-sm text-blue-200 space-y-1 lg:space-y-2">
                <li>• Los cambios se guardan automáticamente</li>
                <li>• Las personalizaciones permanecen incluso después de cerrar sesión</li>
                <li>• Puedes restaurar los valores por defecto en cualquier momento</li>
                <li>• Las imágenes se guardan localmente en tu navegador</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;