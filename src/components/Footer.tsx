import { Facebook, Instagram, Globe, MessageCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-green-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-16">

        {/* CONTENIDO PRINCIPAL */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

          {/* SERVICIOS */}
          <div className="text-center md:text-left">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">
              SERVICIOS
            </h3>
            <ul className="space-y-3">
              {['Ahorros', 'Préstamos', 'Seguros', 'Remesas'].map(item => (
                <li key={item}>
                  <a
                    href="#"
                    className="hover:text-green-300 transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACTO */}
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">
              CONTACTO
            </h3>
            <div className="space-y-4">
              <p>
                <a
                  href="mailto:info@copeba.com.gt"
                  className="hover:text-green-300 transition-colors"
                >
                  info@copeba.com.gt
                </a>
              </p>
              <p className="text-lg font-medium">
                <a
                  href="tel:+50279631100"
                  className="hover:text-green-300 transition-colors"
                >
                  (502) 7963-1100
                </a>
              </p>
            </div>
          </div>

          {/* REDES SOCIALES */}
          <div className="text-center md:text-right">
            <h3 className="text-lg font-semibold text-white mb-6 tracking-wide">
              REDES SOCIALES
            </h3>
            <div className="flex justify-center md:justify-end gap-6">
              <a
                href="https://www.facebook.com/share/1Byf6k9qCp/?mibextid=wwXIfr"
                aria-label="Facebook"
                className="hover:text-green-300 transition-colors"
              >
                <Facebook size={26} />
              </a>
              <a
                href="https://www.instagram.com/copeba_rl"
                aria-label="Instagram"
                className="hover:text-green-300 transition-colors"
              >
                <Instagram size={26} />
              </a>
              <a
                href="https://copeba.com.gt/"
                aria-label="Sitio web"
                className="hover:text-green-300 transition-colors"
              >
                <Globe size={26} />
              </a>
              <a
                href="#"
                aria-label="WhatsApp"
                className="hover:text-green-300 transition-colors"
              >
                <MessageCircle size={26} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* FRANJA INFERIOR */}
      <div className="bg-green-900 border-t border-green-700 py-6">
        <p className="text-center text-sm text-gray-300">
          © COPEBA R.L. – Cooperativa de Ahorro y Crédito.  
          Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
