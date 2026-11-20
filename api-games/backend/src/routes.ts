// Importa o Router do Express (para criar rotas separadas)
import { Router } from "express";

// Controllers de usuário
import { CreateUserController } from "./controllers/user/CreateUserController";
import { AuthUserController } from "./controllers/user/AuthUserController";
import { DetailUserController } from "./controllers/user/DetailUserController";

// Controllers de empresa
import { CreateEmpresaController } from "./controllers/empresa/CreateEmpresaController";
import { ListEmpresaController } from "./controllers/empresa/ListEmpresaController";

// Controllers de jogo
import { CreateJogoController } from "./controllers/jogo/CreateJogoController";
import { ListJogoController } from "./controllers/jogo/ListJogoController";

// Middlewares
import { validateSchema } from "./middlewares/validateSchema";
import { isAuthenticated } from "./middlewares/isAuthenticated";
import { isAdmin } from "./middlewares/isAdmin";

// Schemas de validação
import { createUserSchema, authUserSchema } from "./schemas/userSchema";
import { createEmpresaSchema } from "./schemas/empresaSchema";
import { createJogoSchema } from "./schemas/jogoSchema";

// Cria uma instância de roteador do Express
const router = Router();

// ROTAS DE USUÁRIO
router.post(
  "/users", // Cadastro de usuário
  validateSchema(createUserSchema),
  new CreateUserController().handle
);

router.post(
  "/session", // Login (retorna o token JWT)
  validateSchema(authUserSchema),
  new AuthUserController().handle
);

router.get(
  "/me", // Dados do usuário autenticado
  isAuthenticated,
  new DetailUserController().handle
);

// ROTAS DE EMPRESA
router.post(
  "/empresa", // Endpoint da rota
  isAuthenticated, // Verifica se o usuário está autenticado
  isAdmin, // Verifica se o usuário possui permissão de administrador
  validateSchema(createEmpresaSchema), // Valida os dados enviados na requisição
  new CreateEmpresaController().handle // Executa o controller responsável por criar a empresa
);

router.get(
  "/empresa", // Endpoint da rota
  isAuthenticated, // Verifica se o usuário está autenticado
  new ListEmpresaController().handle // Executa o controller responsável por listar as empresas
);

// ROTAS DE JOGO
router.post(
  "/jogo", // Endpoint da rota
  isAuthenticated, // Verifica se o usuário está autenticado
  isAdmin, // Verifica se o usuário possui permissão de administrador
  validateSchema(createJogoSchema), // Valida os dados enviados na requisição
  new CreateJogoController().handle // Executa o controller responsável por criar o jogo
);

router.get(
  "/jogo", // Endpoint da rota
  isAuthenticated, // Verifica se o usuário está autenticado
  new ListJogoController().handle // Executa o controller responsável por listar os jogos
);

// Exporta o router para ser utilizado em outros arquivos (ex: no app principal)
export { router };