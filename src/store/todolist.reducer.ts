import {FilerValueType, TodoListType} from "../App";
import {v1} from "uuid";

export type ActionType = RemoveTodoListAT
    | AddTodoListAT
    | ChangeTodoListsTitleAT
    | ChangeTodoListsFilterAT

export type ChangeTodoListsTitleAT = {
    type: 'CHANGE-TODOLIST-TITLE'
    title: string
    todoListId: string
}

export type ChangeTodoListsFilterAT = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilerValueType
    todoListId: string
}

export type RemoveTodoListAT = {
    type: 'REMOVE-TODOLIST'
    todoListId: string
}

export type AddTodoListAT = {
    type: 'ADD-TODOLIST'
    title: string
}

export const todolistReducer = (todoLists: Array<TodoListType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST" :
            return todoLists.filter(tl => tl.id !== action.todoListId)
        case "ADD-TODOLIST":
            const todoList_ID = v1()
            const todoList: TodoListType = {
                id: todoList_ID,
                title: action.title,
                filter: 'all'
            }
            return [todoList, ...todoLists]
        case "CHANGE-TODOLIST-TITLE":
            return  todoLists.map(tl => tl.id === action.todoListId ? {...tl, title: action.title} : tl)
        case "CHANGE-TODOLIST-FILTER":
            return todoLists.map(tl => tl.id === action.todoListId ? {...tl, filter: action.filter} : tl)

        default:
            return todoLists;
    }
}

export const RemoveTodoListAC = (todoListId: string):RemoveTodoListAT => {
  return {
      type: 'REMOVE-TODOLIST',
      todoListId
  }
}

export const AddTodoListAC = (title: string):AddTodoListAT => {
    return {
        type: 'ADD-TODOLIST',
        title
    }
}

export const ChangeTodoListsTitleAC = (title: string, todoListId: string):ChangeTodoListsTitleAT => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        title,
        todoListId
    }
}

export const ChangeTodoListsFilterAC = (filter: FilerValueType, todoListId: string):ChangeTodoListsFilterAT => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        todoListId
    }
}