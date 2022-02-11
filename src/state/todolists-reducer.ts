import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export const TodolistsReducer=(state:Array<TodolistType>=initialState,action:GeneralType):Array<TodolistType> =>{
switch (action.type){
    case "REMOVE_TODOLIST":{
        let newState=[...state]
        return newState.filter(f=>f.id!==action.payload.id)
    }
    case "ADD_TODOLIST" : {
        let newState=[...state]

        let newTodolist = {id:action.payload.todolistId, title: action.payload.title, filter: 'all' as FilterValuesType};

        return [...newState,newTodolist]
    }
    case "CHANGE-TODOLIST-TITLE":{
let newState=[...state]

        return newState.map((m)=>m.id===action.payload.id?{...m,title:action.payload.title}:m)
    }
    case 'CHANGE-TODOLIST-FILTER':{
        let newState=[...state]
        return  newState.map(f=>f.id===action.payload.todolistId?{...f,filter:action.payload.value}:f)



    }
    default: return state

}

}





type GeneralType= RemoveTodolistACType
|AddTodolistACType
|ChangeTodolistTitleAC
|ChangeFilterAC

const initialState:Array<TodolistType>=[]

export type RemoveTodolistACType=ReturnType<typeof removeTodolistAC>
 export const removeTodolistAC=(id:string)=>{
    return {
        type:"REMOVE_TODOLIST",
        payload:{
            id
        }
    }as const
}


export type AddTodolistACType=ReturnType<typeof addTodolistAC>
export const addTodolistAC=(title: string)=>{
    return{
        type:"ADD_TODOLIST",
        payload:{
            todolistId: v1(),
            title
        }
    }as const
}



type ChangeTodolistTitleAC=ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC=(id: string,title:string)=>{
    return{
        type:"CHANGE-TODOLIST-TITLE",
        payload:{
            id,
            title

        }
    }as const
}


type ChangeFilterAC=ReturnType<typeof changeFilterAC>
export const changeFilterAC=(todolistId: string,value: FilterValuesType)=>{
    return{
        type:'CHANGE-TODOLIST-FILTER',
        payload:{
            todolistId,
            value

        }
    }as const
}