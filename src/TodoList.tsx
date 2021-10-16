import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilerValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";

type TodoListPropsType =  {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilerValueType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilerValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
}

const TodoList = (props: TodoListPropsType) => {

    const taskList =  props.tasks.map((task, _i) => {

        const removeClickHandler = () => props.removeTask(task.id, props.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
        }

        return (
            <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                    type="checkbox"
                    onChange={changeStatus}
                    checked={task.isDone}
                />
                <span>{task.title}</span>
                <button onClick={removeClickHandler}>x</button>
            </li>
        )
    })


    const addTask = (title: string) => props.addTask(title, props.id)

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodoList}>X</button>
            </h3>

            <AddItemForm addItem={addTask}/>

            <ul>
                { taskList }
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllClickHandler}>
                    All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveClickHandler}>
                    Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;