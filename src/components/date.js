import React, {useState,useEffect} from "react";
import './Todos/style.css'

export const DataTime=()=>{
    var[date,setDate] = useState(new Date());

    useEffect(()=>{
        var timer = setInterval(() =>setDate(new Date()), 1000);
        return function cleanUp(){
            clearInterval(timer)
        }
    });

    return(
        <div className="dates">
            <div> Date : {date.toLocaleDateString()}</div>
            <div>Time: {date.toLocaleTimeString()}</div>
        </div>
    )

}

export default DataTime