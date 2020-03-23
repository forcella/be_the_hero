const express = require(`express`);

const app = express();


app.get(`/`,(request,response) => {
    return response.json(
     {
        evento: `Semana oministack 11.0`,
        aluno: `Lucas Guerra`
     }
    );
})


app.listen(3333);