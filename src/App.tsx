import { useState, useEffect } from 'react';
import { supabase } from './lib/supabase';
import LoanApplicationForm from './components/LoanApplicationForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';

function App() {
  const [view, setView] = useState<'form' | 'admin-login' | 'admin-dashboard'>('form');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    checkAuthStatus();
    handleRouting();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (event === 'SIGNED_IN' && session) {
          const { data: adminData } = await supabase
            .from('admin_users')
            .select('id')
            .eq('id', session.user.id)
            .maybeSingle();

          if (adminData) {
            setIsAuthenticated(true);
            setView('admin-dashboard');
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setView('form');
        }
      })();
    });

    const handlePopState = () => {
      handleRouting();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      authListener?.subscription.unsubscribe();
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  const handleRouting = () => {
    const path = window.location.pathname;
    if (path === '/admin') {
      setView('admin-login');
    } else {
      setView('form');
    }
  };

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (adminData) {
        setIsAuthenticated(true);
        setView('admin-dashboard');
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin-dashboard');
    window.history.pushState({}, '', '/admin');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('form');
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="min-h-screen">
      {view === 'form' && <LoanApplicationForm />}

      {view === 'admin-login' && (
        <AdminLogin onLoginSuccess={handleLoginSuccess} />
      )}

      {view === 'admin-dashboard' && isAuthenticated && (
        <AdminDashboard onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
