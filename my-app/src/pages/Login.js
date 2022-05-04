import React from 'react'
import { useRef } from 'react'
import http from '../plugins/http'

const Login = ({toolbar, setToolbar, message, setMessage, setThisUser}) => {

    const inputs ={
        name: useRef(),
        password: useRef(),
    }

    const loginUser = async()=>{

        const user = {
            name: inputs.name.current.value,
            password: inputs.password.current.value
        }

        const res = await http.post(user,'login')

        setMessage(res.message)
        if (res.success){
            setToolbar(false)
            setThisUser(res.user)
        }
    }

    return (
        <div>
            {toolbar &&
                <div>
                    <h3>LOGIN PAGE</h3>
                    <label>Name: </label><br/>
                    <input type="text" size="30" ref={inputs.name}/><br/><br/>
                    <label>Password: </label><br/>
                    <input type="password" size="30" ref={inputs.password}/><br/><br/>

                    <button onClick={()=>loginUser()}>Login</button>
                    <h4>{message}</h4>
                </div>
            }
            {!toolbar &&
                <div>
                    <h4>{message}</h4>
                </div>
            }
        </div>
    )
}

export default Login