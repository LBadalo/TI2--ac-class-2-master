# Anexo 2 - Arrow functions

Existe uma forma mais sucinta de escrever funções em JavaScript, introduzida na versão ES6. Estas funções têm algumas vantagens:

-   Sintaxe mais concisa
-   Menos "bagagem" (ex: `arguments`)
-   O `this` é tratado de forma diferente

## Sintaxe

Estas funções têm a seguinte sintaxe:

```javascript
let soma = (n1, n2) => n1 + n2;
```

Quando se usa esta notação, sem chavetas, a seta (`=>`) representa o `return`. Nota: sem chavetas, não é possível usar estruturas como `if`, `for`, declarar variáveis, etc.

---

A função acima pode ser escrita também da seguinte forma, com chavetas:

```javascript
let soma = (n1, n2) => {
    return n1 + n2;
};
```

Quando se usam chavetas, já é possível fazer tudo o que as funções normais permitem fazer. No entanto, se se pretende devolver alguma coisa, é preciso usar o `return`.

---

Finalmente, a sintaxe "clássica":

```javascript
function soma(n1, n2) {
    return n1 + n2;
}
```

## A chatice do `this`

O `this` é confuso em JavaScript. Assumindo o seguinte código:

```javascript
class Pessoa {
    constructor(nome) {
        this.nome = nome;
    }

    dizOla() {
        console.log("Olá! O meu nome é " + this.nome);
    }
}

let andre = new Pessoa("André");

// Assumindo que existe tal botão...
let btn = document.getElementById("btnTeste");

btn.onClick = andre.dizOla;
```

Quando se clica no botão, está-se à espera que apareça na consola "`Olá! O meu nome é André`", no entanto, o que acontece é "`Olá! O meu nome é undefined`".

Isto porque o `this` em `dizOla` não é um objeto do tipo `Pessoa` (variável `andre`), mas sim o botão (`btnTeste`). O `this` numa função varia com a forma como é chamada.

(Aparte do docente: Existem tantos casos em que o `this` muda de valor, que nem eu sei todos os casos... mais vale usar as abordagens abaixo...)

### `bind`

Para corrigir isto, existe uma função, `bind`, que pode ser usada, da seguinte forma:

```javascript
btn.onClick = andre.dizOla.bind(andre);
```

Isto força o valor do `this` na função para ser sempre o objeto `andre`. O que dá jeito. Mas, esta função pode ser confusa.

### `=>`

Por isso, recomenda-se o uso de Arrow Functions, da seguinte forma:

```javascript
btn.onClick = () => andre.dizOla();
```

## Mais informações:

-   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions
-   https://hacks.mozilla.org/2015/06/es6-in-depth-arrow-functions/
