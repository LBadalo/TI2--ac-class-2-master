// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...
/**
 * Representa a aplicação inteira, ou , o ponto de "arranque"
 * da aplicação de tarefas
 * 
 * É responsável por montar os componentes principais da interface gráfica,
 * Gerir a adição de novas tarefas na lista,
 */
class TodoApp extends React.Component {
    /**
     * 
     * @param {Object} props serve para o "valor inicial" das propriedades
     * do objecto quando este é criado.(Uma técnica comum é copiar um valor do "props")
     * para o 'this.state', mas atenção que pode dar chatices).
     */
    constructor(props) {
        //A invocação do 'super' implica passar as props.
        super(props);

        //Atualiza-se automaticamente ao mudá-lo(É sempre um objecto)
        this.state = {
            /**
             * Representa a lista das tarefas que será mostrada no ecrã
             * e com a qual o utilizador pode interagir.
             */
            listaTarefas: [
                "Dar de comer ao gato",
                "Estudar TI2 "
            ]
        }
    }
    //Retorna a interface a ser mostrada ao utilizador.
    render() {
        /**
         * JSX
         * <div>
         *  <input type= "text" id= "txtTodo" />
         * <button type="button" onClick = {(evt) -> this.handleAddButtonClick(evt)}
         * +
         * </button>
         * <ListaTodos items={this.state.listaTarefas} />
         * </div>
         */

        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", id: "txtTodo" }),
            React.createElement("button", {
                type: "button", onClick: (evt) => this.handleAddButtonClick(evt)
            },
                "+"),
            React.createElement(ListaTodos, {
                items: this.state.listaTarefas,
                //Esta função é passada, por parâmetros, para dentro da lista
                //de tarefas, e pode ser acedida via 'props.onDeleteTodo(5) (p.e)
                //para PEDIR que seja apagada uma tarefa da lista, no indice 'idx'.
                onDeleteTodo: (idx) => this.handleDeleteTodo(idx)
            })
        );
    }

    /**
     * Adiciona o valor da caixa de texto na lista de tarefas
     * (Ao clicar no botão).
     * @param {Event} evt 
     */
    handleAddButtonClick(evt) {
        //buscar o valor na caixa de texto
        let texto = document.getElementById("txtTodo").value;
        //Criação de um array auxiliar que terá a nova tarefa.
        //Isto é feito porque o valor presente em 'this.state.listaTarefas'
        //não pode ser alterado. A utilização de métodos como o '.push()'
        //altera o array, logo tem que se criar um array auxiliar e modificar
        //essa cópia.
        let copia = this.state.listaTarefas.slice();

        copia.push(texto);

        //this.state.listaTarefas = copia; NÃO USAR!
        //Define o novo valor do array auxiliar.
        this.setState({
            listaTarefas: copia
        });
    }

    handleDeleteTodo(index) {
        let aux = this.state.listaTarefas.slice();
        //apagar 1 elemento na posição especificada do array(posição 'index').
        aux.splice(index, 1);
        this.setState({ listaTarefas: aux });

    }
}
/**
 * 
 * @param {[items: Array, onDeleteTodo(index: number): void]} props 
 */
function ListaTodos(props) {
    //Quando o utilizador não tem tarefas, mostrar-lhe uma
    //mensagem amigável a encorajá-lo a usar a aplicação. :)
    if(props.items.length == 0){
        return React.createElement("p",
        null,
        "Não tens nada para fazer! Porque não adicionas uma tarefa acima?"
        
        );

    }
    //Construção da interface gráfica com base nas
    //tarefas que foram passadas nas propriedades(em 'props.items'),
    //um elemento <li> por tarefa
    let listaLis = [];

    for (let i = 0; i < props.items.length; i++) {
        let tarefa = props.items[i];
        /** 
  <li>
      {tarefa}
      <button>

      </button>
  </li>
  */
        listaLis.push(
            React.createElement("li", null, tarefa,
                React.createElement("button", { type:"button",
                //Quando se clica no botão,
                //usa-se a props 'onDeleteTodo', que é uma  função,
                //e invoca-se usando o 'i' que foi definido no clico
                //for criado anteriormente.
                //O parâmetro do 'evt', que repesenta o clique,
                //é ignorado, porque não temos uso para ele.
                 onClick: (evt) => props.onDeleteTodo(i) },
                    "x"
                )
            )
        );
    }
    /**
    <div>
    <span>Tens {n} tarefas para fazer!</span>
    <ul>
        {listaLis}
    </ul>
    </div>
    */
   return React.createElement(
    "div",
    null,
    React.createElement("span", null, "Tens " + props.items.length + " tarefas para fazer!"
    ),
    React.createElement("ul", null, listaLis)
);
}

ReactDOM.render(
    React.createElement(TodoApp, null),
    document.getElementById("app")
);

//JS 2 tipos de valores, Valores primitivos(numeros strings boleanos)
//Valores q pode m ser mudados (objetos, array)