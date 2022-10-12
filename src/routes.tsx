import React from 'react';
import { useAuth } from './contexts/auth';

import Login from './Login';
import Home from './Home';

const Routes: React.FC = () => {
  const { signed } = useAuth();

  return signed ? <Home /> : <Login />;
};

export default Routes;