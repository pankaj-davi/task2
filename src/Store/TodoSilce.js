import { createSlice } from "@reduxjs/toolkit";


//find todo item
const findItem = (state, action) => {
    const findEntry = state.todoItem.find(item => item.id  === action.payload);
    if (!findEntry) return;

    return findEntry;
}

// store data in localStorage

const saveDataLocalStorage = (state) => {
    const saveLocalStorage = localStorage.setItem( "todoItem" ,JSON.stringify(state));
    return saveLocalStorage;
}


const initialState = {
    todoItem: localStorage.getItem("todoItem") ?  JSON.parse(localStorage.getItem("todoItem")).todoItem :  [],
    
};

const TodoSlice = createSlice({
    name : "todo",
    initialState,
    reducers: {
        addTask: (state, action) => {

            const { title, isDone, id } = action.payload;
            state.todoItem = [{ title, isDone, id }, ...state.todoItem];
            
            saveDataLocalStorage(state);
        },
        
        editTask: (state, action) => {
            
            
            findItem(state, action);

            const removeTaskIdx = state.todoItem.findIndex(item => item.id === action.payload);
             // eslint-disable-next-line no-unused-vars
            const removeTask = state.todoItem.splice(removeTaskIdx, 1);
            saveDataLocalStorage(state);
        },

        removeTask: (state, action) => {

            findItem(state, action);

            const removeTaskIdx = state.todoItem.findIndex(item => item.id === action.payload);
        
            // eslint-disable-next-line no-unused-vars
            const removeTask = state.todoItem.splice(removeTaskIdx, 1);
            saveDataLocalStorage(state);
        },

        taskComplete: (state, action) => {

            const findEntry = findItem(state, action);
            findEntry.isDone = !findEntry.isDone;

            saveDataLocalStorage(state);
            console.log(state + " ");
        },
        
    }
})

export const TodoSliceAction = TodoSlice.actions;

export default TodoSlice;