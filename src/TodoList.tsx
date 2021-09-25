import React from 'react';
import {FilerValueType, TaskType} from "./App";

type TodoListPropsType =  {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: number) => void
    changeFilter: (value: FilerValueType) => void
}

const TodoList = (props: TodoListPropsType) => {
    const taskList =  props.tasks.map((task, _i) => {
        return (
            <li key={_i}>
                <input type="checkbox" checked={task.isDone}/>
                <span>{task.title}</span>
                <button onClick={() => props.removeTask(task.id)}>x</button>
            </li>

        )
    })

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                { taskList }
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>
                    All
                </button>
                <button onClick={() => props.changeFilter('active')}>
                    Active
                </button>
                <button onClick={() => props.changeFilter('completed')}>
                    Completed
                </button>
            </div>
        </div>
    );
};

export default TodoList;