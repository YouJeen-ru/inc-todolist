import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

export type FilerValueType = 'all' | 'active' | 'completed'

function App() {
    //BLL:
    let [tasks, setTasks] = useState([
        {id: 1, title: 'HTML&CSS', isDone: true },
        {id: 2, title: 'JS', isDone: true },
        {id: 3, title: 'React', isDone: false },
        {id: 4, title: 'Graph QL', isDone: false },
        {id: 5, title: 'Redux', isDone: false },
    ])

    const removeTask = (id: number) => {
        let filteredTasks = tasks.filter(task => task.id !== id)
        setTasks(filteredTasks)
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
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
