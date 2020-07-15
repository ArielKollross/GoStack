import React, { useEffect, useState } from 'react';
import { useRouteMatch, Link } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import api, { } from '../../services/api';

import githubLogo from '../../assets/githubLogo.svg';

import { Header, RepositoryInfo, Issues } from './styles';

interface RepositoryParams {
  repository: string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count: number,
  open_issues_count: number,
  owner: {
    login: string;
    avatar_url: string,
  }
}

interface Issue {
  id: number;
  title: string;
  html_url: string;
  user: {
    login: string;
  }
}

// define more easy typeOf Ts
const Repository: React.FC = () => {
  const [repository, setRepository] = useState<Repository | null>(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParams>();

  useEffect(() => {
    api.get(`repos/${params.repository}`).then(response => {
      setRepository(response.data);
    });

    api.get(`repos/${params.repository}/issues`).then(response => {
      setIssues(response.data);
    });

    // in other way

    //if we use async function and two request to api, we app will call de first
    // await, then receive this, will get the next call, then we app can be lower.
    // one way to fiz this is use await Promise.all()
    // async function loadData(): Promise<void> {
    //   const [repository, issues ] = await Promise.all([
    //     api.get(`repos/${params.repository}`),
    //     api.get(`repos/${params.repository}/issues`),
    //   ]);

    //   console.log(repository);
    //   console.log(issues);
    // }

  }, [params.repository]);

  return (
    <>
      <Header>
        <img src={githubLogo} alt="Github Explorer" />
        <Link to="/" >
          <FiChevronLeft size={16} />
      Voltar
    </Link>
      </Header>

      {/* if repositori != null, show */}
      {repository && (
        <RepositoryInfo>
          <header>
            <img src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}</p>
            </div>
          </header>
          <ul>
            <li>
              <strong>{repository.stargazers_count}</strong>
              <span>Stars</span>
            </li>

            <li>
              <strong>{repository.forks_count}</strong>
              <span>Forks</span>
            </li>

            <li>
              <strong>{repository.open_issues_count}</strong>
              <span>Issues Abertas</span>
            </li>
          </ul>
        </RepositoryInfo>
      )}

      <Issues>
        {issues.map(issue => (
          <a key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>{issue.user.login}</p>
            </div>

            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>

    </>
  );
};

export default Repository;
