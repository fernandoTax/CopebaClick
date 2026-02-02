import { useEffect, useRef, useCallback } from 'react';
import { supabase } from '../lib/supabase';

const TIMEOUT_DURATION = 5 * 60 * 1000;
const WARNING_DURATION = 1 * 60 * 1000;

export function useSessionTimeout(onTimeout: () => void) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const warningRef = useRef<NodeJS.Timeout | null>(null);
  const lastActivityRef = useRef<number>(Date.now());

  const clearTimers = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    if (warningRef.current) {
      clearTimeout(warningRef.current);
      warningRef.current = null;
    }
  }, []);

  const logout = useCallback(async () => {
    clearTimers();
    await supabase.auth.signOut();
    onTimeout();
  }, [clearTimers, onTimeout]);

  const showWarning = useCallback(() => {
    const shouldContinue = confirm(
      '⚠️ Su sesión expirará en 1 minuto por inactividad.\n\n¿Desea continuar trabajando?'
    );

    if (shouldContinue) {
      resetTimer();
    } else {
      logout();
    }
  }, [logout]);

  const resetTimer = useCallback(() => {
    clearTimers();
    lastActivityRef.current = Date.now();

    warningRef.current = setTimeout(() => {
      showWarning();
    }, TIMEOUT_DURATION - WARNING_DURATION);

    timeoutRef.current = setTimeout(() => {
      logout();
    }, TIMEOUT_DURATION);
  }, [clearTimers, showWarning, logout]);

  const handleActivity = useCallback(() => {
    const now = Date.now();
    if (now - lastActivityRef.current > 1000) {
      resetTimer();
    }
  }, [resetTimer]);

  useEffect(() => {
    resetTimer();

    const events = ['mousedown', 'keydown', 'scroll', 'touchstart', 'click'];
    events.forEach(event => {
      window.addEventListener(event, handleActivity);
    });

    return () => {
      clearTimers();
      events.forEach(event => {
        window.removeEventListener(event, handleActivity);
      });
    };
  }, [resetTimer, handleActivity, clearTimers]);

  return { resetTimer };
}
