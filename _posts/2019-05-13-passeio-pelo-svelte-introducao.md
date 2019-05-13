---
layout: post
title: "Um Passeio Pelo Lado do Svelte: Introdução"
date: 2019-05-13 13:00:00
author: wendell
image:
description: 'Conheça o Svelte 3, um novo modo de criar UIs reativas'
tags:
- js
- svelte
categories:
- 'Um Passeio Pelo Lado do Svelte'
twitter_text: 'Conheça o Svelte 3, um novo modo de criar UIs reativas'
---

## Introdução

Você pode ter entrado nesse artigo porque ouviu esse nome em algum lugar e não sabe muito bem o que é, ou já sabe o que é, mas quer conhecer mais sobre ou está apenas se perguntando algo tipo **"Por que eu preciso de outra lib para UIs reativas se já tenho React e Vue?"**. Bom, seja lá qual o motivo que te trouxe até aqui, se prepare pois vamos embarcar em uma aventura: **Um Passeio Pelo Lado do Svelte** é a nova série de artigos da **CodeShare** onde irei mostrar o que é o Svelte, suas principais features e vamos construindo exemplos ao longo dessa série, onde no final você estará pronto pra começar a utilizar essa lib em seus projetos!

Esse primeiro artigo teremos uma parte um pouco mais teórica, mas que é importante para que você entenda como o **Svelte** se diferencia de outras libs, sugiro que leia com atenção para depois podermos mergulhar no código.

## O que é o Svelte

O **Svelte**, assim como outras libs de UI, é baseado em componentes, porém com uma diferença essencial e muito importante: diferente de libs como **[React](https://reactjs.org)** ou o **[Vue.js](https://vuejs.org)**, ele não utiliza a **diferenciação em DOM virtual** pois essas libs utilizam estruturas declarativas que são então convertidas em operações no DOM que podem acabar por sobrecarregar um pouco os frames de nossas apps e também o **[Garbage Collector](https://codeshare.com.br/garbage-collector-no-javascript)**.

Mas então como o **Svelte** trabalha? Todo o trabalho é feito na etapa de construção da aplicação, assim ele converte todos seus componentes em um código imperativo de alta performance que realiza o mínimo de alterações possíveis no DOM, fazendo assim que o **Svelte** "desapareça" por completo do seu código final, você vai ter um código JavaScript imperativo puro e de alta performance. Podemos destacar alguns aspectos importantes do **Svelte**:

* Performance extraordinária
* Bundles de tamanho reduzido
* Aspectos de acessibilidade inclusos na própria lib
* Encapsulamento de estilos por padrão
* Transições declarativas inclusas na própria lib
* Curva de aprendizado

E no final de tudo, a resposta pra nossa pergunta: **"O que é o Svelte?"** pode ser respondida falando que ele é um compilador, pois seu trabalho é compilar os componentes em um código JavaScript imperativo.

## Reatividade no Svelte

A versão 3 do Svelte lançada em 21 de Abril trouxe enormes mudanças para a lib, fazendo com que o código escrito seja mais limpo e remodelando como se trabalhar com a reatividade nos componentes. Por exemplo, antes dessa nova versão, para se atualizar o estado dos nossos componentes precisávamos fazer algo assim:

```js
const { clicks } = this.get()
this.set({ clicks: clicks + 1 })
```

Se você já tiver trabalhado com **React**, provavelmente irá notar uma grande semelhança em como se era tratado o estado de um componente baseado em classe (antes do lançamento dos famosos **[Hooks](https://reactjs.org/docs/hooks-intro.html)**):

```js
const { clicks } = this.state
this.setState({ clicks: clicks + 1 })
```

Com o lançamento dos **Hooks**, a forma com que o **React** trabalha com o estado dos componentes foi alterada de forma significativa e algumas outras libs começaram a criar suas próprias versões dos **Hooks**. O **Svelte** não quis seguir esse caminho, pois por detrás das cortinas eles criam uma certa sobrecarga para o **[Garbage Collector](https://codeshare.com.br/garbage-collector-no-javascript)** e se você precisar executar esse tipo de código em um **dispositivo embarcado** ou se sua app depende de muitas interações baseadas em animações isso pode gerar alguns problemas.

Então como o **Svelte 3** trabalha com reatividade e atualização de estado de um componente? De forma bem simples, sem o uso de **proxies** nem nada parecido. Quando queremos alterar por exemplo uma variável de estado `clicks`, basta atualizarmos ela:

```js
clicks += 1
```

Como o trabalho do **Svelte** é feito em tempo de construção da aplicação, por ser um compilador, ele pode apenas fazer a instrumentação dessas atualizações, sem nenhuma complexidade adicional. Por detrás das cortinas o que ele faz é:

```js
clicks += 1
$$invalidate('count', count)
```

## Performance no Svelte

Uma das principais diferenças do **Svelte** para outras libs como **React** e o **Vue** é que ele não usa o **DOM Virtual**, mas você deve estar pensando: como ele consegue ser rápido sem utilizar o **DOM Virtual**? Se você trabalha com **Front-end** (ou até mesmo Back-end, mas gosta de ler sobre), provavelmente já dever ouvido falar sobre o **DOM Virtual** e que trabalhar com ele é mais performático do que com o **DOM Real**.

Mas o que é o **DOM Virtual** e como as libs trabalham com ele? De uma forma bem simples, o **DOM Virtual** nada mais é do que um objeto JavaScript que define a estrutura de sua página. Quando ocorre alguma alteração no estado da sua aplicação, por exemplo o valor de alguma propriedade é alterado, é criado um novo objeto e o que a lib faz é a diferenciação do objeto antigo com o novo objeto para fazer o menor número de alterações possíveis para então aplicar no **DOM Real**.

Na prática, não há como fazer nenhuma alteração no **DOM Real** sem antes comparar os dois estados do **DOM Virtual**, mas isso pode gerar alguns passos desnecessários. O **Svelte** como trabalha como um compilador, no etapa de construção da aplicação ele já sabe como o estado da sua aplicação pode ser alterado, então ele gera o menor número de passos possíveis para gerenciar essas possíveis alterações, sem ter nenhum trabalho extra durante a execução da aplicação.

## Criando nosso primeiro componente Svelte

Uma das principais características do **Svelte** é permitir construirmos aplicações de forma mais simples e escrevendo menos código. Quanto maior o código, maior é o esforço para entendermos ele e maior é a chance de termos bugs, então ao escrever menos código, temos o benefício de conseguirmos entender ele mais rapidamente e de introduzirmos menos bugs.

Vamos criar nosso primeiro componente, que será algo bem simples. Teremos dois campos de texto onde iremos fornecer nosso primeiro e último nome respectivamente e será mostrado na tela uma mensagem de boas vindas com nosso nome completo. Os componentes do **Svelte** utilizam a extensão `.svelte`, onde declaramos:

* o comportamento do nosso componente com JavaScript dentro de uma tag `<script>`

* o estilo do nosso componente com CSS dentro de uma tag `<style>`, sendo que os estilos declarados no componente possuem o escopo restrito àquele componente, ou seja, se você criar uma regra para alterar o estilo das tags `<p>` do seu componente, ela não irá alterar nenhuma outra tag `<p>` fora do seu componente

* a estrutura do nosso componente com HTML, não sendo necessário encapsular essa estrutura em uma tag `<template>` como no caso do **Vue** e também podendo ter vários elementos raiz, diferente do **React** que podemos retornar apenas um elemento ou utilizar os **[Fragments](https://reactjs.org/docs/react-api.html#fragments)**

Primeiro temos a parte do comportamento do nosso componente, que será apenas um código JavaScript totalmente normal e básico. Iremos criar duas variáveis e definir uma função que iremos utilizar quando estivermos definindo a estrutura de nosso componente:

```html
<script>
    let firstName = ''
    let lastName = ''

    function showGreeting () {
        window.alert(`Welcome, ${firstName} ${lastName}`)
    }
</script>
```

Logo abaixo iremos definir também o estilo de nosso componente que também é um código CSS normal, a única diferença e que já foi apontada acima é que os estilos aqui declarados irão afetar apenas e somente os elementos desse componente:

```html
<style>
    * {
        font-family: sans-serif;
    }

    p {
        font-weight: 700;
    }

    .warning {
        color: #ff2b56;
    }
</style>
```

A última parte de nosso componente é a estrutura do nosso componente, que é feita com HTML, com apenas alguns pequenos detalhes que iremos verificar:

```html
<label for="first_name">First name:</label>
<input id="first_name" type="text" bind:value={firstName}>

<label for="last_name">Last name:</label>
<input id="last_name" type="text" bind:value={lastName}>

{#if firstName.length > 0 && lastName.length > 0}
    <p>Hello, {`${firstName} ${lastName}`}</p>
    <p>
        <button type="button" on:click={showGreeting}>Show alert greeting!</button>
    </p>
{:else}
    <p class="warning">Type your first and last name above...</p>
{/if}
```

Como podem ver temos alguns detalhes que não fazem parte de um código HTML em nossa estrutura, mas que são utilizadas para conectar a estrutura do nosso componente com seu comportamento. Nos nossos elementos `<input>` a declaração do atributo `value` sofre uma pequena mudança para `bind:value={variavel}`, onde fazemos a ligação de uma variável de estado do nosso componente, de forma que quando essa variável for alterada a mudança irá se refletir no elemento `<input>` e vice-versa.

Assim como é fácil fazer a ligação entre variáveis de estado, invocar funções que definimos quando acontece algum evento no DOM também é muito fácil, utilizamos `on:evento={funcao}`. No nosso código, quando o botão recebe um clique ele irá invocar a nossa função `showGreeting` definida anteriormente.

Muitas vezes precisamos mostrar ou esconder algum conteúdo de acordo com o estado do nosso componente, o **Svelte** nos oferece uma forma simples de fazer isso com os blocos: `{#if} {:else if} {:else} {/if}`, dessa forma conseguimos controlar de forma simples e limpa o que e quando exibir e esconder algum conteúdo.

O nosso exemplo pode ser visto no **CodeSandbox** abaixo:

<iframe src="https://codesandbox.io/embed/84ljk782w0?fontsize=14&view=preview" title="Svelte 101" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

Como vocês podem ver no **CodeSandbox** acima, temos um arquivo `index.js` que importa nosso componente e o renderiza no `<body>`. Esse arquivo juntamente com os arquivos `package.json` e a configuração do **[Rollup](https://rollupjs.org)**, o bundler padrão que o **Svelte** utiliza, `rollup.config.js` já estão inclusos no template padrão do **Svelte**.

Você pode brincar com o **CodeSandbox** para não precisar criar os projetos localmente, mas caso você queira também é muito fácil. Podemos utilizar o **NPX** para criar nosso projeto de forma bem simples:

```bash
npx degit sveltejs/template my-app && cd my-app && yarn
```

Dessa forma você irá criar um projeto utilizando uma ferramenta chamada **Degit** que irá fazer uma cópia **[desse repositório](https://github.com/sveltejs/template)** que é um template padrão mínimo de uma aplicação, com toda configuração necessária. Se você preferir ou quiser fazer alguma modificação no template padrão você pode fazer um **fork** **[desse repositório](https://github.com/sveltejs/template)** e alterar o comando acima para utilizar seu usuário do Github:

```bash
npx degit your-github-user/template my-app && cd my-app && yarn
```

No arquivo `README.md` do template você irá encontrar instruções para executar seu projeto localmente e também instruções em como fazer deploy de sua aplicação.

## Conclusão

Nesse primeiro artigo vimos o que é o **Svelte**, suas principais características e construímos nosso primeiro componente para vermos como ele funciona. Nos próximos artigos iremos aprofundar mais em outras características dessa lib enquanto criamos exemplos para colocar em prática os conceitos que aprendermos.

Espero que você tenha gostado e se você tiver curtido, não esqueça de comentar e compartilhar esse artigo com seus amiguinhos!!! Até a próxima! 😎
