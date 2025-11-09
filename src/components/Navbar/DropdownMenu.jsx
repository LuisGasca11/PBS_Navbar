import { useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

const DropdownMenu = ({ title, badge, items, icon, isWide = false, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  return (
    <div 
      ref={dropdownRef}
      className="relative h-full flex items-center group"
    >
      <button 
        className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 md:px-6 py-3 rounded-lg hover:bg-white/10 h-full w-full"
        onClick={() => isMobileMenuOpen && setIsOpen(!isOpen)}
      >
        {badge && (
          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
            {badge}
          </span>
        )}
        {icon || <span className="font-medium text-sm whitespace-nowrap">{title}</span>}
        <ChevronDown size={18} className={`transition-transform group-hover:rotate-180`} />
      </button>
      
      {/* Área invisible para mantener el hover activo - SOLUCIÓN */}
      <div className="absolute left-0 right-0 h-2 top-full hidden lg:block" />
      
      {/* Menú desplegable para desktop (hover) */}
      <div className={`hidden lg:block absolute left-0 top-full mt-2 ${isWide ? 'w-80' : 'w-64'} 
        bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700/50 z-50
        opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200`}>
        <div className="py-4">
          {items.map((item, idx) => (
            <div key={idx}>
              {item.isCategory ? (
                <div className={`px-5 py-3 text-xs font-bold tracking-wider border-b border-gray-700/50 ${
                  item.isMainCategory ? 'text-blue-400 text-sm uppercase' : 'text-gray-400'
                }`}>
                  {item.label}
                </div>
              ) : item.isSeparator ? (
                <div className="border-t border-gray-700/50 my-2"></div>
              ) : (
                <a 
                  href={item.href || '#'} 
                  className={`block px-5 py-3 hover:bg-white/10 transition-colors text-sm ${
                    item.featured ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'
                  } ${item.isHighlighted ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded ml-2">
                        {item.badge}
                      </span>
                    )}
                  </div>
                  {item.subtitle && (
                    <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Menú desplegable para mobile (click) */}
      {isOpen && isMobileMenuOpen && (
        <div className={`lg:hidden relative top-0 w-full mt-2 
          bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700/50 z-50`}>
          <div className="py-4">
            {items.map((item, idx) => (
              <div key={idx}>
                {item.isCategory ? (
                  <div className={`px-5 py-3 text-xs font-bold tracking-wider border-b border-gray-700/50 ${
                    item.isMainCategory ? 'text-blue-400 text-sm uppercase' : 'text-gray-400'
                  }`}>
                    {item.label}
                  </div>
                ) : item.isSeparator ? (
                  <div className="border-t border-gray-700/50 my-2"></div>
                ) : (
                  <a 
                    href={item.href || '#'} 
                    className={`block px-5 py-3 hover:bg-white/10 transition-colors text-sm ${
                      item.featured ? 'text-blue-400 font-semibold' : 'text-gray-300 hover:text-white'
                    } ${item.isHighlighted ? 'bg-blue-500/20 border-l-4 border-blue-500' : ''}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{item.label}</span>
                      {item.badge && (
                        <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded ml-2">
                          {item.badge}
                        </span>
                      )}
                    </div>
                    {item.subtitle && (
                      <div className="text-xs text-gray-500 mt-1">{item.subtitle}</div>
                    )}
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownMenu;