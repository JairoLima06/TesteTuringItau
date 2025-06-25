Teste Turing Itaú

Sistema de autenticação e transferência bancária desenvolvido como parte de um processo seletivo para estágio no Itaú Unibanco.

-------------------------------------

Desafio proposto

O sistema deve:

✅ Realizar autenticação de usuários
✅ Validar senhas com requisitos mínimos de segurança
✅ Executar transferências bancárias entre contas
✅ Validar regras específicas para os tipos de transferência (PIX, TED e DOC)
✅ Impedir transferências inválidas (mesma conta, saldo insuficiente, tipo inadequado, etc.)
✅ Exibir mensagens claras de erro ou sucesso
✅ Possuir um frontend HTML funcional para testes

-------------------------------------

Tecnologias utilizadas

- **TypeScript + Node.js**
- **Express.js** (API)
- **HTML + JavaScript puro** (Frontend)
- **JSON como banco de dados local (simulado)**
- **Git e GitHub (repositório privado)**

-------------------------------------

Como rodar o projeto localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/SEU_USUARIO/TesteTuringItau.git
   cd TesteTuringItau

2. Instale as dependências:
   npm install

3. Crie um arquivo database.json na raiz do projeto com o seguinte conteúdo de exemplo:
{
  "users": [
  {
      "id": 1,
      "nome": "Jairo",
      "senha": "Senha@123",
      "conta": "001",
      "saldo": 10000
    },
    {
      "id": 2,
      "nome": "Maria",
      "senha": "Maria@321",
      "conta": "002",
      "saldo": 0
    }
  ]
}

4. Inicie o servidor:
   npm run dev

5. Abra o navegador e acesse:
   http://localhost:3000

-------------------------------------

Regras implementadas:
Autenticação

-Senha obrigatória com:
-Mínimo 8 caracteres
-Letras maiúsculas e minúsculas
-Números
-Caracteres especiais

-------------------------------------

| Tipo | Valor permitido                |
| ---- | ------------------------------ |
| PIX  | Até R\$ 5.000                  |
| TED  | De R\$ 5.000,01 até R\$ 10.000 |
| DOC  | Acima de R\$ 10.000            |


Testes com Postman

Você pode testar os endpoints diretamente com o Postman usando:

POST /login
{
  "nome": "Jairo",
  "senha": "Senha@123"
}

POST /transferir

{
  "contaOrigem": "001",
  "contaDestino": "002",
  "valor": 1000,
  "tipo": "PIX"
}

Autor:

Desenvolvido por Francisco Jairo Dias de Lima — estudante de Análise e Desenvolvimento de Sistemas e entusiasta por desafios reais de tecnologia.
