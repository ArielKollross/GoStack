import {Request, Response } from 'express';
import  createUser from './services/CreateUser';

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Nome',
    email: 'email@email.com',
    password: 'asdihasudhas',
    techs: [
    'node', 
    'React', 
    'Vue',
    {title: 'JavaScript', experience: 100},
    {title: '', experience: 9}
  ]
  });

  return response.json({message: "Hello TypeScript"});
}