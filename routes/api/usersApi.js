import { Router } from 'express';
import VerifyImage from '../../app/Http/Middlewares/VerifyImage.js';
import ListController from '../../app/Http/Controllers/UsersApi/ListController.js';
import GetController from '../../app/Http/Controllers/UsersApi/GetController.js';
import CreateController from '../../app/Http/Controllers/UsersApi/CreateController.js';
import UpdateController from '../../app/Http/Controllers/UsersApi/UpdateController.js';
import DeleteController from '../../app/Http/Controllers/UsersApi/DeleteController.js';
import UploadPhotoController from '../../app/Http/Controllers/UsersApi/UploadPhotoController.js';

export default (function () {

    const router = Router();

    // GET Listar
    router.get('/users', ListController);

    // GET Obter
    router.get('/users/:id', GetController);

    // POST Inserir
    router.post('/users', CreateController);

    // PUT Atualizar
    router.put('/users/:id', UpdateController);

    // DELETE Excluir
    router.delete('/users/:id', DeleteController);


    router.post('/users/image', VerifyImage, UploadPhotoController);

    return router;

})();