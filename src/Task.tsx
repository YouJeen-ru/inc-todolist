import React, {ChangeEvent, useCallback} from "react";
import {Checkbox, IconButton, ListItem} from "@material-ui/core";
import EditableSpan from "./EditableSpan";
import {Delete} from "@material-ui/icons";
import {TaskType} from "./App";

export type TaskPropsType = {
    task: TaskType
    removeTask: (taskId: string) => void
    changeTaskStatus: (taskId: string, isDone: boolean) => void
    changeTaskTitle: (taskID: string, title: string) => void
}

export const Task = React.memo((props: TaskPropsType) => {

    const { id, title, isDone } = props.task

    const removeClickHandler = useCallback(() => props.removeTask(id), [props.removeTask, id])
    const changeStatus = useCallback((event: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(id, event.currentTarget.checked)
    }, [props.changeTaskStatus, id])

    const changeTitle = useCallback((title: string) => {
        props.changeTaskTitle(id, title)
    }, [props.changeTaskTitle, id])

    return (
        <ListItem style={{padding: '0px'}} className={isDone ? 'is-done' : ''}>
            <Checkbox
                size={'small'}
                color={'secondary'}
                onChange={changeStatus}
                checked={isDone}
            />
            <EditableSpan title={title} changeTitle={changeTitle}/>
            <IconButton size={'small'} onClick={removeClickHandler}>
                <Delete/>
            </IconButton>
        </ListItem>
    )
})