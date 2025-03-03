# Mars Rovers - Explorando Marte
Este projeto simula o controle de rovers em um planalto marciano. Os rovers recebem comandos para se moverem, seguindo instruções de controle. O projeto é composto por uma Web API em .NET para o backend e um frontend em React para a interface do usuário.

## Problema
Um conjunto de rovers foi enviado pela NASA à Marte e deve percorrer um planalto retangular, seguindo instruções de controle para se movimentar. As posições no planalto são representadas por coordenadas (x, y), e a direção da sonda é indicada por um ponto cardeal (N, S, E, W). As sondas recebem sequências de comandos (L, R, M) para girar e se mover. O projeto deve garantir que as sondas respeitem os limites do planalto e não colidam entre si.

## Como Configurar e Rodar o Projeto
### Pré-requisitos
- Docker instalado.
- Docker Compose instalado.
- SDK do .NET instalado (Para Testes).

### Passos para Executar
Clone o repositório:

```
git clone https://github.com/BezerraC/mars-rovers.git
cd mars-rovers
```

### Construa e execute os contêineres:

```
docker-compose up --build
```

### Acesse o frontend:

Abra o navegador e acesse [http://localhost:3000](http://localhost:3000).

### Acesse o backend:

O backend estará disponível em [http://localhost:5256](http://localhost:5256).

## Executar testes:

Para executar os testes localmente, navegue até o diretório `backend.Tests` e execute:

```
dotnet test
```

## Decisões de Projeto
### Formas de Entrada e Saída
- Web API em .NET: Optei por usar uma Web API em .NET para o backend devido à sua robustez, desempenho e facilidade de integração com o frontend.

- Frontend em React: Escolhi React para o frontend por ser uma biblioteca moderna, eficiente e amplamente utilizada.

### Design Patterns
- Command Pattern: Cada comando (L, R, M) foi encapsulado em uma classe separada que implementa uma interface comum (ICommand). Isso facilita a adição de novos comandos no futuro.

- Strategy Pattern: Utilizei este padrão para definir diferentes estratégias de movimento. Isso permite que, no futuro, diferentes tipos de rovers possam ter comportamentos de movimento distintos.

## Pipeline de CI
O projeto utiliza o GitHub Actions para executar um pipeline de CI que garante que o código seja compilado e testado automaticamente.

### Configuração do Pipeline
O pipeline está configurado no arquivo [.github/workflows/ci.yml](.github/workflows/ci.yml) e é acionado nas seguintes situações:

- Push para a branch main.

- Pull request para a branch main.

### Etapas do Pipeline
Checkout do código: O código é baixado do repositório.

Configuração do .NET SDK: A versão especificada do .NET SDK é instalada.

Restauração das dependências: As dependências do projeto são restauradas usando dotnet restore.

Build do projeto: O projeto é compilado usando dotnet build.

Execução dos testes: Os testes são executados usando dotnet test.

### Como Acompanhar os Resultados
1. Acesse a aba **Actions** no GitHub.

2. Clique no pipeline mais recente para ver os detalhes da execução.

3. Verifique os logs para ver se o build e os testes foram bem-sucedidos.

Em caso de falha, os logs ajudarão a identificar o problema.

## Docker
O projeto foi containerizado usando Docker para facilitar a execução em qualquer ambiente.

### Backend (.NET)
O backend é executado em um contêiner Docker, expondo a porta 5256.

O Dockerfile do backend está localizado em **backend/Dockerfile**.

### Frontend (React)
O frontend é executado em um contêiner Docker, expondo a porta 3000.

O Dockerfile do frontend está localizado em **frontend/Dockerfile**.

## Execução com Docker Compose
O arquivo **docker-compose.yml** orquestra a execução dos contêineres do backend e frontend.

Para rodar o projeto, use:

```
docker-compose up --build
```

## Testes
Os testes foram implementados usando xUnit e são executados com o comando `dotnet test`. Eles cobrem cenários como:

- Movimentação básica e mudança de direção.

- Respeito aos limites do planalto.

- Conflito de posição entre rovers.

Para executar os testes localmente, navegue até o diretório **backend.Tests** e execute:

```
cd backend.Tests
dotnet test
```

## Debugging e Troubleshooting
Durante o desenvolvimento deste projeto, utilizei as ferramentas de debugging do VSCode para investigar problemas relacionados ao movimento dos rovers, especialmente na parte que envolve a atualização das posições e a verificação de colisões.

### Exemplo de Debugging no Código
No código da classe `StandardMovementStrategy`, identifiquei que o método Move não estava removendo a posição anterior do rover corretamente. Isso foi detectado ao inspecionar a lista `occupiedPositions` durante a execução, e adicionei um código de debugging logo após a movimentação para garantir que a posição anterior fosse removida antes de atualizar a nova posição:

```
// Debugging: Remove previous position before updating
// Identified during debugging that the previous position was not being removed
occupiedPositions.Remove((rover.X, rover.Y));
```

Esse passo foi essencial para corrigir o comportamento do sistema, pois permitiu que as posições dos rovers fossem atualizadas corretamente na lista de ocupação.

### Configuração do launch.json
Para facilitar o processo de debugging, configurei o arquivo launch.json no VSCode para garantir que o ambiente de execução fosse corretamente configurado para a depuração do código .NET. O arquivo launch.json foi configurado da seguinte maneira:

```
{
    "version": "0.2.0",
    "configurations": [
      {
        "name": "Attach to Docker (Backend)",
        "type": "coreclr",
        "request": "attach",
        "processId": "1",
        "pipeTransport": {
          "pipeProgram": "docker",
          "pipeArgs": [
            "exec",
            "-i",
            "mars-rovers-backend-1",
            "/usr/share/dotnet/dotnet",
            "watch",
            "run",
            "--urls",
            "http://0.0.0.0:5257"
          ],
          "debuggerPath": "/usr/share/dotnet/dotnet"
        }
      }
    ]
  }
```

Essa configuração garante que o VSCode possa iniciar o backend .NET corretamente e me permitir depurar a aplicação sem problemas.

## Considerações Finais
Extensibilidade: O uso de Design Patterns como Command e Strategy permite que o projeto seja facilmente estendido no futuro.

CI/CD: A integração contínua com GitHub Actions garante que o código seja sempre testado e validado antes de ser integrado à branch principal.

Containerização: O uso de Docker facilita a execução do projeto em qualquer ambiente, garantindo consistência entre desenvolvimento e produção.

Debugging e Troubleshooting: Durante o desenvolvimento, foram feitas diversas investigações e correções utilizando ferramentas de debugging, como as do VSCode, para resolver problemas críticos, como a atualização das posições dos rovers e a verificação de colisões. A utilização de um arquivo [launch.json](.vscode/launch.json) também garantiu que o ambiente de desenvolvimento fosse otimizado para o processo de depuração.