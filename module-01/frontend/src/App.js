import React, { useState } from 'react';

import './App.css'
import backgroundImage from './assets/background.jpeg';

import Header from './components/Header';

function App() {
  const [projects, setProjects ] = useState(['projetc 1', 'project 2']);

  function handleAddProject() {
    //projects.push(`new project ${Date.now()}`);

    setProjects([...projects, `new project ${Date.now()}`]);

    console.log(projects)
  }

  return (
    <> 
      <Header title="Projetcs" />

      <img width={300} src={backgroundImage}/>

      <ul>
        {projects.map(project => <li key={project} >{project}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar</button>
    </>
    );
};

export default App; 