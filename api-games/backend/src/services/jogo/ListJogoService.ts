// Importa a instância do Prisma Client
// Responsável pela comunicação com o banco de dados
import prismaClient from "../../prisma";

// Classe responsável pela lógica de listagem de jogos
class ListJogoService {
  // Método assíncrono para buscar jogos no banco
  async execute() {
    // Bloco de tentativa para tratamento de erros
    try {
      // Busca todos os jogos cadastrados
      const jogos = await prismaClient.jogo.findMany({
        // Define quais campos serão retornados
        select: {
          id: true,
          nome: true,
          preco: true,
          anoLancamento: true,
          createdAt: true,
          // Retorna também o id e o nome da empresa dona do jogo
          empresa: {
            select: {
              id: true,
              nome: true,
            },
          },
        },

        // Ordena os jogos pela data de criação
        // "desc" = mais recentes primeiro
        orderBy: {
          createdAt: "desc",
        },
      });

      // Retorna a lista de jogos
      return jogos;

      // Captura possíveis erros
    } catch (erro) {
      // Lança um erro personalizado
      throw new Error("Falha ao buscar jogos");
    }
  }
}

// Exporta o service para ser utilizado no controller
export { ListJogoService };