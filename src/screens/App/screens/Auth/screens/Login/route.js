import React from 'react'
import { routeConstants } from 'shared/constants'
const Login = React.lazy(() => import('./'))

const loginRoute = {
    path: routeConstants.AUTH.subRoutes.LOGIN.route,
    component: Login,
}

export default loginRoute;