import React from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

const taskOne: Array<TaskType> = [
    {id: 1, title: 'HTML&CSS', isDone: true },
    {id: 2, title: 'JS', isDone: true },
    {id: 3, title: 'React', isDone: false },
]

const taskTwo: Array<TaskType> = [
    {id: 1, title: 'Bread', isDone: false },
    {id: 2, title: 'Milk', isDone: false },
    {id: 3, title: 'Meat', isDone: true },
]

function App() {
    return (
        <div className="App">
            <TodoList title='What to learn' tasks={taskOne}/>
            <TodoList title='What to buy' tasks={taskTwo}/>
        </div>
    );
}

export default App;
