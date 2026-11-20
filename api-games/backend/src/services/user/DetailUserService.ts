// Importa a instância do Prisma Client
// Essa instância é responsável por fazer a comunicação com o banco de dados
import prismaClient from "../../prisma";

// Define uma classe chamada DetailUserService
// Ela segue o padrão de "Service", ou seja, responsável pela regra de negócio
class DetailUserService {
  // Método assíncrono chamado "execute"
  // Recebe como parâmetro o ID do usuário (user_id)
  // O async permite usar await dentro da função
  async execute(user_id: string) {
    // Início do bloco de tentativa (try)
    // Aqui tentamos executar a busca no banco de dados
    try {
      // Usa o Prisma para buscar um usuário na tabela "user"
      // findFirst retorna o primeiro registro que bater com a condição
      const user = await prismaClient.user.findFirst({
        // Define o filtro da busca
        // Aqui estamos procurando um usuário com o ID recebido
        where: {
          id: user_id,
        },

        // Define quais campos queremos retornar do banco
        // Isso evita trazer dados desnecessários (boa prática)
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
      });

      // Verifica se nenhum usuário foi encontrado
      if (!user) {
        // Lança um erro caso não encontre o usuário
        // Esse erro pode ser tratado no controller ou middleware global
        throw new Error("Usuário não encontrado");
      }

      // Retorna o usuário encontrado
      return user;
    } catch (erro) {
      // Caso aconteça qualquer erro dentro do try
      // Mostra o erro no console (útil para debug)
      console.log(erro);

      // Lança um erro genérico
      // OBS: aqui você perde o erro original (não é ideal em produção)
      throw new Error("Usuário não encontrado");
    }
  }
}

// Exporta a classe para poder ser usada em outros arquivos (ex: controller)
export { DetailUserService };