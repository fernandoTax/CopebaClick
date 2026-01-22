import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronUp,
  Facebook,
  Instagram,
  Globe
} from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const agencies = [
    {
      name: 'Agencia Central',
      location: 'Aldea Barraneché, Totonicapán',
      phone: '5181-5595'
    },
    {
      name: 'Agencia La Esperanza',
      location: 'Aldea La Esperanza, Totonicapán',
      phone: '3137-1426'
    },
    {
      name: 'Agencia Chimente',
      location: 'Aldea Chimente, Totonicapán',
      phone: '3958-3326'
    },
    {
      name: 'Agencia Totonicapán',
      location: 'Municipio y Departamento de Totonicapán',
      phone: '3180-8494'
    },
    {
      name: 'Agencia San Rafael Pie de la Cuesta',
      location: 'San Marcos',
      phone: '3760-7407'
    },
    {
      name: 'Agencia La Concordia',
      location: 'Aldea La Concordia, Totonicapán',
      phone: '3866-0666'
    },
    {
      name: 'Agencia San Pedro Soloma',
      location: 'Municipio y Departamento de Huehuetenango',
      phone: '4893-0571'
    }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-b from-[#0f2f1f] to-[#0b2418] text-[#c7d3cc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">

          {/* Identidad */}
          <div className="space-y-4">
            <img
              src="/COPEBA 1.png"
              alt="COPEBA Logo"
              className="h-24 object-contain"
            />
            <h3 className="text-xl font-bold text-[#f1f5f3]">COPEBA R.L.</h3>
            <p className="text-sm leading-relaxed">
              Cooperativa de Ahorro y Crédito
            </p>
            <p className="text-sm leading-relaxed">
              Promover el desarrollo de sus asociados mediante la prestación de servicios financieros de manera oportuna y de calidad, con equidad de genero y étnica.
            </p>
             
          </div>

          {/* Agencias */}
          <div>
            <h3 className="text-lg font-bold text-[#f1f5f3] flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#2fbf71]" />
              Agencias y Ubicaciones
            </h3>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-2 custom-scrollbar">
              {agencies.map((agency, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg hover:bg-white/5 transition-colors"
                >
                  <p className="text-sm font-semibold text-[#f1f5f3]">
                    {agency.name}
                  </p>

                  <p className="text-xs mt-1 flex items-start gap-1">
                    <MapPin className="w-3 h-3 mt-0.5 text-[#2fbf71]" />
                    {agency.location}
                  </p>

                  {agency.phone && (
                    <a
                      href={`tel:+502${agency.phone.replace('-', '')}`}
                      className="mt-1 text-xs flex items-center gap-1 text-[#c7d3cc] hover:text-[#2fbf71] transition-colors"
                    >
                      <Phone className="w-3 h-3 text-[#2fbf71]" />
                      (502) {agency.phone}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-lg font-bold text-[#f1f5f3] flex items-center gap-2 mb-4">
              <Phone className="w-5 h-5 text-[#2fbf71]" />
              Contacto
            </h3>

            <div className="space-y-4 text-sm">
              <div>
                <p className="text-xs opacity-70">PBX</p>
                <a
                  href="tel:+50279631100"
                  className="font-semibold text-[#f1f5f3] hover:text-[#2fbf71]"
                >
                  (502) 7963-1100
                </a>
              </div>

              <div>
                <p className="text-xs opacity-70">Correo</p>
                <a
                  href="mailto:info@copeba.com.gt"
                  className="font-semibold text-[#f1f5f3] hover:text-[#2fbf71] break-all"
                >
                  info@copeba.com.gt
                </a>
              </div>

              <div>
                <p className="text-xs opacity-70">Horario</p>
                <p className="text-[#f1f5f3] font-semibold">Lunes a Viernes</p>
                <p className="text-xs">8:00 AM – 5:00 PM</p>
                <p className="text-[#f1f5f3] font-semibold mt-2">Sábado y Domingo</p>
                <p className="text-xs">8:00 AM – 12:00 PM</p>
              </div>

              {/* Redes */}
              <div className="flex gap-3 pt-2">
                <a
                  href="https://www.facebook.com/share/1Byf6k9qCp/?mibextid=wwXIfr"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook COPEBA"
                  className="social-btn hover:bg-[#1877F2]"
                >
                  <Facebook className="w-4 h-4" />
                </a>

                <a
                  href="https://www.instagram.com/copeba_rl?igsh=MWdycjR1ejU0aWQxbA=="
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram COPEBA"
                  className="social-btn hover:bg-[#E1306C]"
                >
                  <Instagram className="w-4 h-4" />
                </a>

                <a
                  href="https://copeba.com.gt/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Sitio web COPEBA"
                  className="social-btn hover:bg-[#2fbf71]"
                >
                  <Globe className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Footer bottom */}
        <div className="border-t border-slate-800 mt-12 pt-8">
        <div className="flex justify-center items-center">
          <p className="text-sm text-gray-400 text-center">
            © {currentYear} COPEBA R.L. - Cooperativa de Ahorro y Crédito. Todos los derechos reservados.
          </p>

          {/* Botón opcional */}
          {/*
          <button
            onClick={scrollToTop}
            className="flex items-center gap-2 bg-[#123b28] hover:bg-[#2fbf71] text-[#f1f5f3] px-4 py-2 rounded-lg transition"
          >
            Volver arriba <ChevronUp className="w-4 h-4" />
          </button>
          */}
        </div>
      </div>
     </div>
      <style>{`
        .social-btn {
          background: rgba(255,255,255,0.08);
          padding: 0.6rem;
          border-radius: 0.5rem;
          color: #f1f5f3;
          transition: all .2s;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(47, 191, 113, 0.6);
          border-radius: 3px;
        }
      `}</style>
    </footer>
  );
}

