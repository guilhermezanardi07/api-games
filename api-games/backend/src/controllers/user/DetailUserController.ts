// Importa os tipos Request e Response do Express
// Request representa a requisição recebida
// Response representa a resposta que será enviada ao cliente
import { Request, Response } from "express";

// Importa o service responsável por buscar os detalhes do usuário no banco de dados
import { DetailUserService } from "../../services/user/DetailUserService";

// Cria uma classe DetailUserController
// O Controller é responsável por receber a requisição e devolver uma resposta
class DetailUserController {
  // Cria o método assíncrono handle
  // Esse método será chamado quando a rota de detalhes do usuário for acessada
  async handle(req: Request, res: Response) {
    // Pega o ID do usuário que está salvo dentro da requisição
    // Normalmente esse req.user_id é adicionado por um middleware de autenticação
    // Exemplo: o middleware valida o token JWT e coloca o ID do usuário em req.user_id
    const user_id = req.user_id;

    // Cria uma instância da classe DetailUserService
    // Esse service contém a regra de negócio para buscar os dados do usuário
    const detailUser = new DetailUserService();

    // Chama o método execute do service, passando o ID do usuário
    // O await espera a busca no banco de dados terminar
    // O resultado será armazenado na variável user
    const user = await detailUser.execute(user_id);

    // Retorna os dados do usuário em formato JSON como resposta da API
    return res.json(user);
  }
}

// Exporta o controller para ser usado nas rotas
export { DetailUserController };