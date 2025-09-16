import { Router } from 'express';

import todosApi from './api/todosApi.js';
import usersApi from './api/usersApi.js';

export default (function () {

    const router = Router();


    // Todos api routes
    router.use('/', todosApi);

    //Users
    router.use("/", usersApi);

    return router;

})();
