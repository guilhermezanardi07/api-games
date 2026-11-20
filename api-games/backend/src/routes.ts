// Importa os tipos Request e Response (para tipagem das requisições e respostas)
// e o Router (para criar rotas separadas no Express)
import { Request, Response, Router } from "express";

// Importa o controller responsável por lidar com a criação de usuários
import { CreateUserController } from "./controllers/user/CreateUserController";

// Importa o middleware de validação com Zod
import { validateSchema } from "./middlewares/validateSchema";

// Importa o controller responsável por lidar com o login de usuários
import { AuthUserController } from "./controllers/user/AuthUserController";

// Importa o schema que define as regras de validação para criação de usuário e login
import { createUserSchema, authUserSchema } from "./schemas/userSchema";

import { isAuthenticated } from "./middlewares/isAuthenticated";

import { DetailUserController } from "./controllers/user/DetailUserController";

import { isAdmin } from "./middlewares/isAdmin";

import { createEmpresaSchema } from "./schemas/empresaSchema";

import { CreateEmpresaController } from "./controllers/empresa/CreateEmpresaController";


// Cria uma instância de roteador do Express
const router = Router();

// Define uma rota do tipo POST no caminho "/session"
// Essa rota será usada para autenticação (login do usuário)
router.post(
  "/session", // endpoint da rota (ex: http://localhost:3333/session)

  // Middleware que valida os dados enviados no body da requisição
  // Ele usa um schema (authUserSchema) para garantir que email e senha estão corretos
  validateSchema(authUserSchema),

  // Controller responsável por processar a requisição
  // Aqui ele executa o método handle, que faz a autenticação do usuário
  new AuthUserController().handle
);

router.get(
  "/me", // Endpoint para obter dados do usuário autenticado
  isAuthenticated, // Middleware que verifica se o usuário está autenticado (token válido)
  new DetailUserController().handle // Controller que busca e retorna os dados do usuário
);

router.post(
  "/empresa", // Endpoint da rota
  isAuthenticated, // Verifica se o usuário está autenticado
  isAdmin, // Verifica se o usuário possui permissão de administrador
  validateSchema(createEmpresaSchema), // Valida os dados enviados na requisição
  new CreateEmpresaController().handle // Executa o controller responsável por criar a empresa
);

// Exporta o router para ser utilizado em outros arquivos (ex: no app principal)
export { router };