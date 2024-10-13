// src/pages/api/user.ts
import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

interface User {
  nome: string;
  email: string;
  senha: string;
  pets: Array<any>;
  agendamentos: Array<any>;
}

const getFilePath = () => path.resolve(process.cwd(), './src/pages/api/users.json'); //DIZENDO ONDE ESTÁ O JSON
const readUsers = (): User[] => JSON.parse(fs.readFileSync(getFilePath(), 'utf-8')); //LENDO O JSON
const writeUsers = (users: User[]) => fs.writeFileSync(getFilePath(), JSON.stringify(users, null, 2)); //ESCREVENDO NO JSON

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const users = readUsers();

  switch (req.method) {
    //PEGANDO DADOS
    case 'GET':
      return res.status(200).json(users);

    //INSERÇÃO DE DADOS
    case 'POST':
      //LOGIN
      if (req.body.email && req.body.senha) {
        const { email, senha } = req.body;
        const user = users.find((user) => user.email === email && user.senha === senha);
        if (user) {
          return res.status(200).json({ message: 'Login bem-sucedido!' });
        } 
        else {
          return res.status(401).json({ message: 'Usuário e/ou senha incorretos.' });
        }
      }
      
      //CADASTRO DE USUÁRIOS
      else if (req.body.newUser) {
        const newUser = req.body.newUser;
        const userExists = users.some((user) => user.email === newUser.email);
        if (userExists) {
          return res.status(409).json({ message: "Usuário já existe." });
        }
        users.push(newUser);
        writeUsers(users);
        return res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
      } 
      
      //CADASTRO DE AGENDAMENTOS
      else if (req.body.newAgendamento) {
        const { email, newAgendamento } = req.body;
        const user = users.find((user) => user.email === email);
        if (!user) {
          return res.status(404).json({ message: "Usuário não encontrado." });
        }
        const newId = user.agendamentos.length > 0 ? user.agendamentos[user.agendamentos.length - 1].id + 1 : 1;
        user.agendamentos.push({ id: newId, ...newAgendamento });
        writeUsers(users);
        return res.status(201).json({ message: "Agendamento criado com sucesso!" });
      } 

      //ERRO NO REQUERIMENTO
      else {
        return res.status(400).json({ message: "Requisição mal formada." });
      }

    //ATUALIZAÇÃO DE DADOS
    case 'PUT':
      const { email, updatedUser } = req.body;
      const userIndex = users.findIndex((user) => user.email === email);
      if (userIndex === -1) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      users[userIndex] = { ...users[userIndex], ...updatedUser };
      writeUsers(users);
      return res.status(200).json({ message: "Usuário atualizado com sucesso!" });

    //REMOÇÃO DE DADOS
    case 'DELETE':
      const { agendamentoId } = req.body;
      const deleteUser = users.find((user) => user.email === req.body.email);
      if (!deleteUser) {
        return res.status(404).json({ message: "Usuário não encontrado." });
      }
      const agendamentoIndex = deleteUser.agendamentos.findIndex((a) => a.id === agendamentoId);
      if (agendamentoIndex === -1) {
        return res.status(404).json({ message: "Agendamento não encontrado." });
      }
      deleteUser.agendamentos.splice(agendamentoIndex, 1);
      writeUsers(users);
      return res.status(200).json({ message: "Agendamento deletado com sucesso!" });

    default:
      res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
