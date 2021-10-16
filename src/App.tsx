import React, {useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";

export type TaskType = {
    title: string
    id: string
    isDone: boolean
}

export type FilerValueType = 'all' | 'active' | 'completed'

export type TodoListType = {
    id: string
    title: string
    filter: FilerValueType
}

export type TaskStateType = {
    [key: string]: Array<TaskType>
}

function App() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true },
            {id: v1(), title: 'JS', isDone: true },
            {id: v1(), title: 'React', isDone: false },
            {id: v1(), title: 'Graph QL', isDone: false },
            {id: v1(), title: 'Redux', isDone: false },
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true },
            {id: v1(), title: 'Bread', isDone: true },
            {id: v1(), title: 'Sugar', isDone: false },
            {id: v1(), title: 'Meat', isDone: false },
            {id: v1(), title: 'Tomato', isDone: false },
        ]
    })

    const removeTask = (id: string, todoListId: string) => {
        const copyTasks = {...tasks}
        copyTasks[todoListId] = copyTasks[todoListId].filter(task => task.id !== id)
        setTasks(copyTasks)
    }
    const addTask = (title: string, todoListId: string) => {
        let task = {id: v1(), title: title, isDone: false}
        tasks[todoListId] = [task, ...tasks[todoListId]]
        setTasks({...tasks})
    }
    
    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.map(task => task.id === taskId ? {...task, isDone} : task)
        setTasks({...tasks})
    }
    
    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        const todoListTasks = tasks[todoListId]
        tasks[todoListId] = todoListTasks.map(task => task.id === taskId ? {...task, title} : task)
        setTasks({...tasks})
    }

    const changeFilter = (filter: FilerValueType, todoListId: string) => {
        const updateTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, filter} : tl)
        setTodoLists(updateTodoLists)
    }

    const changeTodolistsTitle = (title: string, todoListId: string) => {
        const updateTodoLists = todoLists.map(tl => tl.id === todoListId ? {...tl, title} : tl)
        setTodoLists(updateTodoLists)
    }

    const removeTodoList = (todoListId: string) => {
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]

    }
    
    const addTodoList = (title: string) => {
        const todoList_ID = v1()
        const todoList: TodoListType = {
            id: todoList_ID,
            title,
            filter: 'all'
        }

        setTodoLists([todoList, ...todoLists])
        setTasks({...tasks, [todoList_ID]: []})
    }

    const todoListsComponents = todoLists.map(tl => {
        let taskForTodolist = tasks[tl.id]

        if (tl.filter === 'active') {
            taskForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }

        if (tl.filter === 'completed') {
            taskForTodolist = tasks[tl.id].filter(t => t.isDone)
        }


        return (
            <TodoList
                id={tl.id}
                key={tl.id}
                title={tl.title}
                tasks={taskForTodolist}
                filter={tl.filter}
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodolistsTitle={changeTodolistsTitle}
            />
        )
    })

    //UI:
    return (
        <div className="App">
            <AddItemForm addItem={addTodoList}/>
            { todoListsComponents }
        </div>
    );
}

export default App;
