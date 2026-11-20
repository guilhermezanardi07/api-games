// Importa a biblioteca Zod
// O Zod é usado para validação de dados e criação de schemas
// Ele ajuda a garantir que os dados recebidos estejam corretos
import { z } from "zod";

// Cria e exporta um schema chamado createEmpresaSchema
// Esse schema será usado para validar os dados enviados na requisição
export const createEmpresaSchema = z.object({
  // Define que será validado o corpo da requisição (req.body)
  body: z.object({
    // Nome da empresa: texto com no mínimo 2 caracteres
    nome: z
      .string({ message: "Nome precisa ser um texto" })
      .min(2, { message: "O nome da empresa precisa ter no mínimo 2 letras" }),

    // Nome do CEO: texto com no mínimo 2 caracteres
    ceo: z
      .string({ message: "CEO precisa ser um texto" })
      .min(2, { message: "O nome do CEO precisa ter no mínimo 2 letras" }),

    // Ano de fundação: número inteiro (ex: 1889)
    anoFundacao: z
      .number({ message: "Ano de fundação precisa ser um número" })
      .int({ message: "Ano de fundação precisa ser inteiro" })
      .min(1800, { message: "Ano de fundação inválido" }),

    // Cidade da sede: texto com no mínimo 2 caracteres
    cidade: z
      .string({ message: "Cidade precisa ser um texto" })
      .min(2, { message: "A cidade precisa ter no mínimo 2 letras" }),

    // País da sede: texto com no mínimo 2 caracteres
    pais: z
      .string({ message: "País precisa ser um texto" })
      .min(2, { message: "O país precisa ter no mínimo 2 letras" }),
  }),
});