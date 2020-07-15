import React, { useState, useEffect , FormEvent } from 'react';
import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom';
import api from '../../services/api';

import githubLogo from '../../assets/githubLogo.svg';

import { Title, Form, Repositories, Error } from './styles';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string,
  }
}
// define more easy typeOf Ts
const Dashboard: React.FC = () => {
  const [newRepository, setNewRepository] = useState('');
  const [inputError, setInputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem('@GithubExplorer:repositories',);

    if(storageRepositories) {
      return JSON.parse(storageRepositories);
    } else {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplorer:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleAddRepository(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepository) {
      setInputError('Digite o autor/nome do repositório');
      return;
    }

    try{
      const response = await api.get<Repository>(`repos/${newRepository}`);

      const repository = response.data;

      setRepositories([...repositories, repository]);
      setNewRepository('');
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por este repositórios');
    }
  }

  return (
    <>
      <img src={githubLogo} alt="Github Explorer" />
      <Title>Explore repositórios no GitHub.</Title>

      <Form hasError={!!inputError} onSubmit={handleAddRepository}>
        <input
          value={newRepository}
          onChange={(e) => setNewRepository(e.target.value)}
          type="text"
          placeholder="Digite o nome do repositório"
        />
        <button type="submit">Pesquisar</button>
      </Form>

      { inputError &&  <Error>{inputError}</Error> }

      <Repositories>
        {repositories.map(repository => (
          <Link key={repository.full_name} to={`/repositories/${repository.full_name}`}>
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>

    </>
  )
};

export default Dashboard;


