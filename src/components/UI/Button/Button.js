import React from 'react'
import classes from "./Buttom.module.css";

const Button = (props) => {

    const btnClassss = props.className ? ` ${classes.btn} + " " + ${props.className}` : `${classes.btn}`
 

    return (
        <button className={btnClassss}>{props.title}</button>
    )
}

export default Button
