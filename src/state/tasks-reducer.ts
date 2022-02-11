import React from 'react';
import {TasksStateType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodolistACType, RemoveTodolistACType} from "./todolists-reducer";


export const TasksReducer = (state: TasksStateType=initialState, action: GeneralType) => {
    switch (action.type) {
        case "REMOVE_TASK": {

            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].filter(f => f.id !== action.payload.taskId)
            }


        }
        case"ADD_TASK": {
            let task: TaskType = {id: v1(), title: action.payload.title, isDone: false};

            return {...state, [action.payload.todolistId]: [task, ...state[action.payload.todolistId]]}

        }
        case"CHANGE_TASK_STATUS": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    isDone: action.payload.isDone
                } : m)
            }
        }
        case "CHANGE_TASK_TITLE": {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId].map(m => m.id === action.payload.taskId ? {
                    ...m,
                    title: action.payload.newTitle
                } : m)
            }
        }
        case "ADD_TODOLIST": {
            return {...state, [action.payload.todolistId]: []}
        }
        case "REMOVE_TODOLIST": {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
        }
        default:
            return state
    }
};


type GeneralType = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeTaskTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

const initialState:TasksStateType={}

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId: string) => {
    return {
        type: "REMOVE_TASK",
        payload: {
            todolistId,
            taskId
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, title: string) => {
    return {
        type: "ADD_TASK",
        payload: {
            todolistId,
            title
        }
    } as const
}
type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE_TASK_STATUS",
        payload: {
            todolistId,
            taskId,
            isDone
        }
    } as const
}

type ChangeTaskTitleACType = ReturnType<typeof changeTaskTitleAC>
export const changeTaskTitleAC = (todolistId: string, taskId: string, newTitle: string,) => {
    return {
        type: "CHANGE_TASK_TITLE",
        payload: {
            todolistId,
            taskId,
            newTitle
        }
    } as const
}

