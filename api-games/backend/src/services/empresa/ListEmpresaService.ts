// Importa a instância do Prisma Client
// Responsável pela comunicação com o banco de dados
import prismaClient from "../../prisma";

// Classe responsável pela lógica de listagem de empresas
class ListEmpresaService {
  // Método assíncrono para buscar empresas no banco
  async execute() {
    // Bloco de tentativa para tratamento de erros
    try {
      // Busca todas as empresas cadastradas
      const empresas = await prismaClient.empresa.findMany({
        // Define quais campos serão retornados
        select: {
          id: true,
          nome: true,
          ceo: true,
          anoFundacao: true,
          cidade: true,
          pais: true,
          createdAt: true,
        },

        // Ordena as empresas pela data de criação
        // "desc" = mais recentes primeiro
        orderBy: {
          createdAt: "desc",
        },
      });

      // Retorna a lista de empresas
      return empresas;

      // Captura possíveis erros
    } catch (erro) {
      // Lança um erro personalizado
      throw new Error("Falha ao buscar empresas");
    }
  }
}

// Exporta o service para ser utilizado no controller
export { ListEmpresaService };