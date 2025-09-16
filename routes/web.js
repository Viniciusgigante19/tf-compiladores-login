import { Router } from 'express';
import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';


import ListPublicFilesController from '../app/Http/Controllers/ListPublicFilesController.js';
import swaggerGenerate from '../Core/SwaggerCore/swaggerGenerate.js';

export default (function () {

    const router = Router();

    /** Servir o public estaticamente, tanto para arquivos como para os assets de frontend */
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.use(express.static(path.join(CONSTANTS.DIR, 'public')));

    // Rota para listar arquivos na pasta 'public'
    // NÃO SERÁ CHAMADO CASO TENHA A CAMADA DE NGINX COM ARQUIVOS ESTÁTICOS
    router.get('/', ListPublicFilesController);

    // Documentação Swagger
    router.use('/docs', swaggerUi.serve, swaggerGenerate);

    return router;

})();
