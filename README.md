# Project Managment API

## Como Rodar o Projeto

Para rodar o projeto, você precisa ter o Docker e o Docker Compose instalados em sua máquina. Com os dois instalados, siga os seguintes passos:

1. Clone o repositório:

```bash
git clone <url-do-repositorio>
```

2. Navegue até a pasta do projeto:

```bash
cd <nome-da-pasta>
```

3. Execute o seguinte comando para construir e iniciar os containers Docker:

```bash
docker compose up -d --build
```

A aplicação estará disponível em `http://localhost:3002`.

## Arquitetura do Projeto

O projeto segue uma arquitetura modular e em camadas, projetada para separação de responsabilidades, testabilidade e escalabilidade.

### Módulos

Cada recurso principal da aplicação é encapsulado em seu próprio módulo (por exemplo, `UsersModule`, `TasksModule`, `AuthModule`). Isso ajuda a organizar o código e a manter um baixo acoplamento entre os diferentes recursos.

### Camadas

Dentro de cada módulo, o código é organizado em várias camadas:

- **Controller**: Lida com as requisições HTTP de entrada, valida os dados da requisição e invoca os serviços apropriados.
- **Service**: Contém a lógica de negócios principal. Os serviços orquestram o fluxo de dados e interagem com a camada de repositório para acessar o banco de dados.
- **Repository**: Abstrai o acesso aos dados. Os repositórios fornecem uma interface para consultar e manipular entidades no banco de dados.

## Features

### Autenticação com JWT

A autenticação é implementada usando JSON Web Tokens (JWT). O fluxo de autenticação é o seguinte:

1. **Registro**: O usuário se registra com nome, email e senha. A senha é hasheada usando `bcrypt` antes de ser salva no banco de dados.
2. **Login**: O usuário faz login com email e senha. Se as credenciais estiverem corretas, um JWT é gerado e retornado ao usuário.
3. **Rotas Autenticadas**: Para acessar rotas protegidas, o usuário deve incluir o JWT no cabeçalho de autorização como um Bearer token.
4. **Validação do Token**: O `AuthGuard` intercepta as requisições para rotas protegidas e usa o `ValidateTokenService` para verificar a validade do token.

### Filtro Dinâmico

A listagem de tarefas (`GET /tasks`) suporta filtros dinâmicos, paginação e ordenação através de query parameters.

- `page`: Número da página (padrão: 1).
- `per_page`: Número de itens por página (padrão: 10).
- `filterBy`: Campos a serem filtrados (separados por vírgula).
- `filterType`: Tipos de filtro (separados por vírgula). Os tipos suportados são `equals`, `contains` e `in`.
- `filterValue`: Valores do filtro (separados por vírgula).
- `orderBy`: Campo para ordenação.
- `orderType`: Tipo de ordenação (`ASC` ou `DESC`).

**Exemplo de Uso:**

`GET /tasks?filterBy=status&filterType=eq&filterValue=completed&orderBy=created_at&orderType=DESC`

Esta requisição irá filtrar as tarefas onde o `status` é igual a `completed` e irá ordenar os resultados por `created_at` em ordem decrescente.

### PrimaryRepository e PrimaryEntity

Para agilizar o desenvolvimento e manter o código genérico, o projeto utiliza um `PrimaryRepository` e uma `PrimaryEntity`. A `PrimaryEntity` é uma classe base que define campos comuns a todas as entidades, como `id`, `created_at` e `updated_at`. O `PrimaryRepository` é um repositório genérico que fornece métodos da ORM diretamente ao serviço, que podem ser estendidos por repositórios específicos de cada entidade.

### Transações em Escopo de Controller

Para garantir a consistência dos dados, o projeto utiliza um middleware de transação que intercepta todas as requisições que não são do tipo `GET`. O middleware inicia uma transação no início da requisição e a commita no final, se tudo ocorrer bem. Em caso de erro, a transação é revertida (rollback), garantindo que nenhuma operação incompleta seja salva no banco de dados. Note que, é possível selecionar quais controller você quer que estejam em escopo de transação.

## Endpoints da API

A documentação completa da API com todos os endpoints disponíveis pode ser acessada em `http://localhost:3000/api`.

## Tecnologias Utilizadas

- **NestJS**: Framework Node.js para construir aplicações de servidor eficientes e escaláveis.
- **TypeORM**: ORM para TypeScript e JavaScript.
- **PostgreSQL**: Banco de dados relacional de código aberto.
- **Docker**: Plataforma para desenvolver, enviar e executar aplicações em containers.
- **JWT**: Padrão aberto para criar tokens de acesso.
- **class-validator** e **class-transformer**: Bibliotecas para validação e transformação de dados.

# nevoa-api
