# Anexo 1 - Classes em JavaScript

A versão ES6 do JavaScript introduziu uma sintaxe dedicada para criar classes. Isto veio unificar as várias formas possíveis de criar um objeto. Uma delas era com funções:

```javascript
function Pessoa(nome) {
    this.nome = nome;

    this.dizOla = function() {
        console.log("Olá, o meu nome é " + this.nome);
    };
}

let andre = new Pessoa("André");
andre.dizOla();
```

Funções podem ser usadas com o `new` para criar objetos, e a herança dos objetos é feita através do `prototype` (que também são objetos), ao contrário do Java.

## Sintaxe

Uma classe `Pessoa` em JavaScript seria:

```javascript
class Pessoa {
    constructor(nome) {
        this.nome = nome;
    }

    dizOla() {
        console.log("Olá, o meu nome é " + this.nome);
    }
}
```

## Herança e polimorfismo

Para uma classe herdar outra, usa-se o `extends`:

```javascript
class Animal {
    constructor(nome) {
        this.nome = nome;
    }
}

class Gato extends Animal {
    constructor(nome, raca) {
        // É obrigatoŕio chamar o super()
        super(nome);

        this.raca = raca;
    }
}

class Cao extends Animal {
    // Não sou obrigado a definir o construtor
}
```

Para verificar se um objeto é de um determinado tipo, usa-se o `instanceof`, tal como no Java:

```javascript
let tareco = new Gato();

if (tareco instanceof Gato) {
    // Tareco é um Gato
}

if (tareco instanceof Cao) {
    // Impossível
}

if (tareco instanceof Animal) {
    // Gato extends Animal
}
```

As mesmas regras do Java aplicam-se no JavaScript.

## Classes abstratas e interfaces

Não é suportado pelo JavaScript.

(Aparte: O [TypeScript](https://www.typescriptlang.org/) "suporta" isto, mas TypeScript está fora do currículo desta cadeira)

## Construtor

Classes em JavaScript só podem ter um construtor: `constructor` (ver exemplos acima). Se uma classe herda de outra, então o construtor tem que invocar o `super()` antes de poder usar o `this`.

## Usar atributos e métodos dentro da própria classe

Tem que se usar o `this` para referenciar atributos e métodos dentro da própria classe.

## Encapsulamento, override, overload

O `private` (ainda) não é suportado pelo JavaScript. Getters e Setters são opcionais. Os conceitos de Override e overload não existem.

## Notas

(Isto aplica-se ao JavaScript, não necessáriamente ao Java!)

-   Evitar usar classes. É mais fácil lidar com funções que criem objetos simples usando a notação das chavetas. Isto não se aplica se se precisa extender classes já existentes.
-   Evitar usar herança. É melhor usar composição de objetos.
