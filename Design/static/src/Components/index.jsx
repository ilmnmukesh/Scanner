import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Left from "./left"

const Main = () => {
    const [src, setSrc]= useState("")
    const [img, setImg]= useState("")
    const [xml, setXml]= useState("")
    const [showBtn, setShowBtn]= useState(false)
    const [retSrc, setRetSrc]=useState("")
    const handleImage=(e)=>{
        let file=e.target.files[0]
        if(file!==undefined){
            setImg(file)
            setShowBtn(true)
            setSrc(URL.createObjectURL(file))
            if(retSrc==="")
                setRetSrc(URL.createObjectURL(file))
        }  
    }
    const handleXML=(e)=>{
        let file=e.target.files[0]
        if(file!==undefined){
            setShowBtn(true)
            setXml(file)
        }
    }
    return(
        <div>
            <div className="text-center">
                <h3 className="text-center mt-2">Scanning App</h3>
                <Link to="/report/" className="btn btn-sm btn-outline-success ">Report</Link>
            </div>
            <div className="row">
                <Left 
                    src={src}
                    img={img}
                    xml={xml}
                    showBtn={showBtn}
                    setShowBtn={setShowBtn}
                    handleXML={handleXML}
                    handleImage={handleImage}
                    setRetSrc={setRetSrc}
                />
                <div className="text-center mt-3  col-6">
                    <img src={retSrc} width={retSrc==""?"": "490"} height={retSrc==""?"": "690"} className="img-fluid" />
                </div>
            </div>
        </div>
        );
}
export default Main;