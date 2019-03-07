# Aula 2 - Classes, eventos, e atualizações em React

## Objetivos

-   Introduzir classes JavaScript como mecanismo de criação de componentes
-   Eventos em React
-   Como lidar com atualizações no React

## Developer tools

Recomendo a instalação da extensão "React Developer Tools". Ela permite mostrar ao programador os resultados dos componentes que foram colocados na página:

-   Chrome: https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en
-   Firefox: https://addons.mozilla.org/en-US/firefox/addon/react-devtools/

Mais informação: https://github.com/facebook/react-devtools

## Componentes como classes

(Ver [Anexo 1 - Classes](anexos/anexo-1-classes.md) para mais informações sobre classes em JavaScript)

### Porquê classes?

Na aula 1, explorou-se usar funções como Componentes React. Para relembrar, uma função pode ser um Componente React desde que:

-   Tenha o seu nome a começar por letra MAIÚSCULA
-   Receba um argumento, `props`, que é sempre um objeto
-   Devolva (`return`) um Elemento React (`React.createElement`)

No entanto, funções são algo limitadas, porque:

-   Não podem reagir a eventos
-   Não podem "atualizar-se" enquanto estão a ser usadas (ex: contadores, guardar o texto que está numa caixa de texto, etc.)

(Nota: A versão 16.8.0 do React, lançada em 2019, introduziu "[Hooks](https://reactjs.org/docs/hooks-intro.html)", que permitem que funções desempenhem estas tarefas, mas é pouco provável que este conteúdo seja leccionado este ano devido a ser ainda demasiado recente)

Por isso, o React também permite usar classes como Componentes:

```javascript
class Ola extends React.Component {
    render() {
        let nome = this.props.nome;

        return React.createElement("p", null, "Olá, " + nome + "!");
    }
}
```

### Regras

Uma classe pode ser um componente React desde que:

-   Herde de `React.Component`
-   Implemente o método `render()`, que devolva um Elemento React
-   Se implementar um construtor, este deve:
    -   Receber um argumento, `props`
    -   O `props` deve ser passado na chamada ao `super()`

### Uso

O uso de uma classe é exatamente igual ao de uma função.

## Eventos em Componentes React

(Só para classes)

Definir um _event listener_ (ex: `onClick`) é semelhante a fazer-se da forma clássica:

```html
<button id="btnExemplo" onclick="fazCoisas()">Exemplo</button>
```

```javascript
function fazCoisas() {
    alert("Estou a fazer coisas!");
}
```

Nota: Deve-se evitar usar event listeners diretamente no HTML. Isto porque:

-   A função "alvo" tem que ser global
-   Não se deve colocar funções ou variáveis no objeto global
-   Estamos a "poluir" o HTML com JavaScript

(Para ver como se faz em JavaScript puro, ver a Aula 1.)

Em React, definir um event listener é feito com props e funções, da seguinte forma:

```javascript
class ExemploEventos extends React.Component {
    render() {
        return React.createElement(
            "button",
            {
                type: "button",
                // onClick e outros eventos do DOM usam funções. As funções são chamadas com o evento.
                onClick: (evt) => this.handleClick(evt)
            },
            "Exemplo"
        );
    }

    handleClick(evt) {
        alert("CLICK");
    }
}
```

No botão, estamos a passar um `onClick`. O valor associado é uma "Arrow Function" (ver Anexo 2), que por si só chama a função `handleClick` da classe `ExemploEventos`.

### Mais informações:

-   https://reactjs.org/docs/handling-events.html

## State

(Só para classes)

Uma das coisas úteis dos objetos é que estes podem ser atualizados. Eu posso mudar propriedades, adicionar novas, ou até removê-las. Em React, esta característica é igualmente útil, porque o React fará com que o nosso componente **automaticamente** atualize o "HTML" por si gerado, de cada vez que há uma atualização.

Relembro que uma das vantagens do React é ele tratar das atualiações do "HTML" por nós, em vez de termos que ser nós a fazê-lo.

### `this.state`

As classes que são componentes React têm uma propriedade especial: `this.state`. Isto é uma propriedade que, quando muda de valor, fará com que o componente se atualize (chamando novamente o método `render()`).

Para definir o `this.state`, é preciso usar o construtor:

```javascript
class ExemploState extends React.Component {
    constructor(props) {
        super(props); // Sou obrigado a chamar o super()

        this.state = {
            cliques: 0
        };
    }
}
```

**Atenção!:** O `this.state` será `null` se não for definido no construtor!

### `this.setState()`

Assumindo que se quer fazer um componente que conte o número de cliques num botão, um código possível seria o seguinte:

```javascript
class ExemploState extends React.Component {
    constructor(props) {
        super(props); // Sou obrigado a chamar o super()

        this.state = {
            cliques: 0,
            botaoAtivo: true
        };
    }

    render() {
        let numCliques = this.state.cliques;
        let botaoAtivo = this.state.botaoAtivo;
        return React.createElement(
            "div",
            null,
            React.createElement("p", null, "Nº cliques: " + numCliques),
            React.createElement(
                "button",
                {
                    type: "button",
                    onClick: (evt) => this.contaClique(evt),
                    disabled: botaoAtivo === false
                },
                "Click me!!!!!"
            )
        );
    }

    contaClique(evt) {
        this.state.cliques += 1;
    }
}
```

No entanto, isto não funciona. Devido a limitações no JavaScript, não é possível saber _quando_ é que uma propriedade num objeto muda de valor. Por isso, o React obriga-nos a usar um método especial nos componentes que são classes: `this.setState()`.

Este método recebe um argumento, que deve ser um objeto, e que deve conter os novos valores (para o React atualizar no objeto).

Revendo a classe `ExemploState`, nomeadamente o método `contaClique`, a correção seria:

```javascript
class ExemploState extends React.Component {
    // O construtor e render mantêm-se do exemplo acima.

    contaClique(evt) {
        this.setState({
            cliques: this.state.cliques + 1
        });
    }
}
```

É menos "bonito" que o código anterior, mas esta é a forma correta de atualizar o valor do `this.state.cliques` (num componente React).

### Notas

Sendo o `this.state` um objeto, eu posso guardar vários valores dentro dele, como assim o achar melhor. No entanto, devo evitar:

-   Copiar `props` para dentro do state
-   Usar o `state` para valores que podem ser calculados rapidamente num `render()`

Não é preciso passar todas as propriedades que estão dentro do `this.state` no `this.setState()`, **só aquilo que quero atualizar**. Reparem que no exemplo acima, só atualizo `this.state.cliques`, não `this.state.botaoAtivo`.

O valor do `this.state` não fica imediatamente disponível depois de um `this.setState()`. Isto porque o React tenta juntar várias atualizações numa só, de forma a minimizar o número de operações de atualização do DOM. No futuro, mostrar-se-ão técnicas para dar a volta a este problema.

O `this.state` deve ser o mais "flat" possível. Deve-se evitar, apesar de não ser impossível:

-   Objetos dentro de objetos
-   Arrays de arrays

Isto porque atualizar estes objetos é complicado no React (ver Anexo 3 - Imutabilidade)

### Mais informações:

-   https://reactjs.org/docs/state-and-lifecycle.html
