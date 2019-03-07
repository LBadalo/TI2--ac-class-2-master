# Anexo 3 - Imutabilidade

Imutabilidade é a característica de um objeto não se poder mudar depois deste ser criado. À primeira vista, pode parecer uma péssima ideia (desempenho por alocações de memória), mas para linguagens de programação como o Erlang, que são feitas para cálculo paralelo e distribuído, imutabilidade é essencial para impedir corrupção de dados.

Apesar de não estarmos numa situação de cálculo paralelo e distribuído, imutabilidade pode ajudar a prevenir bugs causados quando se mudam objetos diretamente.

Além disso, o modelo de atualização do React obriga-nos a usar imutabilidade, para ele "perceber" o que mudou.

Em JavaScript, imutabilidade significa criar novos objetos, sem alterar os já existentes, de cada vez que é feita uma alteração.

Mais informação:

-   https://www.quora.com/Why-is-immutability-so-important-in-software-development
-   https://stackoverflow.com/questions/34385243/why-is-immutability-so-important-or-needed-in-javascript

## Números, strings, booleanos

Não é preciso fazer nada, já que estes valores são imutáveis. Cada operação sobre valores destes tipos produz um novo objeto, sem alterar o anterior.

## Arrays

Arrays podem ser mutadas (editadas):

-   Posso usar os métodos `push()`, `unshift()`, `shift()`, e `pop()` para adicionar ou remover elementos do array
-   Posso usar o `sort()` para ordenar o array
-   Posso usar a notação dos parêntesis rectos (`arr[5] = 10`) para definir valores
-   Posso mudar o `length`
-   Entre outros

No entanto, como estes métodos editam o array já existente, violando a regra da imutabilidade.

Para criar uma cópia do array, pode-se usar o método `slice()`:

```javascript
let original = [1, 2, 3, 4, 5];

let copia = original.slice();

copia === original; // falso, são objetos diferentes

copia[2] = 10;

copia; // [1, 2, 10, 4, 5]
original; // [1, 2, 3, 4, 5]
```

O `slice()` copia os valores para um novo array. Atenção que, se os valores do array forem mutáveis (ex: arrays de objetos), editar num vai editar nos dois.

## Objetos

Objetos também devem ser tratados com cuidado, e se for preciso alterar alguma coisa, deve-se fazer uma cópia.

Felizmente, existe um método para isso: `Object.assign`:

```javascript
let original = {
    nome: "André"
};

let copia = Object.assign({}, original);

copia === original; // falso, são objetos diferentes

copia.nome = "José";

copia; // { nome: "José" }
original; // { nome: "André" }
```

## Aparte: Angular.JS 1

O Angular.JS 1 não precisava de `this.setState()` ou imutabilidade para saber o que é que tinha mudado. Em vez disso, a estratégia implementada por esta versão era equivalente a estar constantemente a ver o valor do objeto, e a comparar com um valor anterior.

Apesar de, no final do dia, ser mais agradável para o programador, em aplicações "grandes", isto tornava-se num problema de desempenho, porque as verificações demoravam algum tempo.

Quando o React introduziu imutabilidade à programação web, o desempenho associado a não se ter que fazer estas verificações surtiu efeitos nas versões seguintes do Angular.JS.
