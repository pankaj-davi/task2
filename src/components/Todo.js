import React , {useState} from 'react';
import classes from "./Todo.module.css";
import Tabs from './Tabs';
import { useDispatch} from 'react-redux';
import { TodoSliceAction } from '../Store/TodoSilce';
import { nanoid } from 'nanoid';
import Button from './UI/Button/Button';

const Todo = () => {

    const [taskVal, setTaskVal] = useState("");
    const [taksIsTouch, setTaskIsTouch] = useState(false);

    const dispatch = useDispatch();
    
    
    const taskOnBlurHandler = () => {
        setTaskIsTouch(true);
    }

    let fromIsValid = false;

    let inputIsValid = taskVal.trim().length < 1 && taksIsTouch;
    
    if (!inputIsValid && taskVal.trim().length >= 1) {
        fromIsValid = true;
    }

    const taskSubmitHandler = (e) => {
        e.preventDefault();
        
        if (!fromIsValid) {
            setTaskIsTouch(true)
            return;
        };

        const id = nanoid();

        dispatch(TodoSliceAction.addTask({
            id : id,
            title: taskVal,
            isDone : false,
        }))

        setTaskVal("")
        setTaskIsTouch(false);
        
    }

    const inputControlClass = inputIsValid ? `${classes.inputControl} ${classes.invalid}` : `${classes.inputControl}`;

    return (

        <div className={classes.container}>
            <div className={classes.heading}>
                <h2>To Do List</h2>
            </div>
            <form className={classes.form}  onSubmit={taskSubmitHandler}>
                <div className={inputControlClass}>
                    <input
                        type="text"
                        placeholder="enter your task"
                        onChange={(e) => setTaskVal(e.target.value)}
                        value={taskVal}
                        onBlur={taskOnBlurHandler}
                    />
                    {inputIsValid && <p className={classes.errMessages}>task can't be empty</p>}
                    <Button title="Add" />
                </div>
            </form>
            <Tabs editTask={setTaskVal} />
        </div>
       
    );
}

export default Todo;

