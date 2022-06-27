import {render} from 'react-dom';
import './css/index.css';
import App from './components/App.jsx';
import { BrowserRouter as Router } from 'react-router-dom';
import Auth0ProviderWithHistory from './auth/auth0-provider-with-history';


render(
  <Router>
    <Auth0ProviderWithHistory>
      <App />
    </Auth0ProviderWithHistory>
  </Router>,
  document.getElementById('root'),
);