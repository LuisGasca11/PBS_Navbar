import { ChevronDown, Menu, Search, User, Bell, BookOpen, Sword, Users, Calendar, History, ScrollText } from 'lucide-react';

const NavLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="px-4 py-2 text-gray-300 hover:text-white transition-colors font-medium"
    >
      {children}
    </a>
  );
};

export default NavLink;