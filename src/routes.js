"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const user_registration_controller_1 = require("./controller/auth/user.registration.controller");
const user_authentication_controller_1 = require("./controller/auth/user.authentication.controller");
const routes = (router) => {
    /*
    *   Authentication end-points
    */
    router.post('/api/register', user_registration_controller_1.Register);
    router.post('/api/login', user_authentication_controller_1.Login);
    router.get('/api/user', user_authentication_controller_1.AuthenticatedUser);
    router.post('/api/logout', user_authentication_controller_1.Logout);
    router.get('/api/testapi', user_authentication_controller_1.TestAPI);
    router.get('/api/testapi1', user_authentication_controller_1.TestAPI1);
    router.get('/api/demodeployment', user_authentication_controller_1.TestAPI2);
};
exports.routes = routes;
//# sourceMappingURL=routes.js.map