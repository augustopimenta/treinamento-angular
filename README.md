# Treinamento Angular

Projeto para demonstração das funcionalidades e técnicas de desenvolvimento utilizando Angular (7.0)

## O que faz?

O sistema é um gerenciador de despesas simples para o mercado interno da empresa (Com pão de queijo, brownie, salgados, etc...), para você saber o quando está gastando com comida!

## Requisitos

* NodeJS versão 8 ou superior

## Rodando a aplicação

__Atenção__: Existe uma segunda aplicação no diretório server em NodeJS que é usada como webservice para o front-end que deve ser iniciada junto!

Com a aplicação já clonada em sua maquina:

* Instale as dependencias do front-end:

````sh
npm install
````

* Navegue até server/ e instale as dependencias do back-end:

````sh
npm install
````

* Navegue até server/ e rode o backend:

````sh
npm start
````

* Em um outro terminal e rode o front-end:

````sh
npm start
````

## Acessando

Com o front-end e back-end em funcionamento é possível acessar aplicação pela url: 

* Front-end: http://localhost:4200
* Back-end: http://localhost:8080

## Rodando os testes

A aplicação(front-end) conta com ao menos 80% de cobertura de testes unitários e de componente. Para rodar os testes execute no terminal:

````sh
npm test
````

Caso queira rodar os testes com o relatório de cobertura utilize:

````sh
npm run test:co
````

## Navegando entre os branches

Conforme o desenvolvimento dessa aplicação vários branchs foram criados em várias etapas.
Para navegar entre eles e nescessário os seguintes comandos no terminal:

Veja todos os branches:
````sh
git branch -a
````

Navegue para outro branch(Caso não o tenha ainda):
````sh
git checkout -b <nome-branch> origin/<nome-branch>
````
 
Por exemplo:
````sh
git checkout -b 0-projeto-limpo origin/0-projeto-limpo
````

Navegue para outro branch(Já tendo o branch localmente):
````sh
git checkout <nome-branch>
````
 
 
:)
