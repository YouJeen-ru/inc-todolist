import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}

const EditableSpan = (props: EditableSpanPropsType) => {
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
            ? <input
               value={title}
               autoFocus={true}
               onChange={onChangeHandler}
               onBlur={activeViewMode}
               />
            : <span
               onDoubleClick={activeEditMode}
               >{props.title}</span>


    );
};

export default EditableSpan;