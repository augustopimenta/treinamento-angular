# Treinamento Angular

Projeto para demonstração das funcionalidades e técnicas de desenvolvimento utilizando Angular (7.0)

## O que faz?

O sistema é um gerenciador de despesas simples para o mercado interno da empresa (Com pão de queijo, brownie, salgados, etc...), para você saber o quando está gastando com comida!

## Olhada rápida

Existe um container do Docker pronto com a aplicação final, para isso execute o comando em seu terminal (com o docker já instalado)

````sh
docker run -d -p 3014:80 -p 3118:8080 --name treinamento-angular augustopimenta/treinamento-angular
````

As portas 3014 e 3118 devem estar disponíveis em sua maquina

(Obs: não troque a porta 3118:8080)

Acesse a aplicação no navegador em http://localhost:3014

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

## Branches e Funcionalidades

Foram criados vários branches ao longo do desenvolvimento dessa aplicação para ser mais simples verificar o progresso no código.

* **00.0/projeto-limpo** - Projeto após a criação do projeto base feito pelo CLI do Angular.
* **00.1/inicio** - Projeto após adição das dependencias de front(bootstrap, font-awesome) e linguagem(PT-BR).
* **01.0/componentes-basicos** - Criado o primeiro componente de cabeçalho.
* **01.1/componentes-basicos** - Criado o componente painel que será reutilizado pelos próximos componentes. 
* **01.2/componentes-basicos** - Criado o componentes de total, listagem de meses, e listagem de compras.
* **02.0/rotas** - Adicionando rotas para as telas de login, registro e principal
* **02.1/rotas** - Demonstração de como pegar parâmetros da url
* **02.2/rotas** - Demonstração de como pegar parâmetros da url (usando RxJS)
* **03.0/formularios** - Criando formulário de login básico
* **03.1/formularios** - Adicionando html e css do componente do form de registro
* **03.2/formularios** - Implementando validações e integração com reactive forms do angular
* **04.0/componentes** - Criando componente de loading
* **04.1/componentes** - Criando componente de modal genérico
* **04.2/componentes** - Criando componente de criação de compras
* **05.0/diretivas** - Criando uma diretiva com integração com forms
* **06.0/async** - Adicionando componente de visualização de força da senha com utilização do RxJS
* **06.1/async** - Adicionando validação de formulário async
* **06.2/async** - Implementando calculo de valor total utilizando Observable
* **06.3/async** - Adicionando componente de autocomplete
* **06.4/async** - Atualizando dados do componente de autocomplete com observable
* **06.5/async** - Criando componente de alert
* **06.6/async** - Criando service e integrando com componente global alert
* **06.7/async** - Criando componente de dialog de confirmação
* **06.8/async** - Criando service integrando com componente global de dialog
* **07.0/ngrx** - Configurando schematics do ngrx
* **07.1/ngrx** - Adicionando arquivos do ngrx básicos para autenticação
* **07.2/ngrx** - Efetuando login utilizando o ngrx
* **07.3/ngrx** - Implementando logout utilizando o ngrx
* **07.4/ngrx** - Obtendo nome do usuário da store
* **07.5/ngrx** - Obtendo dados de autenticação do localStorage
* **08.0/router-guard** - Adicionando guard para verificar autenticação
* **09.0/http-interceptor** - Adicionando interceptor para adicionar token no header e redirecionar para login em caso de status 401
* **10.0/ngrx-continuando** - Implementando registro de usuário com o ngrx
* **10.1/ngrx-continuando** - Adicionando estrutura do ngrx para o dashboard
* **10.2/ngrx-continuando** - Retornando total das compras utilizando ngrx
* **10.3/ngrx-continuando** - Retornando total de compras por mês utilizando ngrx
* **10.4/ngrx-continuando** - Obtendo mês selecionado pelo store do ngrx
* **10.5/ngrx-continuando** - Retornando lista de compras do mês usando o ngrx
* **10.6/ngrx-continuando** - Implementando cadastro de compra usando ngrx
* **10.7/ngrx-continuando** - Implementando edição de compra usando ngrx
* **10.8/ngrx-continuando** - Implementando exclusão de compra usando ngrx
* **10.9/ngrx-continuando** - Implementando função de pago/não pago usando ngrx
* **11.0/lazy-loading** - Implementando lazy loading do modulo DashboardModule
* **12.0/inicio-testes** - Aplicação finalizada sem testes
* **13.0/testes** - Componentes "sem" teste
* **13.1/testes** - Teste de componente com @Input
* **13.2/testes** - Teste de componente com @Input, @Output
* **13.3/testes** - Teste de outros componente com @Input, @Output
* **13.4/testes** - Teste de componente com projection
* **13.5/testes** - Teste de componente com @ContentChildren e métodos assincronos
* **14.0/testes-service** - Teste de service com requests http
* **14.1/testes-service** - Teste de service com observable
* **15.0/testes** - Teste de componente com subject
* **16.0/testes-diretiva** - Teste de diretiva com ControlValueAccessor
* **17.0/testes** - Teste de componente com ControlValueAccessor
* **18.0/guard** - Teste de guard
* **19.0/testes** - Teste de componente de modal com form e components de form custom
* **20.0/testes-ngrx** - Teste de selectors do ngrx
* **20.1/testes-ngrx** - Teste de reducers do ngrx
* **20.2/testes-ngrx** - Teste de effects do ngrx
* **21.0/testes-pages** - Teste de componente de página(login)
* **21.1/testes-pages** - Teste de componente de página(register)
* **21.2/testes-pages** - Teste para componente de pagina(home)
* **22.0/testes-interceptor** - Teste para interceptor de requests http


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
git checkout -b 00.0-projeto-limpo origin/00.0-projeto-limpo
````

Navegue para outro branch(Já tendo o branch localmente):
````sh
git checkout <nome-branch>
````
 
:)
