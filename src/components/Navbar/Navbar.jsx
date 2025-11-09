import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, Search, User, X, Check, LogIn, LogOut, Settings, GripVertical } from 'lucide-react';
import DropdownMenu from './DropdownMenu';
import NavLink from './NavLink';
import { blizzardItems, gameInfoItems, expansionItems, menuItems, accountItems } from './Items';
import MobileAccountMenu from './MobileAccountMenu';
import MobileMenu from './MobileMenu';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente para cada item del navbar arrastrable
const SortableNavItem = ({ id, children, isDragging }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="relative flex items-center group/sortable h-full"
    >
      <button
        {...attributes}
        {...listeners}
        className="absolute -left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover/sortable:opacity-100 text-gray-500 hover:text-white p-1 cursor-grab active:cursor-grabbing touch-none z-10 bg-gray-800/80 rounded transition-opacity"
        aria-label="Arrastrar para reordenar"
      >
        <GripVertical size={14} />
      </button>
      {children}
    </div>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileAccountOpen, setIsMobileAccountOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const searchRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const mobileAccountRef = useRef(null);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('user') || ''
  );
  const [navbarLogo, setNavbarLogo] = useState(
    localStorage.getItem('navbarLogo') || '/blizz-rmbg.png'
  );

  // Función para obtener los items por defecto
  const getDefaultNavItems = () => [
    { id: 'game-info', type: 'dropdown', title: 'Información sobre el juego', isWide: true },
    { id: 'expansions', type: 'dropdown', title: 'Expansiones', badge: 'NUEVO' },
    { id: 'news', type: 'link', title: 'Noticias', href: '#noticias' },
    { id: 'menu', type: 'dropdown', title: 'Menú' },
  ];

  // Items del navbar con orden personalizable
  const [navItems, setNavItems] = useState(() => {
    const saved = localStorage.getItem('navbarOrder');
    return saved ? JSON.parse(saved) : getDefaultNavItems();
  });

  // Configurar sensores
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(localStorage.getItem('isLoggedIn') === 'true');
      setCurrentUser(localStorage.getItem('user') || '');
      setNavbarLogo(localStorage.getItem('navbarLogo') || '/blizz-rmbg.png');
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleStorageChange);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMobileMenuOpen(false);
        setIsMobileAccountOpen(false);
      }
    };

    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
      if (mobileAccountRef.current && !mobileAccountRef.current.contains(event.target)) {
        setIsMobileAccountOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen, isMobileMenuOpen, isMobileAccountOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false);
        setIsMobileAccountOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Guardar orden cuando cambie
  useEffect(() => {
    localStorage.setItem('navbarOrder', JSON.stringify(navItems));
  }, [navItems]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setNavItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const resetNavbarOrder = () => {
    const defaultOrder = getDefaultNavItems();
    setNavItems(defaultOrder);
    localStorage.setItem('navbarOrder', JSON.stringify(defaultOrder));
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setCurrentUser('');
    navigate('/');
  };

  const handlePersonalizationClick = () => {
    navigate('/Panel');
  };

  const activeItem = navItems.find((item) => item.id === activeId);

  return (
    <>
      <nav className={`fixed top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#1a1a1a]/80 backdrop-blur-md shadow-2xl border border-gray-700/30' 
          : 'bg-[#1a1a1a]/60 backdrop-blur-sm border border-gray-700/20'
      } rounded-xl sm:rounded-2xl`}>
        <div className="px-2 sm:px-4 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16">
            <div className="flex items-center space-x-2 sm:space-x-5 h-full">
              <div className="flex items-center h-full w-full justify-between lg:justify-start">
                
                <button 
                  className="lg:hidden text-gray-300 hover:text-white p-2"
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  <Menu size={20} />
                </button>

                <div className="hidden lg:flex items-center">
                  <DropdownMenu
                    icon={
                      <div className="relative w-16 sm:w-20 md:w-24 h-8 sm:h-10 md:h-12 flex items-center">
                        <img 
                          src={navbarLogo} 
                          alt="Blizzard" 
                          className="h-16 sm:h-20 md:h-24 object-contain"
                        />  
                      </div>
                    }
                    items={blizzardItems}
                    isWide={true}
                  />
                </div>

                <div className="absolute left-1/2 transform -translate-x-1/2 lg:static lg:translate-x-0 flex items-center">
                  <div className="w-10 sm:w-12 md:w-14 h-10 sm:h-12 md:h-14 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                    <img 
                      src="/W.svg" 
                      alt="World of Warcraft" 
                      className="w-full h-full object-contain rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Navbar items con Drag & Drop (solo si está logueado) */}
              <div className="hidden lg:flex items-center space-x-1 h-full">
                {isLoggedIn ? (
                  <>
                    <DndContext
                      sensors={sensors}
                      collisionDetection={closestCenter}
                      onDragStart={handleDragStart}
                      onDragEnd={handleDragEnd}
                      onDragCancel={handleDragCancel}
                    >
                      <SortableContext
                        items={navItems.map((item) => item.id)}
                        strategy={horizontalListSortingStrategy}
                      >
                        {navItems.map((item) => (
                          <SortableNavItem 
                            key={item.id} 
                            id={item.id}
                            isDragging={activeId === item.id}
                          >
                            {item.type === 'dropdown' ? (
                              <DropdownMenu
                                title={item.title}
                                icon={item.id === 'menu' ? <Menu size={20} /> : undefined}
                                badge={item.badge}
                                items={item.id === 'game-info' ? gameInfoItems : item.id === 'expansions' ? expansionItems : menuItems}
                                isWide={item.isWide}
                              />
                            ) : (
                              <NavLink href={item.href}>{item.title}</NavLink>
                            )}
                          </SortableNavItem>
                        ))}
                      </SortableContext>

                      <DragOverlay>
                        {activeItem ? (
                          <div className="bg-[#1a1a1a]/95 backdrop-blur-md border-2 border-blue-500 rounded-lg shadow-2xl px-4 py-2">
                            <span className="text-white font-medium text-sm flex items-center gap-2">
                              <GripVertical size={16} className="text-blue-400" />
                              {activeItem.title || '☰'}
                            </span>
                          </div>
                        ) : null}
                      </DragOverlay>
                    </DndContext>

                    {/* Botón para resetear orden - Visible cuando está logueado */}
                    <button
                      onClick={resetNavbarOrder}
                      className="ml-2 text-gray-500 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                      title="Restaurar orden original del menú"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                        <path d="M21 3v5h-5"/>
                        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                        <path d="M3 21v-5h5"/>
                      </svg>
                    </button>
                  </>
                ) : (
                  /* Vista normal sin drag & drop para usuarios no logueados */
                  <>
                    <DropdownMenu
                      title="Información sobre el juego"
                      items={gameInfoItems}
                      isWide={true}
                    />
                    <DropdownMenu
                      badge="NUEVO"
                      title="Expansiones"
                      items={expansionItems}
                    />
                    <NavLink href="#noticias">Noticias</NavLink>
                    <DropdownMenu
                      icon={<Menu size={20} />}
                      items={menuItems}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex items-center space-x-1 sm:space-x-3 h-full">
              <button 
                onClick={() => setIsMobileAccountOpen(true)}
                className="lg:hidden text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 h-full aspect-square flex items-center justify-center"
              >
                <User size={18} />
              </button>

              <div className="hidden lg:flex relative h-full items-center" ref={searchRef}>
                <button 
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10 h-full aspect-square flex items-center justify-center"
                >
                  <Search size={18} />
                </button>
                
                {isSearchOpen && (
                  <div className="absolute right-0 top-full mt-2 w-[calc(100vw-2rem)] sm:w-80 bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700/50 z-50">
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold text-sm">Buscar</h3>
                        <button 
                          onClick={() => setIsSearchOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors"
                        >
                          <X size={16} />
                        </button>
                      </div>
                      
                      <div className="relative mb-4">
                        <input
                          type="text"
                          placeholder="Personajes, hermandades, noticias"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full bg-gray-800/50 border border-gray-600 rounded-lg px-6 py-3 text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          autoFocus
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <Search size={16} className="text-gray-400" />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="text-gray-400 text-xs font-medium mb-2">Búsquedas populares</div>
                        {[
                          'The War Within',
                          'Mists of Pandaria Classic', 
                          'Clases',
                          'Razas',
                          'Estado del reino'
                        ].map((suggestion, index) => (
                          <button
                            key={index}
                            onClick={() => setSearchQuery(suggestion)}
                            className="block w-full text-left text-gray-300 hover:text-white hover:bg-white/10 px-3 py-3 rounded text-sm transition-colors"
                          >
                            {suggestion}
                          </button>
                        ))}
                      </div>
                      
                      <div className="border-t border-gray-700/50 mt-4 pt-4">
                        <div className="text-gray-400 text-xs">
                          Presiona Enter para buscar
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="hidden lg:block relative group h-full">
                <button className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors px-3 py-2 rounded-lg hover:bg-white/10 h-full">
                  <User size={18} />
                  <span className="hidden xl:inline font-medium text-sm">
                    {isLoggedIn ? currentUser : 'Cuenta'}
                  </span>
                  <ChevronDown size={16} className="group-hover:rotate-180 transition-transform duration-200" />
                </button>
                
                <div className="absolute right-0 top-full mt-2 w-64 bg-[#1a1a1a]/95 backdrop-blur-md rounded-lg shadow-2xl border border-gray-700/50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-3">
                    {isLoggedIn ? (
                      <>
                        <div className="px-5 py-3 border-b border-gray-700/50">
                          <div className="flex items-center gap-2 text-white mb-3">
                            <User size={16} />
                            <span className="font-semibold">{currentUser}</span>
                          </div>
                          <button 
                            onClick={handlePersonalizationClick}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2 mb-2"
                          >
                            <Settings size={16} />
                            Personalizar
                          </button>
                          <button 
                            onClick={handleLogout}
                            className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-4 py-2.5 rounded-lg transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <LogOut size={16} />
                            Cerrar sesión
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-5 py-3 border-b border-gray-700/50">
                          <button 
                            onClick={handleLoginClick}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white px-4 py-2.5 rounded-lg transition-all font-semibold text-sm shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                          >
                            <LogIn size={16} />
                            Iniciar sesión
                          </button>
                        </div>
                        
                        <div className="py-2">
                          {accountItems.filter(item => !item.isHeader).map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <a 
                                key={index}
                                href={item.href || '#'}
                                className="flex items-center px-5 py-3 hover:bg-white/10 transition-colors text-sm text-gray-300 hover:text-white group"
                              >
                                <div className="flex items-center justify-center w-5 h-5 mr-3">
                                  {item.checked ? (
                                    <Check size={16} className="text-green-500" />
                                  ) : (
                                    <IconComponent size={16} className="text-gray-500 group-hover:text-gray-400" />
                                  )}
                                </div>
                                <span className={item.checked ? "text-white" : "text-gray-400 group-hover:text-gray-300"}>
                                  {item.label}
                                </span>
                              </a>
                            );
                          })}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
                <button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-6 xl:px-8 py-2 xl:py-3 rounded-lg transition-all font-semibold text-sm xl:text-base shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center whitespace-nowrap">
                  Probar gratis
                </button>

                <button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white px-6 xl:px-8 py-2 xl:py-3 rounded-lg transition-all font-semibold text-sm xl:text-base shadow-lg hover:shadow-2xl transform hover:scale-105 flex items-center whitespace-nowrap">
                  Suscribirse
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {isMobileMenuOpen && <MobileMenu onClose={() => setIsMobileMenuOpen(false)} />}
      {isMobileAccountOpen && <MobileAccountMenu onClose={() => setIsMobileAccountOpen(false)} onLoginClick={handleLoginClick} />}
    </>
  );
};

export default Navbar;