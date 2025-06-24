import express from 'express';
import type { Request, Response } from 'express';
import cors from 'cors';
import path from 'path';
import { getDatabase } from './utils/database';

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// Servir arquivos estáticos da pasta 'public'
app.use(express.static(path.join(__dirname, '../public')));

function senhaValida(senha: string): boolean {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(senha);
}

app.post('/login', (req: Request, res: Response) => {
  const { nome, senha } = req.body;

  if (!nome || !senha) {
    return res.status(400).json({ erro: 'Nome e senha são obrigatórios.' });
  }

  if (!senhaValida(senha)) {
    return res.status(400).json({
      erro:
        'A senha deve ter no mínimo 8 caracteres, incluindo letra maiúscula, minúscula, número e caractere especial.',
    });
  }

  const db = getDatabase();
  const usuario = db.users.find((u: any) => u.nome === nome && u.senha === senha);

  if (!usuario) {
    return res.status(401).json({ erro: 'Usuário ou senha inválidos.' });
  }

  return res.status(200).json({ mensagem: 'Login realizado com sucesso!', usuario });
});

app.post('/transferir', (req: Request, res: Response) => {
  const { contaOrigem, contaDestino, valor, tipo } = req.body;

  if (!contaOrigem || !contaDestino || !valor || !tipo) {
    return res.status(400).json({ erro: 'Todos os dados devem estar preenchidos.' });
  }

  if (contaOrigem === contaDestino) {
    return res.status(400).json({ erro: 'Transferência para a mesma conta não é permitida.' });
  }

  const db = getDatabase();
  const emissor = db.users.find((u: any) => u.conta === contaOrigem);
  const receptor = db.users.find((u: any) => u.conta === contaDestino);

  if (!emissor || !receptor) {
    return res.status(400).json({ erro: 'Conta de origem ou destino não encontrada.' });
  }

  // Validar saldo do emissor
  if (emissor.saldo < valor) {
    return res.status(400).json({ erro: 'Saldo insuficiente para a transferência.' });
  }

  // Validar tipo e valor da transferência
  if (tipo === 'PIX' && valor > 5000) {
    return res.status(400).json({ erro: 'Transferência PIX não pode ultrapassar R$ 5.000.' });
  }

  if (tipo === 'TED' && (valor <= 5000 || valor > 10000)) {
    return res.status(400).json({
      erro: 'Transferência TED é permitida apenas entre R$ 5.000,01 e R$ 10.000.',
    });
  }

  if (tipo === 'DOC' && valor <= 10000) {
    return res.status(400).json({ erro: 'Transferência DOC é permitida somente acima de R$ 10.000.' });
  }

  // Realizar transferência
  emissor.saldo -= valor;
  receptor.saldo += valor;

  return res.status(200).json({
    mensagem: 'Sua transferência foi realizada com sucesso!',
    saldoEmissor: emissor.saldo,
    saldoReceptor: receptor.saldo,
  });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
