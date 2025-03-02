import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { InternetIdentityProvider } from 'ic-use-internet-identity';
import './assets/styles/index.scss';
import { ErrorBoundary } from 'react-error-boundary';
import FallBackPage from './components/FallbackPage';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <ErrorBoundary fallbackRender={FallBackPage}>
    <Provider store={store}>
      <InternetIdentityProvider>
        <App />
      </InternetIdentityProvider>
    </Provider>
  </ErrorBoundary>
  // </React.StrictMode>
);
