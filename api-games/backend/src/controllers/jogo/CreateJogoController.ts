// Importa os tipos Request e Response do Express
import { Request, Response } from "express";

// Importa o service responsável pela lógica de criação de jogos
import { CreateJogoService } from "../../services/jogo/CreateJogoService";

// Controllers recebem os dados da requisição e retornam respostas
class CreateJogoController {
  // Método assíncrono responsável por processar a requisição
  async handle(req: Request, res: Response) {
    // Pega os campos enviados no corpo da requisição
    // Exemplo:
    // {
    //   "empresa_id": "id-da-empresa",
    //   "nome": "The Legend of Zelda: Breath of the Wild",
    //   "preco": 299.9,
    //   "anoLancamento": 2017
    // }
    const { empresa_id, nome, preco, anoLancamento } = req.body;

    // Cria uma instância do service de criação de jogo
    const createJogo = new CreateJogoService();

    // Chama o método execute do service
    // Envia os dados do jogo para serem salvos no banco
    const jogo = await createJogo.execute({
      empresa_id: empresa_id,
      nome: nome,
      preco: preco,
      anoLancamento: anoLancamento,
    });

    // Retorna status HTTP 201 (Created)
    // Indica que um novo registro foi criado com sucesso
    res.status(201).json(jogo);
  }
}

// Exporta o controller para ser utilizado nas rotas da aplicação
export { CreateJogoController };