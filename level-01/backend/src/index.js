const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

const app = express();

const port = 3333;
const url = 'localhost';

app.use(cors());
app.use(express.json()); // need to be before all routes 

const projects = [];

//middleware
function logRequests (req, res, next) {
  const {method, url } = req;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(logLabel);

  return next();
}

function validateProjectId(req, res, next ) {
  const {id} = req.params;

  if(!isUuid(id)){
    return res.status(400).json({ error: 'Invalid project Id!'});
  }

  return next();
}
// applay middleware
app.use(logRequests); //1st
// app.get('/', middleware, (req,res)) // 2nd
app.use('/projects/:id', validateProjectId); //3th

app.get('/projects', (req, res) => {
  const {title} = req.query;

  const results = title 
  ? projects.filter(project => project.title.includes(title))
  : projects;

  return res.json(results);
});

app.post('/projects', (req,res) => {

  const {title, owner} = req.body; // need to be equal 

  const project = { id: uuid(), title, owner }; 

  projects.push(project);

  return res.json(project);
}); 
 // : -> route params
app.put('/projects/:id', validateProjectId, (req,res) => {
  const { id } = req.params;
  const { title, owner} = req.body;

  const projectIndex = projects.findIndex(project => project.id == id );

  if ( projectIndex < 0) {
    return res.status(400).json({ error: 'Project not found!' });
  }

  const project = {
    id,
    title,
    owner,
  };

  projects[projectIndex] = project;

  return res.json(project);
}); 

app.delete('/projects/:id', validateProjectId, (req,res) => {
  const {id} = req.params;

  const projectIndex = projects.findIndex(project => project.id == id);

  if ( projectIndex < 0) {
    return res.status(400).json({ error: "Project can't delete, becouse id project not found"});
  }
  
  projects.splice(projectIndex, 1);

  return res.status(204).send();
}); 


app.listen(port, () => {
  console.log( ` server is running: http://${url}:${port}`);
});