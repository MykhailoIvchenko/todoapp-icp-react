import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { InternetIdentityProvider } from 'ic-use-internet-identity';
import './assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <InternetIdentityProvider>
      <App />
    </InternetIdentityProvider>
  </Provider>
  // </React.StrictMode>
);
