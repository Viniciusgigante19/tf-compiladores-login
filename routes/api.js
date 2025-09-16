import { Router } from 'express';

import usersApi from './api/usersApi.js';

export default (function () {

    const router = Router();



    //Users
    router.use("/", usersApi);

    return router;

})();
