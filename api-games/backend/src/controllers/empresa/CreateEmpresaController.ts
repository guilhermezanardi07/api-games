// Importa os tipos Request e Response do Express
import { Request, Response } from "express";

// Importa o service responsável pela lógica de criação de empresas
import { CreateEmpresaService } from "../../services/empresa/CreateEmpresaService";

// Controllers recebem os dados da requisição e retornam respostas
class CreateEmpresaController {
  // Método assíncrono responsável por processar a requisição
  // O async permite usar await dentro do método
  async handle(req: Request, res: Response) {
    // Pega os campos enviados no corpo da requisição
    // Exemplo:
    // {
    //   "nome": "Nintendo",
    //   "ceo": "Shuntaro Furukawa",
    //   "anoFundacao": 1889,
    //   "cidade": "Quioto",
    //   "pais": "Japão"
    // }
    const { nome, ceo, anoFundacao, cidade, pais } = req.body;

    // Cria uma instância do service de criação de empresa
    const createEmpresa = new CreateEmpresaService();

    // Chama o método execute do service
    // Envia os dados da empresa para serem salvos no banco
    // O await espera a operação terminar
    const empresa = await createEmpresa.execute({
      nome: nome,
      ceo: ceo,
      anoFundacao: anoFundacao,
      cidade: cidade,
      pais: pais,
    });

    // Retorna status HTTP 201 (Created)
    // Indica que um novo registro foi criado com sucesso
    // Também retorna os dados da empresa criada em JSON
    res.status(201).json(empresa);
  }
}

// Exporta o controller para ser utilizado nas rotas da aplicação
export { CreateEmpresaController };