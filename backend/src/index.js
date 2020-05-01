const express = require('express');
const cors = require('cors');
const {uuid, isUuid} = require('uuidv4');
/*
o express gerencia as rotas da aplicação
*/
const app = express();
//para statar yarn dev
app.use(express.json());
app.use(cors()); // permite que o front-end acesse os recursos

const projects = [];

//middleware
function logRequests(request, response, next) {
  const { method, url} = request;
  //da um console na requisição que foi realizada
  const logLabel = `[${method.toUpperCase()}] ${url}`;
  console.time(logLabel);
   next();
  console.timeEnd(logLabel);
}

function validateProjectId(request, response, next) {
    const { id } = request.params;
    //middleware para validar o Id
    if(!isUuid(id)) {
      return response.status(400).json({error: "Invalid project ID."});
    }
    return next();
}

app.use(logRequests);
app.use('/projects/:id', validateProjectId);

app.get('/projects', (request, response) => {
  const {title} = request.query;
  //função de listagem, que é passado um filtro pela requisição
  const results = title 
    ? projects.filter(project => project.title.includes(title))
    : projects; 

  return response.json(results);
});

app.post('/projects', (request, response) =>{
  //cadastro de um novo projeto utilizando o uuid para gerar um id
  const {title, owner} = request.body;
  const project = { id: uuid(), title, owner};
  projects.push(project);
  return response.json(project);
});

app.put('/projects/:id' ,(request, response) =>{
  //atualizando o projeto
  const {id} = request.params;
  const {title, owner} = request.body;
  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0){
    return response.status(400).json({error: "Project not found"});
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id',(request, response) =>{
  //deleta item do projects
  const {id} = request.params;
  const projectIndex = projects.findIndex(project => project.id === id);
  if(projectIndex < 0){
    return response.status(400).json({error: "Project not found"});
  }
  projects.splice(projectIndex, 1);
  return response.status(204).send();
});

app.listen(3333, () => {
  console.log('🚀 Back-end started!');
}); //porta