// Importa os tipos Request e Response do Express
import { Request, Response } from "express";

// Importa o service responsável pela lógica de listagem de jogos
import { ListJogoService } from "../../services/jogo/ListJogoService";

// Classe responsável por controlar a listagem de jogos
class ListJogoController {
  // Método assíncrono responsável por processar a requisição
  async handle(req: Request, res: Response) {
    // Cria uma instância do service de listagem
    const listJogo = new ListJogoService();

    // Executa o service para buscar os jogos no banco
    const jogos = await listJogo.execute();

    // Retorna status 200 (OK) junto com a lista de jogos
    res.status(200).json(jogos);
  }
}

// Exporta o controller para ser utilizado nas rotas
export { ListJogoController };