import React from 'react';

import GlobalStyle from './styles/global';
// import SingIn from "./pages/SignIn";
import SingIn from './pages/SignIn';

import { AuthProvider } from './context/AuthContext';

const App: React.FC = () => (
  <>
    <AuthProvider>
      <SingIn />
    </AuthProvider>

    <GlobalStyle />
  </>
);

export default App;
