# Ligar o painel: o que só você pode fazer

Carlos, o painel está pronto no código. Faltam três coisas que dependem de
contas suas, e que eu não tenho como fazer daqui. São uns 15 minutos.

Depois disso o Caio entra em `caiogracco.com.br/admin` com um e-mail e uma
senha, como em qualquer site, e nunca mais precisa saber que existe Git.

---

## Passo 1 · Criar a conta do Caio no GitHub

O painel grava direto no repositório, e para isso quem edita precisa de uma
conta com acesso a ele. Como o Caio não é técnico, **crie você a conta para
ele** e entregue o e-mail e a senha prontos.

1. Saia da sua conta do GitHub, ou abra uma janela anônima.
2. Vá em `github.com/signup`.
3. Use um e-mail que o Caio tenha acesso. Se ele não tiver um secundário,
   crie um Gmail do tipo `caiograccosite@gmail.com` só para isso.
4. Escolha uma senha e **anote**. É essa que você vai entregar a ele.
5. O GitHub manda um código no e-mail para confirmar.

Depois de criada, dê acesso ao repositório:

1. Volte para a **sua** conta.
2. Vá em `github.com/advogado-cmd/caiogracco` → **Settings** →
   **Collaborators** → **Add people**.
3. Coloque o usuário que você acabou de criar.
4. Escolha o papel **Write**. Não é preciso Admin: Write deixa editar
   conteúdo e não deixa apagar o repositório.
5. O convite chega no e-mail dele. Entre na conta dele e aceite.

> **Por que não um login com senha comum, sem GitHub?**
> Porque o painel não tem servidor nem banco de dados: ele grava direto no
> repositório, e é isso que mantém o site rápido, de graça, e com histórico
> de tudo. O preço é essa conta. Da segunda vez em diante, o navegador
> guarda a senha e o Caio só clica.

---

## Passo 2 · Criar o aplicativo OAuth

É o que permite ao painel pedir "entre com o GitHub".

1. Na **sua** conta, vá em `github.com/settings/developers`.
2. **OAuth Apps** → **New OAuth App**.
3. Preencha:

   | Campo | O que colocar |
   |---|---|
   | Application name | `Painel Caio Gracco` |
   | Homepage URL | `https://caiogracco.com.br` |
   | Authorization callback URL | `https://caiogracco.com.br/api/callback` |

   A terceira linha é a que importa. Se estiver errada, o login falha com
   "redirect_uri mismatch".

4. **Register application**.
5. A tela mostra o **Client ID**. Copie.
6. Clique em **Generate a new client secret**. Copie na hora: **o GitHub
   mostra o segredo uma vez só.** Se perder, gere outro.

---

## Passo 3 · Guardar as duas chaves na Vercel

No painel da Vercel, no projeto do site: **Settings → Environment
Variables**. Crie duas, para o ambiente **Production**:

```
GITHUB_OAUTH_ID      = (o Client ID)
GITHUB_OAUTH_SECRET  = (o client secret)
```

**Não marque a caixinha que expõe a variável ao navegador.** Essas duas só
podem ser lidas no servidor. Se o segredo vazar, qualquer um consegue um
token em nome do Caio.

Depois de salvar, faça um **redeploy**: Deployments → o mais recente →
três pontinhos → Redeploy.

---

## Passo 4 · Testar

1. Abra `caiogracco.com.br/admin` numa janela anônima.
2. Deve aparecer a tela creme com o símbolo e o botão escuro.
3. Clique, entre com a conta do Caio, autorize.
4. Você cai no painel, com Blog, Terapias e Páginas no alto.
5. Abra um artigo, mude uma vírgula, publique.
6. Vá no GitHub e veja: apareceu um commit novo, escrito
   "Painel: blog "..." atualizado". A Vercel já está reconstruindo.

Se algo falhar, o erro aparece na própria janelinha, em português.

---

## Como isso funciona, para você saber o que responder

**Onde o conteúdo mora agora.** Saiu de dentro do código e foi para
arquivos JSON em `src/content/dados/`, e o blog continua em Markdown. Cada
salvamento no painel vira um commit de verdade no repositório, com mensagem
legível. A Vercel percebe o commit e reconstrói o site sozinha.

**Quanto demora.** De 1 a 3 minutos entre o Caio clicar em publicar e o
texto estar no ar. É o tempo de reconstruir as 197 páginas. Avisei ele no
guia para não achar que quebrou.

**Se ele errar.** Nada se perde. Toda edição tem data, autor e conteúdo
anterior guardados. Reverter é um comando, ou dois cliques no GitHub.

**Se o painel sair do ar.** O site não depende dele: são coisas separadas.
O painel fora do ar significa só que ninguém edita naquele momento.

**O que continua comigo.** As imagens dos certificados precisam ser
preparadas antes de entrar. E a estrutura das páginas, o layout, as cores:
o painel edita conteúdo, não desenho.

---

## Uma coisa que vale fazer depois

O painel do Decap tem um modo de rascunho, em que o texto fica esperando
aprovação antes de ir ao ar. Deixei desligado de propósito: para uma pessoa
só editando, ele acrescenta duas etapas e nenhuma segurança.

Se um dia mais alguém for escrever no site, me avise que eu ligo. Aí passa
a fazer sentido: um escreve, você aprova, e só então publica.
