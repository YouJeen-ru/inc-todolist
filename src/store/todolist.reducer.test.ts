import {FilerValueType, TodoListType} from "../App";
import {v1} from 'uuid';
import {
    AddTodoListAC, ChangeTodoListsFilterAC,
    ChangeTodoListsFilterAT, ChangeTodoListsTitleAC,
    ChangeTodoListsTitleAT,
    RemoveTodoListAC,
    todolistReducer
} from "./todolist.reducer";


test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, RemoveTodoListAC(todolistId1))

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const endState = todolistReducer(startState, AddTodoListAC(newTodolistTitle))

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newTodolistTitle = "New Todolist";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    let action: ChangeTodoListsTitleAT = {
        type: 'CHANGE-TODOLIST-TITLE',
        title: newTodolistTitle,
        todoListId: todolistId2
    }


    const endState = todolistReducer(startState, ChangeTodoListsTitleAC(action.title, action.todoListId));

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let newFilter: FilerValueType = "completed";

    const startState: Array<TodoListType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]

    const action: ChangeTodoListsFilterAT = {
        type: 'CHANGE-TODOLIST-FILTER',
        todoListId: todolistId2,
        filter: newFilter
    };

    const endState = todolistReducer(startState, ChangeTodoListsFilterAC(action.filter, action.todoListId));

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

