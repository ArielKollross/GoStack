import React from 'react';
import { FiChevronRight } from 'react-icons/fi'

import githubLogo from '../../assets/githubLogo.svg';

import { Title, Form, Repositories } from './styles';

// define more easy typeOf Ts
const Dashboard: React.FC = () => {
  return (
    <>
      <img src={githubLogo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form action="">
        <input type="text" placeholder="Digite o nome do repositório"/>
        <button type="submit">Pesquisar</button>
      </Form>

      <Repositories>
        <a href="teste">
          <img
          src="https://avatars0.githubusercontent.com/u/21115260?s=460&u=c1ba6a09cc170ffdc1a1cf9742964f4ad529d05e&v=4"
          alt="Ariel Kollross"/>
          <div>
            <strong>ArielKollross/goStack</strong>
            <p>solve exercices</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
          src="https://avatars0.githubusercontent.com/u/21115260?s=460&u=c1ba6a09cc170ffdc1a1cf9742964f4ad529d05e&v=4"
          alt="Ariel Kollross"/>
          <div>
            <strong>ArielKollross/goStack</strong>
            <p>solve exercices</p>
          </div>

          <FiChevronRight size={20} />
        </a>

        <a href="teste">
          <img
          src="https://avatars0.githubusercontent.com/u/21115260?s=460&u=c1ba6a09cc170ffdc1a1cf9742964f4ad529d05e&v=4"
          alt="Ariel Kollross"/>
          <div>
            <strong>ArielKollross/goStack</strong>
            <p>solve exercices</p>
          </div>

          <FiChevronRight size={20} />
        </a>
      </Repositories>

    </>
  )
};

export default Dashboard;


