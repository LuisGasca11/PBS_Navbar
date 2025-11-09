import { useState, useRef, useEffect } from 'react';
import { X, Search, ChevronDown, Menu, GripVertical } from 'lucide-react';
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
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// Componente para cada item arrastrable
const SortableMenuItem = ({ id, children }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
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
      className={`relative ${isDragging ? 'z-50' : ''}`}
    >
      <div className="flex items-center gap-2">
        <button
          {...attributes}
          {...listeners}
          className="text-gray-400 hover:text-white p-2 cursor-grab active:cursor-grabbing touch-none"
        >
          <GripVertical size={20} />
        </button>
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

const MobileMenu = ({ onClose }) => {
  const [navbarLogo, setNavbarLogo] = useState(() => {
    return localStorage.getItem('navbarLogo') || '/blizz-rmbg.png';
  });
  const mobileMenuRef = useRef(null);
  const [activeId, setActiveId] = useState(null);
  
  // Verificar si el usuario está logueado
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('isLoggedIn') === 'true';
  });

  // Items del menú con IDs únicos
  const [menuItems, setMenuItems] = useState(() => {
    const saved = localStorage.getItem('mobileMenuOrder');
    return saved ? JSON.parse(saved) : [
      { id: 'game-info', label: 'Información sobre el juego', hasDropdown: true },
      { id: 'expansions', label: 'Expansiones', badge: 'NUEVO', hasDropdown: true },
      { id: 'news', label: 'Noticias', href: '#noticias', hasDropdown: false },
      { id: 'community', label: 'Comunidad', hasDropdown: true },
      { id: 'store', label: 'Tienda', hasDropdown: true },
    ];
  });

  // Configurar sensores para touch y mouse
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // Pixels que debe moverse antes de activar drag
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const updateLogo = () => {
      const savedLogo = localStorage.getItem('navbarLogo');
      if (savedLogo) {
        setNavbarLogo(savedLogo);
      }
    };

    updateLogo();
    window.addEventListener('localStorageUpdated', updateLogo);
    
    return () => {
      window.removeEventListener('localStorageUpdated', updateLogo);
    };
  }, []);

  // Guardar orden cuando cambie
  useEffect(() => {
    localStorage.setItem('mobileMenuOrder', JSON.stringify(menuItems));
  }, [menuItems]);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setMenuItems((items) => {
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

  // Resetear orden
  const resetOrder = () => {
    const defaultOrder = [
      { id: 'game-info', label: 'Información sobre el juego', hasDropdown: true },
      { id: 'expansions', label: 'Expansiones', badge: 'NUEVO', hasDropdown: true },
      { id: 'news', label: 'Noticias', href: '#noticias', hasDropdown: false },
      { id: 'community', label: 'Comunidad', hasDropdown: true },
      { id: 'store', label: 'Tienda', hasDropdown: true },
    ];
    setMenuItems(defaultOrder);
    localStorage.setItem('mobileMenuOrder', JSON.stringify(defaultOrder));
  };

  const activeItem = menuItems.find((item) => item.id === activeId);

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/50 transition-opacity duration-300"
        onClick={onClose}
      />

      <div
        ref={mobileMenuRef}
        className="fixed inset-y-0 left-0 z-50 w-full max-w-sm bg-[#2a2421] transform transition-transform duration-300 ease-in-out overflow-y-auto translate-x-0"
      >
        <div className="relative p-6 flex justify-between items-start">
          <div className="flex flex-col items-center flex-1">
            <img
              src={navbarLogo}
              alt="Blizzard"
              className="h-20 object-contain mb-6"
            />
            <img
              src="/wow-rmbg.png"
              alt="World of Warcraft"
              className="w-40 object-contain"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-700/50 p-2 rounded-lg"
          >
            <X size={24} />
          </button>
        </div>

        <div className="px-6 mb-6">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              placeholder="Personajes, hermandades, noticias"
              className="w-full bg-[#1a1614] border-0 rounded-lg pl-12 pr-4 py-4 text-gray-300 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-600"
            />
          </div>
        </div>

        {/* Tip de reordenamiento - Solo si está logueado */}
        {isLoggedIn && (
          <div className="px-6 mb-4">
            <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-3">
              <p className="text-blue-300 text-xs flex items-center gap-2">
                <GripVertical size={16} />
                Mantén presionado y arrastra para reordenar
              </p>
            </div>
          </div>
        )}

        {/* Items del menú con drag & drop */}
        <div className="px-6 space-y-2">
          {isLoggedIn ? (
            /* Vista con drag & drop para usuarios logueados */
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={menuItems.map((item) => item.id)}
                strategy={verticalListSortingStrategy}
              >
                {menuItems.map((item) => (
                  <SortableMenuItem key={item.id} id={item.id}>
                    {item.hasDropdown ? (
                      <button className="w-full text-left py-4 text-white text-lg font-medium flex items-center justify-between hover:bg-white/5 rounded-lg px-3">
                        <div className="flex items-center gap-3">
                          <span>{item.label}</span>
                          {item.badge && (
                            <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <ChevronDown size={20} />
                      </button>
                    ) : (
                      <a
                        href={item.href}
                        className="block w-full text-left py-4 text-white text-lg font-medium hover:bg-white/5 rounded-lg px-3"
                      >
                        {item.label}
                      </a>
                    )}
                  </SortableMenuItem>
                ))}
              </SortableContext>

              <DragOverlay>
                {activeItem ? (
                  <div className="bg-[#1a1614] border-2 border-blue-500 rounded-lg shadow-2xl">
                    <div className="flex items-center gap-2 p-2">
                      <GripVertical size={20} className="text-blue-400" />
                      <div className="py-4 px-3 text-white text-lg font-medium flex items-center gap-3">
                        <span>{activeItem.label}</span>
                        {activeItem.badge && (
                          <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                            {activeItem.badge}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ) : null}
              </DragOverlay>
            </DndContext>
          ) : (
            /* Vista normal sin drag & drop para usuarios no logueados */
            <>
              <button className="w-full text-left py-4 text-white text-lg font-medium flex items-center justify-between hover:bg-white/5 rounded-lg px-3">
                <span>Información sobre el juego</span>
                <ChevronDown size={20} />
              </button>

              <button className="w-full text-left py-4 text-white text-lg font-medium flex items-center justify-between hover:bg-white/5 rounded-lg px-3">
                <div className="flex items-center gap-3">
                  <span>Expansiones</span>
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-1 rounded">
                    NUEVO
                  </span>
                </div>
                <ChevronDown size={20} />
              </button>

              <a
                href="#noticias"
                className="block w-full text-left py-4 text-white text-lg font-medium hover:bg-white/5 rounded-lg px-3"
              >
                Noticias
              </a>

              <button className="w-full text-left py-4 text-white text-lg font-medium flex items-center justify-between hover:bg-white/5 rounded-lg px-3">
                <span>Comunidad</span>
                <ChevronDown size={20} />
              </button>

              <button className="w-full text-left py-4 text-white text-lg font-medium flex items-center justify-between hover:bg-white/5 rounded-lg px-3">
                <span>Tienda</span>
                <ChevronDown size={20} />
              </button>
            </>
          )}
        </div>

        {/* Botón para resetear orden - Solo si está logueado */}
        {isLoggedIn && (
          <div className="px-6 mt-4">
            <button
              onClick={resetOrder}
              className="w-full text-sm text-gray-400 hover:text-white py-2 hover:bg-white/5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"/>
                <path d="M21 3v5h-5"/>
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"/>
                <path d="M3 21v-5h5"/>
              </svg>
              Restaurar orden original
            </button>
          </div>
        )}

        <div className="px-6 py-6 space-y-3 mt-6">
          <button className="w-full bg-[#c8381e] hover:bg-[#d64528] text-white py-4 rounded-lg font-bold text-base transition-colors">
            Suscribirse
          </button>
          <button className="w-full bg-[#3d3028] hover:bg-[#4a3930] text-white py-4 rounded-lg font-bold text-base transition-colors border border-gray-600/30">
            Probar gratis
          </button>
        </div>

        <div className="px-6 py-6 border-t border-gray-700/30">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
            MÁS DE BLIZZARD
          </h3>

          <a
            href="https://blizzard.com"
            className="flex items-center gap-3 py-3 text-white hover:bg-white/5 rounded-lg px-3"
          >
            <img
              src={navbarLogo}
              alt="Blizzard"
              className="w-8 h-8 object-contain"
            />
            <span className="font-medium">Visita Blizzard.com</span>
          </a>

          <a
            href="#todos-juegos"
            className="flex items-center gap-3 py-3 text-white hover:bg-white/5 rounded-lg px-3"
          >
            <div className="w-8 h-8 bg-gray-700/50 rounded flex items-center justify-center">
              <Menu size={20} />
            </div>
            <span className="font-medium">Todos los juegos</span>
          </a>
        </div>

        <div className="px-6 pb-8">
          <h3 className="text-gray-500 text-xs font-bold uppercase tracking-wider mb-4">
            PUEDE QUE TE GUSTE
          </h3>

          <div className="space-y-1">
            <a
              href="#midnight"
              className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg px-3"
            >
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">W</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">
                    World of Warcraft: Midnight
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Expansión</span>
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">
                    UPCOMING
                  </span>
                </div>
              </div>
            </a>

            <a href="#war-within" className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg px-3">
              <div className="w-12 h-12 bg-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">W</span>
              </div>
              <div className="flex-1">
                <span className="text-white font-medium block">World of Warcraft: The War Within</span>
                <span className="text-gray-400 text-sm">Expansión</span>
              </div>
            </a>

            <a href="#mop" className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg px-3">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">CLASSIC</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-white font-medium">World of Warcraft: Mists of Pandaria Classic</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-400 text-sm">Expansión</span>
                  <span className="bg-yellow-500 text-black text-xs font-bold px-2 py-0.5 rounded">NUEVO</span>
                </div>
              </div>
            </a>

            <a href="#hearthstone" className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg px-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">🃏</span>
              </div>
              <div className="flex-1">
                <span className="text-white font-medium block">Hearthstone</span>
                <span className="text-gray-400 text-sm">Juego de cartas de estrategia</span>
              </div>
            </a>

            <a href="#rumble" className="flex items-center gap-3 py-3 hover:bg-white/5 rounded-lg px-3">
              <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-4xl">⚡</span>
              </div>
              <div className="flex-1">
                <span className="text-white font-medium block">Warcraft Rumble</span>
                <span className="text-gray-400 text-sm">Estrategia y acción para móviles</span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;