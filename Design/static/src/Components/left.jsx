import React, { useState } from 'react';
import Input from "./input"
const Left=({img, xml,src,showBtn,setShowBtn,handleImage, handleXML, setRetSrc})=>{ 
    const [msg, setMsg]=useState("")
    
    const setUpUrl=()=>{
        const formData= new FormData()
        formData.append("image", img, img.name)
        formData.append("xml", xml, xml.name)
        return formData
    }
    const handleSubmitBase64=(e)=>{
        if(xml===undefined || xml==="" || img===undefined || img===""){
            setMsg("Every thing required")
            return
        }
        let opts={"body":setUpUrl(), method:"POST"}
        fetch("http://localhost:8000/api/image/base64/", opts)
            .then(response => response.json())
            .then(data => {
                setShowBtn(false)
                if(data!==undefined && data.success){
                    setRetSrc("data:image/jpeg;base64, "+data.base64data)
                }else{
                    console.error(data)
                    setMsg("Something went wrong")
                }
            })
            .catch(error => {
                setMsg(error)
            })

    }
    const handleSubmitURL=(e)=>{
        if(xml===undefined || xml==="" || img===undefined || img===""){
            setMsg("Every thing required")
            return
        }
        let opts={"body":setUpUrl(), method:"POST"}
        fetch("/api/image/url/", opts)
            .then(response => response.json())
            .then(data => {
                setShowBtn(false)
                if(data!==undefined && data.success){
                    setRetSrc(data.url)
                }else{
                    console.error(data)
                    setMsg("Something went wrong")
                }
            })
            .catch(error => {
                setMsg(error)
            })
    }
    return (
        <div className="text-center mt-3  col-4">
                <Input text="Upload Image" name="image" accept="image/*" change={handleImage} />
                <Input text="Upload XML" name="xml" accept=".xml" change={handleXML}/>
                <div className="text-center">
                    <img src={src} className="img-fluid mt-3" width={src==""?"": "140"} height={src==""?"":"200"}/>
                    <p>{img!==undefined &&img.name}</p>
                    {
                        xml===undefined ||xml==""|| xml.name==""?<></>:    
                        <>
                            <img src="/Design/static/src/xml_icon.png" className="img-fluid" width={"140"} height={"200"}/>
                            <p>{xml!==undefined && xml.name}</p>
                        </>
                    }
                </div>
                {
                    showBtn
                    ?        
                        <div>
                            <button onClick={handleSubmitBase64} 
                                className="btn btn-md btn-warning font-weight-bold mx-2 text-white"
                            >Get Base64</button>
                            <button onClick={handleSubmitURL} 
                                className="btn btn-md btn-info mx-2 font-weight-bold"
                            >Get URL</button>
                        </div>
                    :<></>
                }
                {msg}
            </div>
    )
}
export default Left