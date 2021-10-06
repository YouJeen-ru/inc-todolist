import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilerValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL:
    let [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true },
        {id: v1(), title: 'JS', isDone: true },
        {id: v1(), title: 'React', isDone: false },
        {id: v1(), title: 'Graph QL', isDone: false },
        {id: v1(), title: 'Redux', isDone: false },
    ])

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
    }
    const addTask = (title: string) => {
        let task = {id: v1(), title: title, isDone: false}
        let newTasks = [task, ...tasks]
        setTasks(newTasks)
    }

    let [filter, setFilter] = useState<FilerValueType>('all')

    let taskForTodolist = tasks

    if (filter === 'active') {
        taskForTodolist = tasks.filter(t => !t.isDone)
    }

    if (filter === 'completed') {
        taskForTodolist = tasks.filter(t => t.isDone)
    }

    const changeFilter = (value: 'all' | 'active' | 'completed') => {
        setFilter(value)
    }
    //UI:
    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={taskForTodolist}
                filter={filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}

export default App;
