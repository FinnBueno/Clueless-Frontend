import React from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { useAuth } from 'src/firebase';

export const AuthenticatedRoute: React.FC<AuthenticatedRouteProps> = (props) => {
	const { game } = useAuth();

	return game ? (
		<Route
			path={props.path}
			component={props.component}
		/>
	) : (
		<Redirect to='/' />
	);
};

interface AuthenticatedRouteProps {
	path: string;
	component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}
