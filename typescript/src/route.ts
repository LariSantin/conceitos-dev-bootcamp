import { Request, Response } from 'express';
import createUser from './services/CreateUser'

export function helloWorld(request: Request, response: Response) {
  const user = createUser({
    name: 'Larissa',
    email: 'lari@gmail',
    password: 'senha1234',
    techs: [
      'Node.js', 
      'Angular.js', 
      'Vue.js',
      {
        title: 'JavaScript', experience: 100
      },
    ]
  });

  return response.json({ message: user});
}