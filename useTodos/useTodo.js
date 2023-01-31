import { useEffect, useReducer } from "react";
import { todoReducer } from "./todoReducer";


const initialState = [
    // {
    //     id: new Date().getTime(), // una instruccion para generar un id (no lo solemos utilizar solo para este ejercicio)
    //     description: 'Recolectar la piedra del alma',
    //     done: false,
    // },    
];

const init = () => {
    return JSON.parse( localStorage.getItem('todos')) || [];
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer( todoReducer, initialState, init );

    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify( todos ) );
    }, [todos])
    

    const handleNewTodo = ( todo ) => {
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        }

        dispatch( action );
    }

    const handleDeleteTodo = ( id ) => {
        dispatch({
            type: '[TODO] Remove Todo',
            payload: id
        });
    }

    const handleToggleTodo = ( id ) => {
        dispatch({
            type: '[TODO] Toggle Todo',
            payload: id
        });
    }

    const todosCount = todos.length;

    const pendingTodosCount = `Pendientes: ${todos.filter( todo => !todo.done ).length}`;
    
    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount,
        pendingTodosCount,        
    };
};
