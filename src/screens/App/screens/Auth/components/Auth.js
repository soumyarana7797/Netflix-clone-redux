import { Routes as Switch } from 'react-router-dom';
import { RouteWithSubRoutes } from 'shared/components';

const Auth = ({ routes }) => {
    return (
        <Switch>
            {routes.map((route, i) => (
                <RouteWithSubRoutes key={i} {...route} />
            ))}
        </Switch>
    )
}

export default Auth;