// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RecoilRoot } from 'recoil';
import { UserProvider } from './contexts/userContext';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <UserProvider>
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </UserProvider>
  // </React.StrictMode>
);
