// Importa a instância do Prisma Client
// Responsável por fazer a comunicação com o banco de dados
import prismaClient from "../../prisma";

// Interface que define os dados necessários para criar um jogo
interface CreateJogoProps {
  empresa_id: string; // Id da empresa dona do jogo
  nome: string; // Nome do jogo
  preco: number; // Preço do jogo
  anoLancamento: number; // Ano de lançamento
}

// Classe responsável pela lógica de criação de jogos
class CreateJogoService {
  // Método assíncrono responsável por criar um jogo
  async execute({ empresa_id, nome, preco, anoLancamento }: CreateJogoProps) {
    // Verifica se a empresa informada existe no banco
    const empresaExiste = await prismaClient.empresa.findFirst({
      where: {
        id: empresa_id,
      },
    });

    // Se a empresa não existir, não deixa cadastrar o jogo
    if (!empresaExiste) {
      throw new Error("Empresa não encontrada");
    }

    // Bloco de tentativa para tratar possíveis erros
    try {
      // Cria um novo jogo na tabela "jogos" do banco
      const jogo = await prismaClient.jogo.create({
        // Dados que serão salvos no banco
        data: {
          empresa_id: empresa_id,
          nome: nome,
          preco: preco,
          anoLancamento: anoLancamento,
        },

        // Define quais campos serão retornados após a criação
        select: {
          id: true,
          nome: true,
          preco: true,
          anoLancamento: true,
          createdAt: true,
          // Retorna também o id e o nome da empresa do jogo
          empresa: {
            select: {
              id: true,
              nome: true,
            },
          },
        },
      });

      // Retorna o jogo criado
      return jogo;

      // Captura possíveis erros durante a criação
    } catch (erro) {
      // Lança um novo erro personalizado
      // Esse erro será tratado no middleware global de erros
      throw new Error("Falha ao criar Jogo");
    }
  }
}

// Exporta o service para ser utilizado em controllers ou outros arquivos
export { CreateJogoService };