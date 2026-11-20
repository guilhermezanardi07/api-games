// Importa a instância do Prisma Client
// Responsável por fazer a comunicação com o banco de dados
import prismaClient from "../../prisma";

// Interface que define os dados necessários para criar uma empresa
// Serve para tipar os parâmetros recebidos pelo service
interface CreateEmpresaProps {
  nome: string; // Nome da empresa
  ceo: string; // Nome do CEO
  anoFundacao: number; // Ano de fundação
  cidade: string; // Cidade da sede
  pais: string; // País da sede
}

// Classe responsável pela lógica de criação de empresas
// Services normalmente contêm as regras de negócio da aplicação
class CreateEmpresaService {
  // Método assíncrono responsável por criar uma empresa
  // Recebe os dados tipados pela interface CreateEmpresaProps
  async execute({ nome, ceo, anoFundacao, cidade, pais }: CreateEmpresaProps) {
    // Bloco de tentativa para tratar possíveis erros
    try {
      // Cria uma nova empresa na tabela "empresas" do banco
      // Utiliza o Prisma para realizar o INSERT
      const empresa = await prismaClient.empresa.create({
        // Dados que serão salvos no banco
        data: {
          nome: nome,
          ceo: ceo,
          anoFundacao: anoFundacao,
          cidade: cidade,
          pais: pais,
        },

        // Define quais campos serão retornados após a criação
        // Isso evita retornar informações desnecessárias
        select: {
          id: true,
          nome: true,
          ceo: true,
          anoFundacao: true,
          cidade: true,
          pais: true,
          createdAt: true,
        },
      });

      // Retorna a empresa criada
      return empresa;

      // Captura possíveis erros durante a criação
    } catch (erro) {
      // Lança um novo erro personalizado
      // Esse erro pode ser tratado no middleware global de erros
      throw new Error("Falha ao criar Empresa");
    }
  }
}

// Exporta o service para ser utilizado em controllers ou outros arquivos
export { CreateEmpresaService };