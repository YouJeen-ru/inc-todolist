import axios from "axios";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '5e5dd360-92d1-4f44-8e94-33caa0f21526'
    }
})

// api
export const todolistApi = {
    getTodos() {
        return instance.get<Array<TodoType>>('todo-lists')

    },
    createTodo(title: string) {
        return instance.post<CommonResponseType< {item: TodoType} >>('todo-lists', {title})

    },
    deleteTodo(todolistId: string) {
        return instance.delete<CommonResponseType>(`todo-lists/${todolistId}`)
    },
    updateTodoTitle(todolistId: string, title: string) {
        return instance.put<CommonResponseType>(`todo-lists/${todolistId}`, {title})
    },

}

// types
export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
}

//Generic
export type CommonResponseType<T = {}> = {
    fieldsErrors: Array<string>
    messages: Array<string>
    resultCode: number
    data: T
}