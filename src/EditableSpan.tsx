import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {TextField} from "@material-ui/core";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = React.memo((props: EditableSpanPropsType) => {
    console.log('EditableSpan')
    const [editMode, setEditMode] = useState<boolean>(false)
    const [title, setTitle] = useState(props.title)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const activeViewMode = () => {
        props.changeTitle(title)
        setEditMode(false)
    }

    const activeEditMode = () => {
        setEditMode(true)
        setTitle(props.title)
    }

    return (

        editMode
            ? <TextField
                value={title}
                autoFocus={true}
                onChange={onChangeHandler}
                onBlur={activeViewMode}
            />
            : <span
                onDoubleClick={activeEditMode}
            >{props.title}</span>


    );
});

export default EditableSpan;