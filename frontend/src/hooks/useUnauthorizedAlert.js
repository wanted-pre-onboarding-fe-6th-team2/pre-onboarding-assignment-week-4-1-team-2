import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEYS } from '@/constants/localStorage';
import { ROUTES } from '@/constants/routes';

const useUnauthorizedAlert = () => {
  const [isShown, setIsShown] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasToken = !!localStorage.getItem(LOCAL_STORAGE_KEYS.ACCESS_TOKEN);

    setIsShown(!hasToken);
    if (hasToken) navigate(ROUTES.HOME);
  }, [navigate]);

  return [isShown];
};

export default useUnauthorizedAlert;
