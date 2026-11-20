// Importa a biblioteca Zod (usada para validação de dados)
import { z } from "zod";

// Cria e exporta um schema chamado createJogoSchema
// Esse schema será usado para validar os dados enviados na requisição
export const createJogoSchema = z.object({
  // Define que será validado o corpo da requisição (req.body)
  body: z.object({
    // Empresa à qual o jogo pertence (id de uma empresa já cadastrada)
    empresa_id: z
      .string({ message: "A empresa precisa ser informada" })
      .min(1, { message: "A empresa precisa ser informada" }),

    // Nome do jogo: texto com no mínimo 2 caracteres
    nome: z
      .string({ message: "Nome precisa ser um texto" })
      .min(2, { message: "O nome do jogo precisa ter no mínimo 2 letras" }),

    // Preço do jogo: número (ex: 199.9)
    preco: z
      .number({ message: "Preço precisa ser um número" })
      .min(0, { message: "O preço não pode ser negativo" }),

    // Ano de lançamento: número inteiro (ex: 2018)
    anoLancamento: z
      .number({ message: "Ano de lançamento precisa ser um número" })
      .int({ message: "Ano de lançamento precisa ser inteiro" })
      .min(1950, { message: "Ano de lançamento inválido" }),
  }),
});