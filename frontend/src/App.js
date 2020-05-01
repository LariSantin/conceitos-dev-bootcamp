import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import api from './services/api';

import './App.css'
import backgroundImage from './assets/background.jpeg'

function App() {
  const [projects, setProjects] = useState([]);

  useEffect( () => {
    api.get('projects').then(response => { 
      setProjects(response.data);
    });
    //o parametro é a rota 
  }, [])

  async function handleAddProject() {
    // setProjects([...projects,`Novo Projeto ${Date.now()}`]);

    const response = await api.post('projects', {
                                          title: `Novo Projeto ${Date.now()}`,
                                          owner: "Diego fernandes"
                                      });
    const project = response.data;   
    
    //([]) []= cria um novo array, ...projects copia os projetos e coloca o project no final

    setProjects([...projects, project]);
  }

  return (
    <>
    <Header title="Projects"/>
    {/* <img width={200} src={backgroundImage}/> */}
    <ul>
      {projects.map(project => <li key={project.id}>{project.title}</li>)}
    </ul>
    <button type="button" onClick={handleAddProject} >Adicionar projeto</button>
    </>);
}

export default App;
