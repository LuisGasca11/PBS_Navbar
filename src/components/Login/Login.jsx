import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, ArrowLeft } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (formData.email === 'TEST' && formData.password === '123456') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user', 'TEST');
      
      window.dispatchEvent(new Event('localStorageUpdated'));
      
      navigate('/', { replace: true });
    } else {
      setError('Usuario o contraseña incorrectos. Inténtalo de nuevo.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-10 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="w-full max-w-md">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft size={20} />
          Volver al inicio
        </button>

        <div className="bg-[#1a1a1a]/80 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-700/30 p-8">
          <div className="flex justify-center mb-8">
            <img 
              src="/blizz-rmbg.png" 
              alt="Blizzard" 
              className="h-20 object-contain"
            />
          </div>

          <h2 className="text-3xl font-bold text-white text-center mb-2">
            Iniciar sesión
          </h2>
          <p className="text-gray-400 text-center mb-8">
            Accede a tu cuenta de Battle.net
          </p>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-lg">
              <p className="text-red-500 text-center font-semibold">
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                Correo electrónico o BattleTag
              </label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="TEST"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all pr-12"
                  placeholder="123456"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-600 bg-gray-800/50 text-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-0"
                />
                <span className="ml-2 text-sm text-gray-300">Recordarme</span>
              </label>
              <a href="#" className="text-sm text-blue-500 hover:text-blue-400 transition-colors">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-6 py-3 rounded-lg transition-all font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Iniciar sesión
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-700/50">
            <p className="text-xs text-blue-400 text-center mt-2">
              Usuario de prueba: TEST / Contraseña: 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;