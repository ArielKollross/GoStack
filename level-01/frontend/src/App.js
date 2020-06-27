import React, { useState, useEffect } from 'react';
import api from './services/api' ;

import './App.css'

import Header from './components/Header';

function App() {
  const [projects, setProjects ] = useState([]);

  useEffect(() => {
    api.get('/projects').then( response => {
     setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    //projects.push(`new project ${Date.now()}`);
    //setProjects([...projects, `new project ${Date.now()}`]);
   const response = await api.post('/projects', {
      title:  `new project ${Date.now()}`,
      owner: "Dono do projeto"
    });
    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <> 
      <Header title="Projetcs" />
      <ul>
        {projects.map(project => <li key={project.id} >{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar</button>
    </>
    );
};

export default App; 