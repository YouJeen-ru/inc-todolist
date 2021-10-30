import React, {useReducer, useState} from 'react';
import './App.css';
import TodoList from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import {AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from "@material-ui/core";
import {Menu} from "@material-ui/icons";
import {
    AddTodoListAC,
    ChangeTodoListsFilterAC,
    ChangeTodoListsTitleAC,
    RemoveTodoListAC,
    todolistReducer
} from "./store/todolist.reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./store/tasks.reducer";

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

function AppWithReducers() {
    const todoListId_1 = v1()
    const todoListId_2 = v1()

    const [todoLists, dispatchToTodoLists] = useReducer(todolistReducer, [
        {id: todoListId_1, title: 'What to learn', filter: 'all'},
        {id: todoListId_2, title: 'What to buy', filter: 'all'},
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoListId_1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Graph QL', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [todoListId_2]: [
            {id: v1(), title: 'Milk', isDone: true},
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Sugar', isDone: false},
            {id: v1(), title: 'Meat', isDone: false},
            {id: v1(), title: 'Tomato', isDone: false},
        ]
    })

    const removeTask = (id: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(id, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }

    const changeTaskStatus = (taskId: string, isDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, isDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, title: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, title, todoListId))
    }

    const changeFilter = (filter: FilerValueType, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListsFilterAC(filter, todoListId))
    }

    const changeTodolistsTitle = (title: string, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListsTitleAC(title, todoListId))
    }

    const removeTodoList = (todoListId: string) => {
        dispatchToTodoLists(RemoveTodoListAC(todoListId))

    }

    const addTodoList = (title: string) => {
        const action = AddTodoListAC(title)
        dispatchToTasks(action)
        dispatchToTodoLists(action)
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
            <Grid item key={tl.id}>
                <Paper elevation={6} style={{padding: '15px'}}>
                    <TodoList
                        id={tl.id}
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
                </Paper>
            </Grid>
        )
    })

    //UI:
    return (
        <div className="App">
            <AppBar position="static" style={{backgroundColor: '#7e57c2'}}>
                <Toolbar style={{justifyContent: 'space-between'}}>
                    <IconButton
                        size="medium"
                        edge="start"
                        color="inherit"
                        aria-label="menu"

                    >
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        To do
                    </Typography>
                    <Button variant={'outlined'} color="inherit">Login</Button>
                </Toolbar>
            </AppBar>

            <Container fixed maxWidth={'xl'} >

                <Grid container style={{padding: '15px'}}>
                    <AddItemForm addItem={addTodoList}/>
                </Grid>
                <Grid container spacing={4}>
                    {todoListsComponents}
                </Grid>

            </Container>

        </div>
    );
}

export default AppWithReducers;
