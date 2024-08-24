import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store.js';

import router from './router';
import './index.css';
import '../bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
