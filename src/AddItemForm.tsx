import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {IconButton, TextField} from "@material-ui/core";
import {AddBox} from "@material-ui/icons";

type AddItemFormPropsType = {
    addItem: (title: string) => void
}


const AddItemForm = (props: AddItemFormPropsType) => {

    const [error, setError] = useState<boolean>(false)
    const [title, setTitle] = useState('')

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError(false)
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            addItem()
        }
    }

    const addItem = () => {
        const trimmedTitle = title.trim()
        if (trimmedTitle) {
            props.addItem(title)
        } else {
            setError(true)
        }
        setTitle('')
    }

    return (
        <div>
            <TextField
                variant={'outlined'}
                label={'Title'}
                size={'small'}
                value={title}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
                error={!!error}
                helperText={error && 'Title is required!'}
            />
            <IconButton size={"medium"} onClick={addItem}><AddBox style={{color: '#7e57c2'}}/></IconButton>

        </div>
    );
};

export default AddItemForm;