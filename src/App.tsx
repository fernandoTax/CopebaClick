import { useState, useEffect, useRef } from 'react';
import { supabase } from './lib/supabase';
import LoanApplicationForm from './components/LoanApplicationForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';

const ADMIN_PATH = '/566568-gestion-copeba-2026-244444231643lA=AF316AFAF589AF8972326-22AF1654=254AF5=239409146.';
const ADMIN_CHECK_INTERVAL = 5 * 60 * 1000;

function App() {
  const [view, setView] = useState<'form' | 'admin-login' | 'admin-dashboard'>('form');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const adminCheckIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkAuthStatus();
    handleRouting();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      (async () => {
        if (event === 'SIGNED_IN' && session) {
          const isAdmin = await verifyAdminStatus(session.user.id);
          if (isAdmin) {
            setIsAuthenticated(true);
            setView('admin-dashboard');
            startAdminVerification();
          } else {
            await supabase.auth.signOut();
            setIsAuthenticated(false);
            setView('form');
            window.history.pushState({}, '', '/');
          }
        } else if (event === 'SIGNED_OUT') {
          setIsAuthenticated(false);
          setView('form');
          stopAdminVerification();
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
      stopAdminVerification();
    };
  }, []);

  const verifyAdminStatus = async (userId: string): Promise<boolean> => {
    try {
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('id')
        .eq('id', userId)
        .maybeSingle();

      return !!adminData;
    } catch (error) {
      console.error('Error verifying admin status:', error);
      return false;
    }
  };

  const startAdminVerification = () => {
    stopAdminVerification();

    adminCheckIntervalRef.current = setInterval(async () => {
      const { data: { session } } = await supabase.auth.getSession();

      if (!session) {
        handleLogout();
        return;
      }

      const isAdmin = await verifyAdminStatus(session.user.id);
      if (!isAdmin) {
        await supabase.auth.signOut();
        handleLogout();
        alert('Su acceso de administrador ha sido revocado. Por favor contacte al administrador del sistema.');
      }
    }, ADMIN_CHECK_INTERVAL);
  };

  const stopAdminVerification = () => {
    if (adminCheckIntervalRef.current) {
      clearInterval(adminCheckIntervalRef.current);
      adminCheckIntervalRef.current = null;
    }
  };

  const handleRouting = () => {
    const path = window.location.pathname;
    if (path === ADMIN_PATH) {
      setView('admin-login');
    } else {
      if (view === 'admin-login' || view === 'admin-dashboard') {
        setView('form');
      }
    }
  };

  const checkAuthStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (session) {
      const isAdmin = await verifyAdminStatus(session.user.id);

      if (isAdmin && window.location.pathname === ADMIN_PATH) {
        setIsAuthenticated(true);
        setView('admin-dashboard');
        startAdminVerification();
      } else if (!isAdmin) {
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        setView('form');
      }
    } else {
      const path = window.location.pathname;
      if (path === ADMIN_PATH) {
        setView('admin-login');
      }
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setView('admin-dashboard');
    window.history.pushState({}, '', ADMIN_PATH);
    startAdminVerification();
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setView('form');
    stopAdminVerification();
    window.history.pushState({}, '', '/');
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow">
        {view === 'form' && <LoanApplicationForm />}

        {view === 'admin-login' && (
          <AdminLogin onLoginSuccess={handleLoginSuccess} />
        )}

        {view === 'admin-dashboard' && isAuthenticated && (
          <AdminDashboard onLogout={handleLogout} />
        )}
      </div>

      <Footer />
    </div>
  );
}

export default App;
