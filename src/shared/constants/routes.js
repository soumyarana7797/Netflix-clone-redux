export default Object.freeze({
  HOME: {
    name: 'Home',
    route: '/home',
    protected: false,
  },
  ERROR: {
    name: 'Error',
    route: '/error',
  },
  AUTH: {
    name: 'Auth',
    route: '/auth',
    protected: false,
    subRoutes: {
      REGISTRATION: {
        name: 'Registration',
        route: '/auth/registration',
      },
      LOGIN: {
        name: 'Login',
        route: '/auth/login',
      },
    },
  },
});
