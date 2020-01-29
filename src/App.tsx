import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { Login } from './pages/login';
import { theme, GlobalStyle } from './util/theme';
import { AuthProvider } from './firebase';
import { AuthenticatedRoute, UnauthenticatedRoute } from './auth';
import { Game } from './pages/game/game';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

const App: React.FC = () => {
	return (
		<Router>
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<ToastContainer />
				<AuthProvider>
					<Switch>
						<AuthenticatedRoute component={Game} path='/game' />
						<UnauthenticatedRoute component={Login} path='/' />
					</Switch>
				</AuthProvider>
			</ThemeProvider>
		</Router>
	);
}

export default App;
