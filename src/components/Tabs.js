/* eslint-disable no-unused-vars */
import React , { useState , useEffect } from 'react';
import AllTasksTab from './AllTasksTab';
import classes from "./Tabs.module.css";

const Tabs = (props) => {

    const [currentTab, setCurrentTab] = useState("All");

    const showTabHandler = (index) => {
        setCurrentTab(index); 
    }

    return (
        <div className={classes.container}>
            <ul className={classes.tabItems}>
                <li
                    className={currentTab === "All" ? `${classes.active}` : ` `} onClick={() => showTabHandler("All")} >
                    All
                </li>
                <li
                    className={currentTab === "Todo" ? `${classes.active}` : ` `} onClick={() => showTabHandler("Todo")}>
                    Todo
                </li>
                <li
                    className={currentTab === "Completed" ? `${classes.active}` : ` `} onClick={() => showTabHandler("Completed")}>
                    Completed
                </li>
            </ul>

            <AllTasksTab editTask={props.editTask} currentTab={currentTab}/> 
            
        </div>
    );
}

export default Tabs;