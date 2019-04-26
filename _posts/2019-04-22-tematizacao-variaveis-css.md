---
layout: post
title: "Tematização com Variáveis CSS"
date: 2019-04-22 15:35:00
author: wendell
image:
description: 'Criando temas utilizando variáveis no CSS'
tags:
- css
categories:
- 'Tematização com CSS'
twitter_text: 'Criando temas utilizando variáveis no CSS'
---

## Introdução

Seja criando um site ou uma área administrativa ou um app, sempre devemos criar um design consistente e sólido. Não podemos ter um software onde cada página utilize uma fonte diferente, ou botões de todas as cores e formas. Devemos criar um padrão não só pelo aspecto visual, mas quando criamos um padrão de cores e layout, os usuários do software conseguem aprender e se acostumar de forma mais rápida com nosso produto.

Para tornar esse processo mais fácil, há algum tempo atrás tínhamos de pedir ajuda para os **pré-processadores** de **CSS**, para podermos utilizar recursos como variáveis que facilitam nossas vidas quando o assunto é **tematização**. Felizmente não precisamos mais disso, pois o **CSS** já nos permite trabalhar com variáveis de forma nativa e nesse artigo iremos ver como utilizar esse recurso para criar um sistema de design simples, porém eficiente para nossos projetos.

## Declarando e Usando Variáveis

Declarar uma variável no CSS é bem simples. O nome das variáveis devem começar com `--` e são ***case-sensitive*** (diferenciam maiúsculas de minúsculas):

```css
.my-class {
    --font-size: 1rem;
}
```

Assim como é muito fácil declarar uma variável, utilizar uma variável também é muito simples. Basta utilizarmos a função `var()`. Essa função recebe dois parâmetros: o primeiro parâmetro é o nome da variável para pegar o valor e o segundo parâmetro é opcional e é um valor padrão que será utilizado caso a variável passada para o primeiro parâmetro não seja encontrada.

```css
.my-class p {
    font-size: var(--font-size, 0.8rem);
}
```

As variáveis no CSS herdam valores, ou seja, caso um valor não seja encontrado em um dado elemento, o valor do elemento pai será utilizado.

## Tematização em Duas Camadas

Se em nosso projeto, reunirmos todas nossas variáveis em um único local (Variáveis Globais), criamos uma única fonte de informação, mas não conseguimos modularizar muito bem nosso tema e sempre que um dev necessitar customizar um componente, ele deverá sobrescrever o CSS.

Por outro lado, se deixarmos de forma espalhada as variáveis, iremos criar um tema modularizado, mas perdemos consistência entre nossos componentes e se precisarmos fazer uma mudança geral, teremos muito trabalho.

Para resolver esse problema vamos pensar em nosso tema em duas camadas, teremos as **Variáveis Globais** e as **Variáveis de Módulo**. Dessa forma conseguimos aproveitar o melhor dos dois mundos.

## Variáveis Globais

Variáveis globais são variáveis genéricas que serão utilizadas para manter uma consistência entre todos os componentes de nosso projeto. Alguns exemplos de variáveis globais são: **fonte**, **tamanho padrão de textos** e **paleta de cores**. É muito simples definir variáveis globais no CSS, utilizamos o seletor `:root` e dentro desse seletor definimos nossas variáveis. Não é obrigatório, mas para ficar mais fácil de identificar que uma variável é global, gosto de colocar o prefixo `global-`, pois dessa forma ao ler o código já sei que aquele valor vem de uma variável global.

```css
:root {
    --global-font-family: Verdana, sans-serif;
    --global-font-size: 0.8rem;
    --global-text-color: #222;
    --global-primary-title-size: 2rem;
    --global-color-primary: #88498f;
    --global-color-secondary: #779fa1;
    --global-color-warning: #e28413;
    --global-color-danger: #ff6542;
}
```

No código acima, definimos algumas variáveis que serão utilizadas como base para todo nosso projeto: fonte, tamanho para os textos e para títulos principais, cor de fonte para os textos e uma paleta de cores com quatro cores diferentes. Agora vamos utilizar as variáveis globais que definimos:

```css
body {
    font-family: var(--global-font-family);
    font-size: var(--global-font-size);
    color: var(--global-text-color);
}

h1 {
    font-size: var(--global-primary-title-size);
}
```

No código acima definimos a fonte, tamanho e cor padrão para todo nosso produto e também o tamanho para os títulos principais. Se resolvermos alterar qualquer um desses valores no decorrer de nosso projeto, basta alterarmos a declaração das variáveis com os novos valores e pronto! Dessa forma conseguimos criar uma consistência em nosso produto e ainda criar um ponto de referência comum para que devs e designers possam trabalhar em conjunto de forma fácil e rápida.

## Variáveis de Módulo

São variáveis que possuem um escopo restrito onde ela é declarada. Toda variável de módulo deve ser definida pelo valor de uma variável global e devemos também passar um valor padrão para que caso o módulo esteja sendo usado em um ambiente que não forneça variáveis globais, continue funcionando sem problemas. Não é obrigatório, mas para ficar mais fácil de identificar que uma variável é de módulo, gosto de colocar o prefixo `MODULO-`, pois dessa forma ao ler o código já sei que aquele valor vem de uma variável do módulo **X**. Vamos pegar como exemplo o módulo para um botão:

```css
:root {
    ...
    --global-border-radius-sm: 3px;
    --global-text-color-light: #fff;
}

.btn {
    --btn-border-radius: var(--global-border-radius-sm);
    --btn-text-color: var(--global-text-color-light);
    border-radius: var(--btn-border-radius, 5px);
    color: var(--btn-text-color, #ddd);
}

.btn-primary {
    --btn-primary-bg: var(--global-color-primary);
    --btn-primary-border: var(--global-color-primary);
    background-color: var(--btn-primary-bg, #605770);
    border-color: var(--btn-primary-bg, #605770);
}

.btn-secondary {
    --btn-secondary-bg: var(--global-color-secondary);
    --btn-secondart-border: var(--global-color-secondary);
    background-color: var(--btn-secondary-bg, #7fc29b);
    border-color: var(--btn-secondary-bg, #7fc29b);
}
```

## Entendendo a Tematização em Duas Camadas

Ok, agora que vimos como estruturar o nosso tema, precisamos entender o porquê que esse sistema de **Tematização em Duas Camadas** funciona. Da forma que criamos nosso tema, fazemos com que nossos módulos sejam independentes, pois se eles estiverem sendo usados em um contexto onde tenha as variáveis globais, eles irão herdar os valores dessas variáveis, mas caso não encontre essas variáveis, também definimos valores padrões que serão utilizados.

Também fazemos com que alterações sejam muito fáceis de serem feitas. Por exemplo se quisermos mudar a cor primária de forma geral em nosso produto, basta alterarmos a variável global `--global-color-primary` que todos os módulos, inclusive nosso módulo `btn` será afetado. Agora imagine que queremos alterar a cor de todos os botões, podemos alterar a variável global `--global-text-color-light`, mas isso poderia afetar outors módulos, então basta alterarmos a variável de módulo `--btn-text-color` que apenas o texto do módulo `btn` seria afetado.

## Conclusão

Vimos como criar um tema consistente e adaptável para nossos projetos utilizando apenas CSS. Utilizando essa técnica de **Tematização em Duas Camadas**, criamos um ambiente e uma experiência melhor para os times de devs e designers. Abaixo você pode ver uma demonstração do código que criamos durante esse artigo em um Codepen que criei:

<p class="codepen" data-height="500" data-theme-id="dark" data-default-tab="css,result" data-user="WendellAdriel" data-slug-hash="QPxRjN" style="height: 500px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid black; margin: 1em 0; padding: 1em;" data-pen-title="Tematização com variáveis CSS">
  <span>See the Pen <a href="https://codepen.io/WendellAdriel/pen/QPxRjN/">
  Tematização com variáveis CSS</a> by Wendell Adriel (<a href="https://codepen.io/WendellAdriel">@WendellAdriel</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://static.codepen.io/assets/embed/ei.js"></script>

Espero que você tenha gostado e se você tiver curtido, não esqueça de comentar e compartilhar esse artigo com seus amiguinhos!!! Até a próxima! 😎
