// Importa os tipos do Express:
// Request → dados da requisição
// Response → resposta que será enviada
// NextFunction → função usada para passar o controle para o próximo middleware
import { Request, Response, NextFunction } from "express";

// Importa a função verify da biblioteca jsonwebtoken
// Ela é responsável por validar e decodificar o token JWT
import { verify } from "jsonwebtoken";

// Define a estrutura esperada do payload do token JWT
// "sub" (subject) normalmente guarda o ID do usuário
interface PayLoad {
  sub: string;
}

// Cria um middleware chamado isAuthenticated
// Ele será usado para proteger rotas (ex: só usuários logados podem acessar)
export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  // Pega o header "Authorization" da requisição
  // Normalmente vem assim: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVC39..."
  const authToken = req.headers.authorization;

  // Verifica se o token foi enviado
  if (!authToken) {
    // Retorna erro 401 (não autorizado) se não houver token
    return res.status(401).json({
      error: "Token não fornecido",
    });
  }

  // Divide o header em duas partes: "Bearer" e o token
  // Ignora a primeira parte e pega apenas o token
  // Exemplo: ["Bearer", "TOKEN_AQUI"]
  const [, token] = authToken.split(" ");

  try {
    // Tenta validar o token
    // Verifica se é válido usando a chave secreta (JWT_SECRET)
    // Se for válido, extrai o payload
    // Aqui estamos pegando o "sub", que é o ID do usuário
    const { sub } = verify(token!, process.env.JWT_SECRET as string) as PayLoad;

    // Adiciona o ID do usuário dentro do objeto req
    // Isso permite acessar o user_id em qualquer rota protegida
    req.user_id = sub;

    // Chama o próximo middleware ou controller
    // Isso significa: "autenticação OK, pode continuar"
    return next();
  } catch (erro) {
    // Se o token for inválido, expirado ou mal formado
    // Retorna erro 401 (não autorizado)
    return res.status(401).json({
      error: "Token inválido",
    });
  }
}