# Arquitetura do Projeto

Este projeto NestJS segue uma arquitetura modular e em camadas, projetada para separação de responsabilidades, testabilidade e escalabilidade.

## Módulos

Cada recurso principal da aplicação é encapsulado em seu próprio módulo (por exemplo, `UsersModule`, `SellsModule`, `TasksModule`, `AuthModule`). Isso ajuda a organizar o código e a manter um baixo acoplamento entre os diferentes recursos.

## Camadas

Dentro de cada módulo, o código é organizado em várias camadas:

### 1. Camada de Controller

- **Responsabilidade:** Lidar com as requisições HTTP de entrada, validar os dados da requisição e invocar os serviços apropriados.
- **Exemplo:** `TasksController` (`src/modules/tasks/controller/tasks.controller.ts`) define rotas para operações CRUD em tarefas, usando decoradores como `@Get`, `@Post`, `@Put` e `@Delete`. Ele delega a lógica de negócios para os serviços.

### 2. Camada de Serviço

- **Responsabilidade:** Conter a lógica de negócios principal. Os serviços orquestram o fluxo de dados e interagem com a camada de repositório para acessar o banco de dados.
- **Exemplo:** `CreateTaskService` (`src/modules/tasks/services/createTask.service.ts`) lida com a criação de uma nova tarefa. Ele recebe os dados do controller, cria uma instância da entidade `Task` e a salva usando o `TaskRepository`.

### 3. Camada de Repositório

- **Responsabilidade:** Abstrair o acesso aos dados. Os repositórios fornecem uma interface para consultar e manipular entidades no banco de dados, ocultando os detalhes da implementação do ORM (TypeORM).
- **Exemplo:** `TaskRepository` (`src/modules/tasks/repositories/task.repository.ts`) estende um `PrimaryRepository` genérico e é responsável por todas as interações com o banco de dados para a entidade `Task`.

## Autenticação

A autenticação é implementada usando JSON Web Tokens (JWT). O fluxo de autenticação é o seguinte:

1.  **Registro:** O usuário se registra com nome, email e senha. A senha é hasheada usando `bcrypt` antes de ser salva no banco de dados.
2.  **Login:** O usuário faz login com email e senha. A senha fornecida é comparada com a senha hasheada no banco de dados. Se as credenciais estiverem corretas, um JWT é gerado e retornado ao usuário.
3.  **Rotas Autenticadas:** Para acessar rotas protegidas, o usuário deve incluir o JWT no cabeçalho de autorização como um Bearer token.
4.  **Validação do Token:** O `AuthGuard` intercepta as requisições para rotas protegidas e usa o `ValidateTokenService` para verificar a validade do token. Se o token for válido, o usuário é extraído do token e anexado ao objeto da requisição.

## Filtro Dinâmico

A listagem de tarefas (`GET /tasks`) suporta filtros dinâmicos, paginação e ordenação através de query parameters.

### DTO de Requisição

O DTO `ListTasksRequest` (`src/modules/tasks/controller/request/listTasks.request.ts`) define os parâmetros de consulta disponíveis:

- `page`: Número da página (padrão: 1).
- `per_page`: Número de itens por página (padrão: 10).
- `filterBy`: Campos a serem filtrados (separados por vírgula).
- `filterType`: Tipos de filtro (separados por vírgula). Os tipos suportados são `equals`, `contains` e `in`.
- `filterValue`: Valores do filtro (separados por vírgula).
- `orderBy`: Campo para ordenação.
- `orderType`: Tipo de ordenação (`ASC` ou `DESC`).

### Validação

O DTO usa `class-validator` para validar os parâmetros de entrada. As seguintes validações são aplicadas:

- `page` e `per_page` devem ser números positivos.
- `filterBy`, `filterType`, e `filterValue` devem ser strings e devem ser fornecidos juntos.
- `orderBy` é obrigatório se `orderType` for fornecido.
- O número de valores separados por vírgula em `filterBy`, `filterType`, e `filterValue` deve ser o mesmo. Esta validação é implementada usando o validador customizado `IsEqualLength`.

### Exemplo de Uso

`GET /tasks?filterBy=status,title&filterType=equals,contains&filterValue=done,My%20Task&orderBy=createdAt&orderType=DESC`

Esta requisição irá filtrar as tarefas onde o `status` é igual a `done` e o `title` contém `My Task`, e irá ordenar os resultados por `createdAt` em ordem decrescente.
