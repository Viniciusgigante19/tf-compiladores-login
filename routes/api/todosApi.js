import { Router } from 'express';
import ListController from '../../app/Http/Controllers/TodosApi/ListController.js';
import InsertController from '../../app/Http/Controllers/TodosApi/CreateController.js';
import UpdateController from '../../app/Http/Controllers/TodosApi/UpdateController.js';
import GetController from '../../app/Http/Controllers/TodosApi/GetController.js';
import DeleteController from '../../app/Http/Controllers/TodosApi/DeleteController.js';

export default (function () {

    const router = Router();


    router.get('/todos', ListController);

    // GET Obter 1
    router.get('/todos/:id', GetController);

    // POST Inserir
    router.post('/todos', InsertController);

    // PUT Atualizar
    router.put('/todos/:id', UpdateController);

    // Delete Excluir
    router.delete('/todos/:id', DeleteController);

    return router;

})();