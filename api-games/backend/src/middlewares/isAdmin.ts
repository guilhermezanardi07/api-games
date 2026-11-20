// Importa os tipos do Express usados no middleware
// Request representa a requisição recebida
// Response representa a resposta enviada ao cliente
// NextFunction representa a função que permite seguir para o próximo middleware/controller
import { Request, Response, NextFunction } from "express";

// Importa a instância do Prisma Client
// Ela permite consultar o banco de dados
import prismaClient from "../prisma";

// Cria e exporta um middleware chamado isAdmin
// Ele verifica se o usuário logado possui permissão de administrador
// O async permite usar await dentro da função
// Promise<void> indica que essa função não retorna dados diretamente
export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Pega o ID do usuário salvo dentro da requisição
  // Esse user_id normalmente foi adicionado antes pelo middleware isAuthenticated
  const user_id = req.user_id;

  // Verifica se não existe user_id na requisição
  // Isso indica que o usuário não está autenticado corretamente
  if (!user_id) {
    // Retorna status 401, indicando que o usuário não tem autorização
    res.status(401).json({
      error: "Usuário sem Permissão",
    });

    // Encerra a execução do middleware
    // Isso impede que o código continue
    return;
  }

  // Busca no banco de dados um usuário com o ID recebido
  const user = await prismaClient.user.findFirst({
    // Define a condição da busca
    // Procura o usuário cujo id seja igual ao user_id
    where: {
      id: user_id,
    },
  });

  // Verifica se nenhum usuário foi encontrado no banco
  if (!user) {
    // Retorna erro 401, pois o usuário não existe ou não é válido
    res.status(401).json({
      error: "Usuário sem permissão",
    });

    // Para a execução do middleware
    return;
  }

  // Verifica se o tipo/perfil do usuário é diferente de ADMIN
  // Se não for ADMIN, ele não pode acessar a rota protegida
  if (user.role !== "ADMIN") {
    // Retorna erro 401 informando falta de permissão
    res.status(401).json({
      error: "Usuário sem permissão",
    });

    // Encerra a execução para não liberar acesso
    return;
  }

  // Usuário é admin... então segue normal...
  // Chama o próximo middleware ou controller da rota
  // Só chega aqui se o usuário existir e tiver role ADMIN
  next();
};

// Resumo do fluxo:
// Pega user_id -> busca usuário no banco -> verifica se existe -> verifica se é ADMIN -> libera acesso