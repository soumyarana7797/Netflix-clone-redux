import { routeConstants } from 'shared/constants';
import Auth from './';
import loginRoute from './screens/Login/route';
import registrationRoute from './screens/Registration/route';

const authRoute = {
  path: routeConstants.AUTH.route,
  component: Auth,
  protected: routeConstants.AUTH.protected,
  routes: [loginRoute, registrationRoute],
};

export default authRoute;
