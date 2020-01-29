import React, { useContext } from 'react';
import { Route, RouteComponentProps, Redirect } from 'react-router-dom';
import { AuthContext } from '../firebase/context';

export const UnauthenticatedRoute: React.FC<UnauthenticatedRouteProps> = (props) => {
    const { game } = useContext(AuthContext);

    return !game? (
        <Route
            path={props.path}
            component={props.component}
        />
    ) : (
        <Redirect to='/game' />
    );
};

interface UnauthenticatedRouteProps {
    path: string;
    component: React.ComponentType<RouteComponentProps<any>> | React.ComponentType<any>;
}