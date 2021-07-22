import React, { useEffect, useState } from "react"

const Report=()=>{
    const [startDate, setStartDate] =useState("")
    const [endDate, setEndDate] =useState("")
    const [msg, setMsg] =useState("")
    
    useEffect(()=>{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        today= yyyy+"-" +mm+"-"+dd
        setStartDate(today)
        setEndDate(today)
    }, [])
    return (
        <div className="text-center mt-5 pt-5">
            <h2 className="mt-5">Enter Start Date and End Date To generate Report</h2>
            <div className="container col-3 mt-2">
                <h6>Start Date</h6>
                <input type="date" className="form-control" value={startDate} onChange={(e)=>{setStartDate(e.target.value)}}></input>
            </div>
            <div className="container col-3 mt-2">
                <h6>End Date</h6>
                <input type="date"  className="form-control" value={endDate} onChange={(e)=>{setEndDate(e.target.value)}}></input>
            </div>
            <div className="container mt-5 col-3">
                <a 
                    href={`/api/report/?start_date=${startDate}&end_date=${endDate}`}
                    className="form-control btn btn-md btn-success font-weight-bold"
                >Download CSV</a>
            </div>
            <div className="container mt-5 col-3">
                <button onClick={()=>{history.back()}}
                    className="btn btn-md btn-danger font-weight-bold"
                >Go Back</button>
            </div>
            {msg}
        </div>
    )
}

export default Report