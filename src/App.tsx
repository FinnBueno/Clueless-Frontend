import React from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { ThemeProvider } from 'emotion-theming';
import { ToastContainer } from 'react-toastify';
import { Login } from './pages/login';
import { theme, GlobalStyle } from './util/theme';
import { AuthProvider } from './firebase';
import { AuthenticatedRoute, UnauthenticatedRoute } from './auth';
import { Game } from './pages/game/game';
import 'react-toastify/dist/ReactToastify.min.css';
import { SettingsProvider } from './hooks/settings';

const App: React.FC = () => (
	<Router>
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<ToastContainer />
			<AuthProvider>
				<SettingsProvider>
					<Switch>
						<AuthenticatedRoute component={Game} path='/game' />
						<UnauthenticatedRoute component={Login} path='/' />
					</Switch>
				</SettingsProvider>
			</AuthProvider>
		</ThemeProvider>
	</Router>
);

export default App;
