---
layout: post
title: "Trabalhando com Múltiplos Temas no CSS"
date: 2019-04-26 15:00:00
author: wendell
image:
description: 'Criando, alternando e gerenciando múltiplos temas no CSS'
tags:
- css
categories:
- 'Tematização com CSS'
twitter_text: 'Criando, alternando e gerenciando múltiplos temas no CSS'
---

## Introdução

No **[primeiro artigo dessa série](https://codeshare.com.br/tematizacao-variaveis-css)** vimos como funcionam as variáveis no CSS e como trabalhar com elas para criar temas para nossos projetos. Nesse artigo iremos colocar isso em prática criando alguns temas simples e vendo na prática como alternar entre temas.

## Criando o Tema Padrão

Como já vimos, o seletor `:root` pode ser usado para armazenar as variáveis globais de nossos temas. Para criar um tema padrão para nossa aplicação, vamos definir algumas variáveis nesse seletor, que serão utilizadas pelos nossos elementos:

```css
:root {
    --global-bg-color: #fff;
    --global-font-family: Verdana, sans-serif;
    --global-text-color: #222;
    --global-link-color: blue;
    --global-link-hover: lightblue;
}
```

No código acima definimos algumas variáveis que serão utilizadas como base para nosso tema. Dessa maneira podemos utilizar esses valores para estilizar nossos elementos. Como estamos apenas fazendo apenas um exemplo, o número de variáveis que temos são poucas, mas em um projeto grande essa lista pode ser bem maior. Vamos agora utilizar nossas variáveis:

```css
html {
    background: var(--global-bg-color);
    font-family: var(--global-font-family);
    color: var(--global-text-color);
}

a {
    color: var(--global-link-color);
    text-decoration: none;
    font-weight: 700;
}

a:hover {
    color: var(--global-link-hover);
}
```

No código acima usamos nossas variáveis para controlar as cores de fundo e do texto, a fonte utilizada e também cores de links. Se durante o projeto quisermos customizar qualquer um desses valores, basta alterar o valor da variável que desejamos e todos os elementos que utilizam essa variável irão ser alterados, muito simples. Agora vamos criar alguns elementos para vermos nosso tema em ação:

```html
<!DOCTYPE html>
<html>
    <head>
        <title>Tematização com CSS</title>
        <meta charset="UTF-8" />
        
        <style>
            <!-- STYLE HERE -->
        </style>
    </head>

    <body>
        <h1>Tematização com variáveis CSS</h1>
        <p>
            Exemplo para ser usado em um artigo na
            <a href="https://codeshare.com.br" target="_blank">CodeShare</a>
        </p>
    </body>
</html>
```

<iframe src="https://codesandbox.io/embed/wyr0q30wzk?fontsize=14&view=preview" title="Working with multiple CSS themes" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Criando um Tema para Modo Noturno

Agora que já temos nosso tema padrão, podemos trabalhar em um novo tema para nossa aplicação. Muitos sites possuem um **"Modo Noturno"** para facilitar a leitura durante a noite. Vamos criar um novo tema para essa finalidade.

Há algumas maneiras para se trabalhar com temas, mas a minha preferida é utilizando os atributos `data-` no **HTML**. Atributos `data-` são uma convenção utilizada para passar atributos customizados para as tags e para identificar qual tema vamos utilizar, vamos criar um atributo `data-theme` para esse fim. Todos os elementos que estiverem com esse atributo e seus elementos filhos serão modificados. Como nosso novo tema será um tema para o modo noturno, iremos nomear ele como ***dark (escuro)***.

Como nossos elementos já estão utilizando as variáveis que criamos, para criar um novo tema basta alterarmos os valores das variáveis que desejamos alterar, dessa forma os valores que mudarmos serão sobrescritos e os que não mudarmos serão herdados do elemento `:root`. Vamos utlizar o seletor de atributo no **CSS** para aplicarmos nosso tema. Como nosso tema noturno é um **Tema Global**, vamos condicionar ele à tag `<html>`:

```css
html[data-theme='dark'] {
  --global-bg-color: #444;
  --global-text-color: #ddd;
  --global-link-color: yellow;
  --global-link-hover: lightyellow;
}
```

No código acima alteramos as cores de fundo, texto e links. Agora basta colocarmos o atributo `data-theme="dark"` na tag `<html>` para vermos o resultado:

<iframe src="https://codesandbox.io/embed/mp42xzmnp?fontsize=14&view=preview" title="Working with multiple CSS themes #02" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Permitindo o Usuário alterar o Tema

Agora que criamos dois temas para nossa aplicação, seria muito interessante permitir que o usuário possa alternar entre esses temas correto? Não é algo difícil de se fazer, vamos criar essa opção. Primeiro vamos retirar o atributo `data-theme="dark"` da nossa tag `<html>` e criar um elemento que permitirá o usuário alternar entre os temas quando clicado.

```html
<!DOCTYPE html>
<html>
    ...
    <body>
        <span id="theme-toggle" class="theme-toggle"></span>
        ...
    </body>
</html>
```

Agora vamos estilizar esse nosso elemento, para isso iremos criar duas novas variáveis. Vamos fazer com que seja um elemento fixo na tela, fazendo com que onde quer que o usuário esteja, ele possa alternar o tema. Também iremos atribuir valores diferentes para as variáveis quando nosso tema ***dark*** estiver habilitado, de modo que o elemento também altere sua aparência:

```css
:root {
    ...
    --global-theme-toggle-bg: #ccc;
    --global-theme-toggle-content: '🌞 THEME';
}

html[data-theme='dark'] {
    ...
    --global-theme-toggle-bg: #000;
    --global-theme-toggle-content: '🌝 THEME';
}

.theme-toggle {
    position: fixed;
    right: 20px;
    top: 20px;
    background: var(--global-theme-toggle-bg);
    padding: 10px;
    border-radius: 5px;
    font-size: 0.8rem;
    font-weight: 700;
    cursor: pointer;
}

.theme-toggle::after {
    content: var(--global-theme-toggle-content);
}
```

Agora que temos a parte visual de nosso componente finalizada, vamos adicionar o comportamento necessário para fazer com que o tema seja alternado ao clicar em nosso elemento:

```js
function toggleTheme () {
    const htmlTag = document.getElementsByTagName("html")[0]
    if (htmlTag.hasAttribute("data-theme")) {
        htmlTag.removeAttribute("data-theme")
        return
    }

    htmlTag.setAttribute("data-theme", "dark")
}

document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
```

No código acima criamos uma função que vai pegar checar se a tag `html` tem um atributo `data-theme` e caso tenha irá remover esse atributo e caso não tenha irá adicionar esse atributo com o valor ***dark*** para ativar o tema para o modo noturno. Depois criamos um listener no elemento que criamos e quando ele receber um clique irá executar a função que criamos:

<iframe src="https://codesandbox.io/embed/m45wj6xz68?fontsize=14&view=preview" title="Working with multiple CSS themes #03" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Melhorias ao alternar entre Temas

Parabéns para nós! Já permitimos que nossos usuários possam trocar o tema do nossa aplicação, mas ainda tem algumas pequenas coisas que podemos melhorar. Por exemplo, ao trocar de tema, a troca está sendo feita de uma maneira muito súbita, seria interessante fazer com que a alteração fosse um pouco mais suave e podemos fazer isso de forma bem simples utilizando a regra `transition` do **CSS**, veja como é simples:

```css
html {
    ...
    transition: all 1s;
}

a {
    ...
    transition: all 1s;
}
```

E pronto!!! Veja como agora a transição entre os temas está sendo feita de maneira bem mais suave e agradável aos olhos!!! Mas ainda podemos melhorar mais uma coisa. Quando o usuário entrar em nossa aplicação e alternar entre os temas e sair, queremos que ao voltar, o site carregue o último tema escolhido pelo usuário, para isso vamos utilizar a `localStorage` para armazenar essa informação. Teremos de fazer uma pequena alteração em nossa função `toggleTheme` e criar mais uma função para nos auxiliar:

```js
function toggleTheme () {
    const htmlTag = document.getElementsByTagName('html')[0]
    if (htmlTag.hasAttribute('data-theme')) {
        htmlTag.removeAttribute('data-theme')
        return window.localStorage.removeItem("site-theme")
    }

    htmlTag.setAttribute('data-theme', 'dark')
    window.localStorage.setItem("site-theme", "dark")
}

function applyInitialTheme () {
    const theme = window.localStorage.getItem("site-theme")
    if (theme !== null) {
        const htmlTag = document.getElementsByTagName("html")[0]
        htmlTag.setAttribute("data-theme", theme)
    }
}

applyInitialTheme();

document
    .getElementById("theme-toggle")
    .addEventListener("click", toggleTheme);
```

Isso aí, agora já podemos oferecer uma experiência diferenciada para nossos usuários!!!

## Aplicando Temas em Partes Específicas

Vimos acima como criar e alternar entre dois **Temas Globais**, ou seja, que são aplicados em toda a aplicação, mas também podemos aplicar temas em partes específicas de nossa aplicação. Para ilustrar, vamos criar um tema que irá alterar apenas a fonte e aplicar em alguns elementos:

```css
[data-theme='comic'] {
    --global-font-family: 'Comic Sans MS';
}

p, span {
    font-family: var(--global-font-family);
}
```

```html
<body>
    <span data-theme="comic" id="theme-toggle" class="theme-toggle"></span>
    <h1>Tematização com variáveis CSS</h1>
    <p>
        Exemplo para ser usado em um artigo na
        <a href="https://codeshare.com.br" target="_blank">CodeShare</a>
    </p>

    <p data-theme="comic">
        Exemplo de um tema aplicado em partes específicas da página! Esse texto
        tem o tema "comic"!
    </p>
</body>
```

<iframe src="https://codesandbox.io/embed/nnqvpvmx1m?fontsize=14&view=preview" title="Working with multiple CSS themes #04" style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;" sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin"></iframe>

## Conclusão

Em nossos exemplos acima, trabalhamos com três temas simples, mas em projetos grandes a complexidade dos temas pode aumentar bastante. Pensando nisso criei uma lib chamada **[CSS Theme Manager](https://github.com/WendellAdriel/css-theme-manager)**, que facilita o gerenciamento de temas baseados em variáveis do CSS, confira e caso ache interessante, use em seus projetos!

Espero que você tenha gostado e se você tiver curtido, não esqueça de comentar e compartilhar esse artigo com seus amiguinhos!!! Até a próxima! 😎
