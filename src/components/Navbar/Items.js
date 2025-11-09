import { ChevronDown, Menu, Search, User, X, Check, LogIn, UserPlus, HelpCircle, ShoppingBag, Download } from 'lucide-react';

export const blizzardItems = [
    {
      icon: '🏢',
      label: 'Visita Blizzard.com',
      href: 'https://blizzard.com',
      isSpecial: true
    },
    {
      icon: '🎮',
      label: 'Todos los juegos',
      href: '#todos-juegos',
      isSpecial: true
    },
    { isSeparator: true },
    {
      isCategory: true,
      label: 'PUEDE QUE TE GUSTE'
    },
    {
      icon: '⚔️',
      gameIcon: '/wow.jpg',
      label: 'World of Warcraft: Midnight',
      subtitle: 'Expansión',
      badge: 'UPCOMING',
      href: '#midnight'
    },
    {
      icon: '⚔️',
      gameIcon: '/wow.jpg',
      label: 'World of Warcraft: The War Within',
      subtitle: 'Expansión',
      href: '#war-within'
    },
    {
      icon: '⚔️',
      gameIcon: '/wow.jpg',
      label: 'World of Warcraft: Mists of Pandaria Classic',
      subtitle: 'Expansión',
      badge: 'NUEVO',
      href: '#mop'
    },
    {
      icon: '🃏',
      label: 'Hearthstone',
      subtitle: 'Juego de cartas de estrategia',
      href: '#hearthstone'
    },
    {
      icon: '⚡',
      label: 'Warcraft Rumble',
      subtitle: 'Estrategia y acción para móviles',
      href: '#rumble'
    }
  ];

export const gameInfoItems = [
    { label: 'Resumen', href: '#resumen' },
    { label: 'Razas', href: '#razas' },
    { label: 'Clases', href: '#clases' },
    { label: 'Veteranos', href: '#veteranos' },
    { label: 'Estado del reino', href: '#estado' },
    { isSeparator: true },
    { 
      label: 'Notas de la actualización de contenido', 
      href: '#notas-actualizacion',
    },
    { isSeparator: true },
    { 
      isCategory: true,
      isMainCategory: true,
      label: 'TRASFONDO'
    },
    { label: 'Historia y medios', href: '#historia-medios' },
    { label: 'Cronología de Warcraft', href: '#cronologia' }
  ];

export const expansionItems = [
    { 
      label: 'World of Warcraft: Midnight', 
      badge:"PROXIMAMENTE",
      featured: true 
    },
    { label: 'The War Within', href: '#war-within' },
    { 
      label: 'WOW CLASSIC', 
      isCategory: true 
    },
    { 
      label: 'Mists of Pandaria Classic', 
      badge: 'NUEVO',
      href: '#mop' 
    }
  ];

export const menuItems = [
    {
      isSection: true,
      label: 'Foros',
    },
    {
      isSection: true,
      label: 'Recluta a un amigo',
      subtitle: 'CLASIFICACIONES'
    },
    {
      isSection: true,
      label: 'Mazmorra mítica',
    },
    {
      isSection: true,
      label: 'Banda mítica',
    },
    {
      isSection: true,
      label: 'Jugador contra jugador',
      subtitle: 'ESPORTS'
    },
    { label: 'Torneos', href: '#torneos' },
    { isSeparator: true },
    {
      isSection: true,
      label: 'Contenido del juego',
      subtitle: 'Monturas, mascotas, servicios...'
    },
    { isSeparator: true },
    { label: 'Gear', href: '#gear' }
  ];

export const accountItems = [
    {
      isHeader: true,
      label: 'Cuenta',
      subtitle: 'Iniciar sesión'
    },
    {
      label: 'Personajes de WoW',
      href: '#personajes',
      icon: Check,
      checked: true
    },
    {
      label: 'Ajustes de tu cuenta',
      href: '#ajustes',
      icon: Check,
      checked: true
    },
    {
      label: 'Registrarse',
      href: '#registrarse',
      icon: UserPlus,
      checked: false
    },
    {
      label: 'Asistencia',
      href: '#asistencia',
      icon: HelpCircle,
      checked: false
    },
    {
      label: 'Tienda',
      href: '#tienda',
      icon: ShoppingBag,
      checked: false
    },
    {
      label: 'Descarga Battle.net',
      href: '#descarga',
      icon: Download,
      checked: false
    }
  ];