import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { guatemalaData, loanAmounts, loanPurposes, incomeSources, contactMethods, agencies } from '../data/guatemala';
import { CheckCircle, Loader2, X } from 'lucide-react';

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
          <div className="px-4 py-4" style={{ backgroundColor: 'rgba(244, 244, 244, 1)' }}>
              <div className="flex justify-center">
                      <img 
                          src="/Copebaclick.jpg" 
                          alt="COPEBA CLICK" 
                          className="h-19 object-contain bg-white rounded-2xl overflow-hidden "
                        />
                    </div>
            <p className="text-black/70 text-center">Complete el formulario y nos pondremos en contacto con usted</p>
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre *
                </label>
                <input
                  type="text"
                  id="firstName"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                  style={{ focusOutline: 'none' }}
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
            
            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-4 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: loading ? '#6b7280' : '#009900' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Enviando...
                </>
              ) : (
                'Enviar Solicitud'
              )}
            </button>

            <p className="text-sm text-gray-500 text-center">
              * Todos los campos son obligatorios
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
