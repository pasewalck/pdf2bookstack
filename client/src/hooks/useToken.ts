import { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';

export const useToken = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [bookUrl, setBookUrl] = useState<string | null>(null);
  const [exp, setExp] = useState<number | null>(null);
  const expireTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearExpireTimer = useCallback(() => {
    if (expireTimerRef.current) {
      clearTimeout(expireTimerRef.current);
      expireTimerRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => clearExpireTimer();
  }, [clearExpireTimer]);

  const verifyToken = useCallback(async (tokenToVerify: string) => {
    setIsVerifying(true);
    const apiUrl = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:3001';
    try {
      const response = await axios.get(`${apiUrl}/api/verify`, {
        headers: {
          'Authorization': `Bearer ${tokenToVerify}`
        }
      });
      setIsValid(true);
      setBookUrl(response.data.bookUrl || null);
      if (response.data.exp) {
        setExp(response.data.exp);
        clearExpireTimer();
        const now = Date.now();
        const expMs = response.data.exp * 1000;
        const timeUntilExpiry = expMs - now;
        if (timeUntilExpiry > 0) {
          expireTimerRef.current = setTimeout(() => {
            setIsValid(false);
          }, timeUntilExpiry);
        } else {
          setIsValid(false);
        }
      }
    } catch (err) {
      console.error('Token verification failed:', err);
      setIsValid(false);
    } finally {
      setIsVerifying(false);
    }
  }, [clearExpireTimer]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tokenParam = params.get('token');

    if (tokenParam) {
      setToken(tokenParam);
      verifyToken(tokenParam);
    }
  }, [verifyToken]);

  return { token, isValid, isVerifying, bookUrl, exp };
};
