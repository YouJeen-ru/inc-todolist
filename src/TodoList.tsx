import React, {ChangeEvent} from 'react';
import {FilerValueType, TaskType} from "./App";
import AddItemForm from "./AddItemForm";
import EditableSpan from "./EditableSpan";
import {Button, Checkbox, IconButton, List, ListItem} from "@material-ui/core";
import {Delete} from "@material-ui/icons";

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

const TodoList = (props: TodoListPropsType) => {

    const taskList = props.tasks.map((task, _i) => {

        const removeClickHandler = () => props.removeTask(task.id, props.id)
        const changeStatus = (event: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(task.id, event.currentTarget.checked, props.id)
        }

        const changeTitle = (title: string) => {
            props.changeTaskTitle(task.id, title, props.id)
        }

        return (
            <ListItem style={{padding: '0px'}} key={task.id} className={task.isDone ? 'is-done' : ''}>
                <Checkbox
                    size={'small'}
                    color={'secondary'}
                    onChange={changeStatus}
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} changeTitle={changeTitle}/>
                <IconButton size={'small'} onClick={removeClickHandler}>
                    <Delete/>
                </IconButton>
            </ListItem>
        )
    })


    const changeTodolistsTitle = (title: string) => props.changeTodolistsTitle(title, props.id)

    const addTask = (title: string) => props.addTask(title, props.id)

    const onAllClickHandler = () => props.changeFilter('all', props.id)
    const onActiveClickHandler = () => props.changeFilter('active', props.id)
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id)
    const removeTodoList = () => props.removeTodoList(props.id)

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
};

export default TodoList;