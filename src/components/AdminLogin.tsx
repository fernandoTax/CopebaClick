import { useState, FormEvent } from 'react';
import { supabase } from '../lib/supabase';
import { Lock, Loader2 } from 'lucide-react';

interface AdminLoginProps {
  onLoginSuccess: () => void;
}

export default function AdminLogin({ onLoginSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (signInError) throw signInError;

      if (data.user) {
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('id')
          .eq('id', data.user.id)
          .maybeSingle();

        if (adminError) throw adminError;

        if (!adminData) {
          await supabase.auth.signOut();
          throw new Error('No tiene permisos de administrador');
        }

        onLoginSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ backgroundColor: '#f3f3f3ff' }}>
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4" style={{ borderColor: '#035210ff' }}>
          <div className="px-8 py-10" style={{ backgroundColor: '#ffffffff' }}>
            <div className="flex justify-center mb-6">
              <img
                src="/logocentro.png"
                alt="COPEBA"
                className="h-24 object-contain"
              />
            </div>
            <h1 className="text-2xl font-bold text-center mb-2 text-black">Panel de Administración</h1>
            <p className="text-center text-sm" style={{ color: '#121211ff' }}>Acceso restringido a personal autorizado</p>
          </div>

          <form onSubmit={handleLogin} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo electrónico
              </label>
              <input
                type="email"
                id="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                style={{ outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#011c6b'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="admin@ejemplo.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg transition"
                style={{ outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#011c6b'}
                onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{ backgroundColor: loading ? '#6b7280' : '#009900' }}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Iniciando sesión...
                </>
              ) : (
                'Iniciar Sesión'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
