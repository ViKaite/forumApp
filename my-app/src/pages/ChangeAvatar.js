import React from 'react'
import { useRef, useState } from 'react'
import http from '../plugins/http'

const ChangeAvatar = () => {
    const [message, setMessage] = useState("")
    const inputs ={
        photo: useRef()
    }

    const changeAvatar= async()=>{
        const avatar ={
            photo: inputs.photo.current.value
        }

        const res = await http.post(avatar,'changeavatar')
        // console.log("result from http", res, res.message)

        setMessage(res.message)

        inputs.photo.current.value=""

    }
    return (
        <div>
            <div>
                <h2>Change Avatar</h2><br/>
                <div className='d-flex just-center'>
                    <div className='reg-inputs'>
                        <label>Avatar picture link: </label><br/><br/>
                        <input className='mt-5' type="text" size="80" ref={inputs.photo} placeholder='Add new avatar picture link ("http" required)'/><br/><br/><br/>
                        <button onClick={()=>changeAvatar()} className="ml-0">Change</button>
                    </div>
                </div>
                <h4>{message}</h4>
            </div>
        </div>
    )
}

export default ChangeAvatar