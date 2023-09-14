import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import 'bulma/css/bulma.min.css';
import App from './App.tsx';
import store from './redux/store.ts';
import 'dayjs/locale/pt-br';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
);
