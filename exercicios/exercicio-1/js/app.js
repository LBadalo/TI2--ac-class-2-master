// Referências (para intellisense)
/// <reference path="../typings/react.d.ts" />
/// <reference path="../typings/react-dom.d.ts" />

// TODO...

class TodoApp extends React.Component {

    constructor(props) {
        super(props);

        //Atualiza-se automaticamente ao mudá-lo
        this.state = {
            listaTarefas: [
                "Dar de comer ao gato",
                "Estudar TI2 "
            ]
        }
    }

    render() {
        return React.createElement(
            "div",
            null,
            React.createElement("input", { type: "text", id: "txtTodo" }),
            React.createElement("button", {
                type: "button", onClick: (evt) => this.handleAddButtonClick(evt)
            },
                "+"),
            React.createElement(ListaTodos, { items: this.state.listaTarefas })
        );
    }

    /**
     * 
     * @param {Event} evt 
     */
    handleAddButtonClick(evt) {
        let texto = document.getElementById("txtTodo").value;

        let copia = this.state.listaTarefas.slice();

        copia.push(texto);

        //this.state.listaTarefas = copia; NÃO USAR!
        this.setState({
            listaTarefas: copia
        });
    }
}

function ListaTodos(props) {
    let listaLis =[];
    for (let tarefa of props.items) { 
        listaLis.push(
            React.createElement("li", null, tarefa)
        );
    }

    return React.createElement(
        "ul",
        null,
        listaLis
    );
}

ReactDOM.render(
    React.createElement(TodoApp, null),
    document.getElementById("app")
);