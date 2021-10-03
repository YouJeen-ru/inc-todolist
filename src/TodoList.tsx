import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilerValueType, TaskType} from "./App";

type TodoListPropsType =  {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilerValueType) => void
    addTask: (title: string) => void
}

const TodoList = (props: TodoListPropsType) => {
    const taskList =  props.tasks.map((task, _i) => {

        const removeClickHandler = () => props.removeTask(task.id)

        return (
            <li key={_i}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={removeClickHandler}>x</button>
            </li>

        )
    })

    const [title, setTitle] = useState('')

    const addTask = () => {
        props.addTask(title)
        setTitle('')
    }
    
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
      setTitle(e.currentTarget.value)
    }
    
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.charCode === 13) {
          addTask()
      }
    }

    const onAllClickHandler = () => props.changeFilter('all')
    const onActiveClickHandler = () => props.changeFilter('active')
    const onCompletedClickHandler = () => props.changeFilter('completed')

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={title}
                    onChange={onChangeHandler}
                    onKeyPress={onKeyPressHandler}
                />
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                { taskList }
            </ul>
            <div>
                <button onClick={onAllClickHandler}>
                    All
                </button>
                <button onClick={onActiveClickHandler}>
                    Active
                </button>
                <button onClick={onCompletedClickHandler}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;