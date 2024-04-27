/* 
  An array of routes that are accessible in the application.
  Each route has a path, a component and a name.
  @type {string[]}
*/

export const publicRoutes = ["/signin"];

/* 
  An array of routes that are used for authentication.
  These routes will redirect logged in user to /settings
  @type {string[]}
*/
export const authRoutes = ["/signin", "/register"];

/* 
  The prefix for API authentication routes
  Routes that start with this prefix are used for API authentication
  purposes.
  @type {string}
*/
export const apiAuthPrefix = "/api/auth";

/* 
  The default redirect path after a successful login
  @type {string}
*/
export const DEFAULT_LOGIN_REDIRECT = "/";
