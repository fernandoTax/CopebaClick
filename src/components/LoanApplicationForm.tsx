import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { PhoneCall } from 'lucide-react';
  import { useEffect } from 'react';
import { guatemalaData, loanAmounts, loanPurposes, incomeSources, contactMethods, agencies } from '../data/guatemala';
import { CheckCircle, Loader2, Shield, Clock, MapPin, MessageCircle } from 'lucide-react';

export default function LoanApplicationForm() {
  const [formData, setFormData] = useState({
     firstName: '',
    lastName: '',
    phone: '',
    department: '',
    municipality: '',
    loanAmount: '',
    loanPurpose: '',
    incomeSource: '',
    contactMethod: '',
    nearestAgency: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [showWhatsApp, setShowWhatsApp] = useState(false);

useEffect(() => {
  const handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;

    // Ajusta este valor según qué tan cerca del footer lo quieres
    const offsetFromBottom = 1000;

    if (scrollTop + windowHeight >= documentHeight - offsetFromBottom) {
      setShowWhatsApp(true);
    } else {
      setShowWhatsApp(false);
    }
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

  const departments = Object.keys(guatemalaData);
  const municipalities = formData.department ? guatemalaData[formData.department] : [];

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

     try {
      const { error: submitError } = await supabase
        .from('loan_applications')
        .insert([
          {
            first_name: formData.firstName,
            last_name: formData.lastName,
            phone: formData.phone,
            department: formData.department,
            municipality: formData.municipality,
            loan_amount: formData.loanAmount,
            loan_purpose: formData.loanPurpose,
            income_source: formData.incomeSource,
            contact_method: formData.contactMethod,
            nearest_agency: formData.nearestAgency || null
          }
        ]);

      if (submitError) {
        console.error('Supabase error:', submitError);
        setError(submitError.message || 'Error al enviar la solicitud. Por favor intente nuevamente.');
        setLoading(false);
        return;
      }

      setSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        phone: '',
        department: '',
        municipality: '',
        loanAmount: '',
        loanPurpose: '',
        incomeSource: '',
        contactMethod: '',
        nearestAgency: ''
      });

      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Error submitting application:', err);
      const errorMessage = err instanceof Error ? err.message : 'Error al enviar la solicitud. Por favor intente nuevamente.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleDepartmentChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      department: value,
      municipality: ''
    }));
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
  
    <div 
      className="min-h-screen w-full relative overflow-hidden flex items-center justify-center"
      style={{ 
      backgroundImage: 'url("/fondo.jpg")',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
      <div className="max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-t-4" style={{ borderColor: '#047208ff' }}>
          <div className="px-4 py-4" style={{ backgroundColor: 'rgb(245, 245, 245)' }}>
              <div className="flex justify-center">
                      <img 
                          src="/Copebaclick.jpg" 
                          alt="COPEBA CLICK" 
                          className="h-19 object-contain bg-white rounded-2xl overflow-hidden "
                        />
                    </div>
            <div className="mt-4 text-center">
            
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {success && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-8 text-center animate-pulse">
                  <div className="flex justify-center mb-6">
                    <CheckCircle className="w-16 h-16 text-green-500" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">¡Solicitud Enviada!</h2>
                  <p className="text-gray-600 mb-2">Sus datos fueron registrados exitosamente</p>
                  <p className="text-sm text-gray-500 mb-6">Nos pondremos en contacto con usted pronto</p>
                  <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-800">Número de solicitud:</p> 
                    <p className="text-lg font-bold text-green-700 mt-1">{Math.random().toString(36).substring(2, 10).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
        <div className="space-y-6">
              <div className="border-l-4 border-[#009900] pl-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Datos Personales</h2>
                <p className="text-sm text-gray-600">Información básica del solicitante</p>
              </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombres*
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                  style={{focusOutline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#009900'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Ingrese su nombre"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                  Apellidos *
                </label>
                <input
                  type="text"
                  id="lastName"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                  style={{ focusOutline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#009900'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                  placeholder="Ingrese sus apellidos"
                />
              </div>
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Teléfono *
              </label>
              <input
                type="tel"
                id="phone"
                required
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
                placeholder="Ej: 5555-5555"
              />
            </div>
          </div>

          <div className="space-y-6">
              <div className="border-l-4 border-[#011c6b] pl-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Ubicación</h2>
                <p className="text-sm text-gray-600">¿Dónde reside actualmente?</p>
              </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="department" className="block text-sm font-medium text-gray-700 mb-2">
                  Departamento *
                </label>
                <select
                  id="department"
                  required
                  value={formData.department}
                  onChange={(e) => handleDepartmentChange(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                  style={{ focusOutline: 'none' }}
                  onFocus={(e) => e.target.style.borderColor = '#009900'}
                  onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                >
                  <option value="">Seleccione un departamento</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="municipality" className="block text-sm font-medium text-gray-700 mb-2">
                  Municipio *
                </label>
                <select
                  id="municipality"
                  required
                  value={formData.municipality}
                  onChange={(e) => setFormData(prev => ({ ...prev, municipality: e.target.value }))}
                  disabled={!formData.department}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                >
                  <option value="">Seleccione un municipio</option>
                  {municipalities.map(muni => (
                    <option key={muni} value={muni}>{muni}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
          </div>
            
          <div className="space-y-6">
              <div className="border-l-4 border-[#009900] pl-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Información del Crédito</h2>
                <p className="text-sm text-gray-600">Detalles sobre el préstamo solicitado</p>
              </div>  

              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Monto del préstamo *
              </label>
              <select
                id="loanAmount"
                required
                value={formData.loanAmount}
                onChange={(e) => setFormData(prev => ({ ...prev, loanAmount: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option value="">Seleccione el monto</option>
                {loanAmounts.map(amount => (
                  <option key={amount} value={amount}>{amount}</option>
                ))}
              </select>
            </div>

          <div>
              <label htmlFor="loanPurpose" className="block text-sm font-medium text-gray-700 mb-2">
                ¿En qué tiene pensado utilizar el crédito? *
              </label>
              <select
                id="loanPurpose"
                required
                value={formData.loanPurpose}
                onChange={(e) => setFormData(prev => ({ ...prev, loanPurpose: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option value="">Seleccione una opción</option>
                {loanPurposes.map(purpose => (
                  <option key={purpose} value={purpose}>{purpose}</option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="incomeSource" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo obtiene sus ingresos? *
              </label>
              <select
                id="incomeSource"
                required
                value={formData.incomeSource}
                onChange={(e) => setFormData(prev => ({ ...prev, incomeSource: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option value="">Seleccione una opción</option>
                {incomeSources.map(source => (
                  <option key={source} value={source}>{source}</option>
                ))}
              </select>
            </div>
       </div> 
       <div className="space-y-6">
              <div className="border-l-4 border-[#011c6b] pl-4">
                <h2 className="text-lg sm:text-xl font-bold text-gray-900 mb-1">Preferencias de Contacto</h2>
                <p className="text-sm text-gray-600">¿Cómo desea que nos comuniquemos con usted?</p>
              </div>
        
            <div>
              <label htmlFor="contactMethod" className="block text-sm font-medium text-gray-700 mb-2">
                ¿Cómo quiere que le contactemos? *
              </label>
              <select
                id="contactMethod"
                required
                value={formData.contactMethod}
                onChange={(e) => setFormData(prev => ({ ...prev, contactMethod: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option value="">Seleccione una opción</option>
                {contactMethods.map(method => (
                  <option key={method} value={method}>{method}</option>
                ))}
              </select>
            </div>
        <div>
              <label htmlFor="nearestAgency" className="block text-sm font-medium text-red-700 mb-2">
                Agencia más cercana (Opcional)
              </label>
              <select
                id="nearestAgency"
                value={formData.nearestAgency}
                onChange={(e) => setFormData(prev => ({ ...prev, nearestAgency: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition"
              >
                <option value="">Seleccione su agencia más cercana</option>
                {agencies.map(agency => (
                  <option key={agency} value={agency}>{agency}</option>
                ))}
              </select>
            </div>
        </div> 

          <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#009900] to-[#00b300] hover:from-[#00b300] hover:to-[#009900] text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-gray-500 disabled:hover:to-gray-500 transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-3 text-base sm:text-lg"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Enviando solicitud...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  <span>Enviar Solicitud</span>
                </>
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              * Todos los campos son obligatorios
            </p>
          </form>
        </div>
      </div>
      {showWhatsApp && (
  <button
    onClick={() => window.open('https://wa.me/50251815595', '_blank')}
    aria-label="Contactar por WhatsApp"
    className="
      fixed bottom-6 right-6 z-50
      bg-[#25D366]
      text-white
      p-4
      rounded-full
      shadow-[0_8px_30px_rgba(37,211,102,0.45)]
      hover:bg-[#1EBE5D]
      hover:shadow-[0_12px_40px_rgba(37,211,102,0.65)]
      transition-all duration-300 ease-out
      transform hover:scale-110 active:scale-95
      group
    "
  >
    {/* Halo / pulso */}
    <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-30 animate-ping"></span>

    {/* Icono */}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      className="relative w-7 h-7 fill-current"
      aria-hidden="true"
    >
      <path d="M16.002 2.003c-7.73 0-14 6.27-14 14 0 2.467.647 4.876 1.877 6.999L2 30l7.178-1.848A13.9 13.9 0 0 0 16 30c7.73 0 14-6.27 14-14s-6.27-13.997-13.998-13.997zm8.104 19.514c-.34.959-1.685 1.857-2.805 2.105-.767.168-1.774.299-5.776-1.246-5.115-1.99-8.418-7.275-8.674-7.614-.255-.34-2.067-2.752-2.067-5.25 0-2.497 1.318-3.727 1.785-4.24.466-.51.998-.638 1.33-.638.34 0 .68 0 .977.014.314.014.735-.12 1.15.88.425 1.02 1.45 3.528 1.58 3.78.127.255.212.553.042.892-.17.34-.255.553-.51.85-.256.297-.536.663-.765.89-.256.255-.51.536-.22 1.064.297.51 1.33 2.195 2.857 3.556 1.965 1.75 3.63 2.29 4.14 2.545.51.255.807.212 1.107-.128.297-.34 1.276-1.49 1.616-2.002.34-.51.68-.425 1.15-.255.466.17 2.97 1.403 3.477 1.658.51.255.85.382.977.595.128.212.128 1.235-.212 2.195z" />
    </svg>

    {/* Tooltip */}
    <span
      className="
        absolute right-full mr-3 top-1/2 -translate-y-1/2
        bg-gray-900 text-white text-sm
        px-4 py-2 rounded-lg
        opacity-0 translate-x-2
        group-hover:opacity-100 group-hover:translate-x-0
        transition-all duration-300
        pointer-events-none
        whitespace-nowrap
      "
    >
      💬 Chatea con nosotros
    </span>
  </button>
)}

    </div>
  );
}
