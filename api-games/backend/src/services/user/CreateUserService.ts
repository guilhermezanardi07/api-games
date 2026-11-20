// Importa a instância do Prisma (conexão com o banco)
import prismaClient from "../../prisma/index";

// Importa a função hash do bcryptjs para criptografar a senha do usuário
import { hash } from "bcryptjs";

// Interface que define os dados necessários para criar um usuário
interface CreateUserProps {
  name: string;
  email: string;
  password: string;
}

// Define uma classe responsável pela lógica de criação de usuário
class CreateUserService {
  // Método assíncrono (permite usar await, como acesso ao banco)
  async execute({ name, email, password }: CreateUserProps) {
    // Busca no banco se já existe um usuário com o mesmo email
    const userAlreadyExist = await prismaClient.user.findFirst({
      where: {
        email: email,
      },
    });

    // Verifica se o usuário já existe
    if (userAlreadyExist) {
      // Lança um erro para impedir a criação de usuário duplicado
      throw new Error("Usuário já existente!");

      // ⚠ Esse console.log nunca será executado (código morto),
      // pois o throw encerra a execução imediatamente
      console.log("Erro! Usuário já existe!");
    }

    // Criptografa a senha antes de salvar no banco (boa prática de segurança)
    const passwordHash = await hash(password, 8);

    // Cria um novo usuário no banco de dados
    const user = await prismaClient.user.create({
      data: {
        name: name,
        email: email,
        // Salva a senha já criptografada, nunca a senha original
        password: passwordHash,
      },

      // O select define exatamente quais dados do banco serão retornados após a operação.
      // Ou seja, exibidos no Postman
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    });

    // Retorna os dados do usuário criado (sem a senha)
    return user;
  }
}

// Exporta a classe para que possa ser usada em outros arquivos (ex: controllers)
export { CreateUserService };