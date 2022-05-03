import React from 'react'
import { useRef, useState } from 'react'
import http from '../plugins/http'
import './style.css'

const Register = () => {

    const [message, setMessage] = useState("")
    const inputs ={
        name: useRef(),
        password: useRef(),
        password2: useRef(),
        photo: useRef()
    }

    const registerUser= async()=>{
        const user ={
            name: inputs.name.current.value,
            password: inputs.password.current.value,
            password2: inputs.password2.current.value,
            photo: inputs.photo.current.value
        }

        const res = await http.post(user,'registeruser')


        setMessage(res.message)

        inputs.name.current.value=""
        inputs.password.current.value=""
        inputs.password2.current.value=""
        inputs.photo.current.value=""

    }
    return (
        <div>
            <div>
                <h3>REGISTRATION PAGE</h3><br/>
                <div className='d-flex just-center'>
                    <div className='reg-inputs'>
                        <label>Registration name: </label><br/>
                        <input className='mt-5' type="text" size="30" ref={inputs.name} placeholder="Length 4-20 symbols"/><br/><br/>
                        <label>Password: </label><br></br>
                        <input className='mt-5' type="password" size="30" ref={inputs.password} placeholder="Length 3-20 symbols"/><br/><br/>
                        <label>Repeat password: </label><br></br>
                        <input className='mt-5' type="password" size="30" ref={inputs.password2}/><br/><br/>
                        <label>Avatar picture link: </label><br/>
                        <input className='mt-5' type="text" size="80" ref={inputs.photo} placeholder='Add avatar picture link ("http" required)'/><br/><br/>
                        <button onClick={()=>registerUser()} className="ml-0">Register</button>
                    </div>
                </div>
                <h4>{message}</h4>
            </div>

        </div>
    )
}

export default Register