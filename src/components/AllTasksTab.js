import React from 'react';
import { BsCheckCircle , BsCheckCircleFill, BsPencilSquare } from "react-icons/bs";
import { IoIosCloseCircleOutline } from "react-icons/io";
import classes from "./AllTasksTab.module.css";
import { useSelector , useDispatch } from 'react-redux';
import { TodoSliceAction } from '../Store/TodoSilce';

const AllTasksTab = (props) => {


    const taskItems = useSelector(state => state.tasks.todoItem);
    const dispatch = useDispatch();

    let {currentTab , editTask } = props;

    // Filter tabs
    let renderItem;

    switch (currentTab) {
        case "All":
            renderItem = taskItems;
            break;
        case "Todo":
            const todoItems = taskItems.filter(item => item.isDone === false);
            renderItem = todoItems;
            break;
        case "Completed":
            const completed = taskItems.filter(item => item.isDone === true);
            renderItem = completed;
            break;
    
        default:
            renderItem = "All"
            break;
    };

    if (renderItem.length < 1) {
        return (
            <ul className={classes.taskItem} >
                <li>No Item Found</li>
            </ul>
        );
    };


    const editTaskHandler = (id , title) => {
        
        // input value
        editTask(title);
       dispatch(TodoSliceAction.editTask(id))
    };

    const removeTaskHandler = (id) => {
        dispatch(TodoSliceAction.removeTask(id))
    }

    const taskCompleteHandler = (id) => {
        dispatch(TodoSliceAction.taskComplete(id));
    }

    return (
        <ul className={classes.taskItem}>
            {renderItem.map((task, idx) => 
                 <li key={idx} > 
                    <span>{task.title}</span>
                    <span className={classes.icons}>
                        {task.isDone ?
                            <BsCheckCircleFill
                                className={classes.checkCircle}
                                onClick={() => taskCompleteHandler(task.id)}
                            /> :
                            <BsCheckCircle
                                className={classes.checkCircle}
                                onClick={() => taskCompleteHandler(task.id)}
                            />
                        }
                        <BsPencilSquare
                            className={classes.pencilSquar}
                            onClick={() => editTaskHandler(task.id , task.title)
                            }
                        />
                        <IoIosCloseCircleOutline
                            className={classes.closeCircle}
                            onClick={() => removeTaskHandler(task.id)}
                        />
                    </span>
                </li>
            )}
            
        </ul>
    );
}

export default AllTasksTab;
