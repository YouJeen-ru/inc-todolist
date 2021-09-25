import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";

export type TaskType = {
    title: string
    id: number
    isDone: boolean
}

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
    //UI:
    return (
        <div className="App">
            <TodoList
                title='What to learn'
                tasks={tasks}
                removeTask={removeTask}
            />
        </div>
    );
}

export default App;
