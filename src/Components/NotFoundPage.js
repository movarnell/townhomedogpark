import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function NotFoundPage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/');
  }, [navigate]);

  return <div>Page not found. Redirecting to main page...</div>;
}