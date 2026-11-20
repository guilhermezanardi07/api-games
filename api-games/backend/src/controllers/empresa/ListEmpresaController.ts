// Importa os tipos Request e Response do Express
// Request representa a requisição recebida
// Response representa a resposta enviada ao cliente
import { Request, Response } from "express";

// Importa o service responsável pela lógica de listagem de empresas
import { ListEmpresaService } from "../../services/empresa/ListEmpresaService";

// Classe responsável por controlar a listagem de empresas
class ListEmpresaController {
  // Método assíncrono responsável por processar a requisição
  async handle(req: Request, res: Response) {
    // Cria uma instância do service de listagem
    const listEmpresa = new ListEmpresaService();

    // Executa o service para buscar as empresas no banco
    const empresas = await listEmpresa.execute();

    // Retorna status 200 (OK) junto com a lista de empresas
    res.status(200).json(empresas);
  }
}

// Exporta o controller para ser utilizado nas rotas
export { ListEmpresaController };