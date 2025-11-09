import { Facebook, Twitter, Instagram, Youtube} from 'lucide-react';

const Footer = () => {
  const socialIcons = [
    { icon: Facebook, label: 'Facebook', url: 'https://www.facebook.com/WorldofWarcraft.es' },
    { icon: Twitter, label: 'Twitter', url: 'https://x.com/warcraft_Es' },
    { icon: Instagram, label: 'Instagram', url: 'https://www.instagram.com/warcraft/' },
    { icon: Youtube, label: 'YouTube', url: 'https://www.youtube.com/user/WorldofWarcraftES' },
  ];

  return (
    <footer className="bg-[#0f0f0f] border-t border-gray-800 mt-20">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center mb-10">

        <h3 className="text-white text-4xl font-bold mb-6 text-center">Seguir a Warcraft</h3>
          
          <div className="flex flex-wrap justify-center gap-6">
            {socialIcons.map((social, index) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-16 h-16 bg-gray-700 rounded-lg flex items-center justify-center hover:bg-gray-600 transition-colors group"
                  aria-label={social.label}
                >
                  <IconComponent
                    size={28}
                    className="text-white group-hover:text-blue-400 transition-colors"
                  />
                </a>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {[
            { title: 'Empleo', href: '/https://careers.blizzard.com/global/en' },
            { title: 'Información', href: '/https://www.blizzard.com/es-es/company/about/' },
            { title: 'Asistencia', href: '/https://us.support.blizzard.com/es/' },
            { title: 'Contacto', href: '/https://www.blizzard.com/es-es/company/contact' },
            { title: 'Prensa', href: '/https://blizzard.gamespress.com/es-MX' },
            { title: 'API', href: '/https://community.developer.battle.net/' },
          ].map((item, index) => (
            <div key={index}>
              <a
                href={item.href}
                className="text-lg font-semibold text-white mb-4 block hover:text-blue-400 transition-colors"
              >
                {item.title}
              </a>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row md:items-start md:space-x-6">
            <div className="flex-shrink-0 mb-4 md:mb-0">
              <img src="/blizz-ent.png" alt="Blizzard" className="w-30 h-20" />
            </div>

            <div>
              <p className="text-gray-400 text-sm mb-4">
                ©2025 Blizzard Entertainment, Inc.<br />
                Todas las marcas comerciales a las que se hace referencia son propiedad de sus respectivos dueños.
              </p>

              <div className="flex flex-wrap gap-6 mb-6">
                {[
                  { 
                    text: 'Aviso de Privacidad', 
                    href: 'https://agreementservice.svs.nike.com/rest/agreement?agreementType=privacyPolicy&uxId=default&country=MX&language=es&requestType=redirect' 
                  },
                  { 
                    text: 'Términos y Condiciones', 
                    href: 'https://www.blizzard.com/es-es/legal/c1ba3893-f3d0-46fc-8d67-0c4750812a0d/terminos-de-uso' 
                  }
                ].map((link) => (
                  <a 
                    key={link.text}
                    href={link.href}
                    target="_blank"              
                    rel="noopener noreferrer"     
                    className="text-gray-300 hover:text-white transition-colors text-lg font-medium border-b border-transparent hover:border-white transition-all"
                  >
                    {link.text}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 my-8"></div>

          <div className="flex items-start space-x-6">
            <div className="flex flex-col items-center space-y-2">
              <img src="/PCG.png" alt="PCG" className="w-12 h-auto" />
              <img src="/teen.png" alt="ESRB Teen" className="w-12 h-auto" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="text-gray-400 text-sm space-y-2">
                  <p><strong>Derramamiento de</strong></p>
                  <p><strong>Sangre</strong></p>
                  <ul className="list-disc list-inside space-y-1 ml-2">
                    <p>Humor vulgar</p>
                    <p>Lenguaje (moderado)</p>
                    <p>Temáticas insinuantes</p>
                    <p>Uso de alcohol y tabaco</p>
                    <p>Violencia</p>
                  </ul>
                </div>
              </div>

              <div>
                <p className="text-gray-400 text-sm">Compras dentro del juego</p>
                <p className="text-gray-500 text-xs mt-2">Interacción con los usuarios</p>
              </div>
            </div>
          </div>
        </div>
        </div>
    </footer>
  );
};

export default Footer;