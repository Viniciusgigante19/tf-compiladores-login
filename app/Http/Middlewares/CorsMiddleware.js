export default (request, response, next) => {
    response.header("Access-Control-Allow-Origin", "*");
    response.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    response.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

    // Navegadores mandam uma requisição OPTIONS antes de POST/PUT/DELETE
    if (request.method === "OPTIONS") {
        return response.sendStatus(200);
    }

    return next();
};
