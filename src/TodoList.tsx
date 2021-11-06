import React, {ChangeEvent, useCallback} from 'react';
import {FilerValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";
import {Task} from "./Task";

type TodoListPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    filter: FilerValueType
    removeTask: (taskId: string, todoListId: string) => void
    changeFilter: (value: FilerValueType, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskID: string, title: string, todoListId: string) => void
    changeTodolistsTitle: (title: string, todoListId: string) => void
}

const TodoList = React.memo((props: TodoListPropsType) => {

    let taskForTodolist = props.tasks

    if (props.filter === 'active') {
        taskForTodolist = taskForTodolist.filter(t => !t.isDone)
    }

    if (props.filter === 'completed') {
        taskForTodolist = taskForTodolist.filter(t => t.isDone)
    }

    const removeTask = useCallback((taskId: string) => props.removeTask(taskId, props.id),[])

    const changeTaskStatus = useCallback((taskId: string, isDone: boolean) => props.changeTaskStatus(taskId, isDone, props.id),[])

    const changeTaskTitle = useCallback((taskID: string, title: string) => props.changeTaskTitle(taskID, title, props.id),[])


    const taskList = taskForTodolist.map((task, _i) => {


        return (
            <Task
                key={task.id}
                task={task}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                changeTaskTitle={changeTaskTitle}

            />
        )

    })


    const changeTodolistsTitle = useCallback((title: string) => props.changeTodolistsTitle(title, props.id), [props.changeTodolistsTitle, props.id])

    const addTask = useCallback((title: string) => props.addTask(title, props.id), [props.addTask, props.id])

    const onAllClickHandler = useCallback(() => props.changeFilter('all', props.id), [props.changeFilter, props.id])
    const onActiveClickHandler = useCallback(() => props.changeFilter('active', props.id), [props.changeFilter, props.id])
    const onCompletedClickHandler = useCallback(() => props.changeFilter('completed', props.id), [props.changeFilter, props.id])
    const removeTodoList = useCallback(() => props.removeTodoList(props.id), [props.removeTodoList, props.id])

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodolistsTitle}/>
                <IconButton onClick={removeTodoList}>
                    <Delete/>
                </IconButton>
            </h3>

            <AddItemForm addItem={addTask}/>

            <List>
                {taskList}
            </List>
            <div>
                <Button variant={'contained'} color={props.filter === 'all' ? 'primary' : 'default'} size={'small'}
                        onClick={onAllClickHandler}>
                    All
                </Button>
                <Button style={{margin: '0 5px'}}
                        variant={'contained'}
                        color={props.filter === 'active' ? 'primary' : 'default'} size={'small'}
                        onClick={onActiveClickHandler}>
                    Active
                </Button>
                <Button variant={'contained'}
                        size={'small'}
                        color={props.filter === 'completed' ? 'primary' : 'default'}
                        onClick={onCompletedClickHandler}>
                    Completed
                </Button>
            </div>
        </div>
    );
});

export default TodoList;