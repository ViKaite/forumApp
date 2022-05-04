import React from 'react'
import { useRef, useState } from 'react'
import http from '../plugins/http'

const CreateTopic = ({socket}) => {
    const inputs ={
        title: useRef(),
    }

    const [message, setMessage] = useState("")

    const createtopic = async() =>{

        const topic={
            title: inputs.title.current.value,

        }

        const res = await http.post(topic,'createtopic')
        // console.log("result from http", res, res.message)

        setMessage(res.message)
        inputs.title.current.value=''
        if(res.success){
            // console.log("socket must be there", res.newtopic.username)
            socket.emit("newTopic", res.newtopic.username+" created topic:  "+res.newtopic.title+'" ')
        }

        // console.log("create auction", auction)

    }


    return (
        <div>

            <h3>Create Topic</h3>
            <div className='d-flex just-center'>
                <div className='reg-inputs'>
                    <br/>
                    <label>Topic title: </label><br/>
                    <input className='mt-5' type="text" size="80" ref={inputs.title} placeholder='Topic title must be 6-80 characters'/><br/><br/><br/>
                    <button onClick={()=>createtopic()} className="ml-0">Create new topic</button>
                </div>
            </div>
            <h4>{message}</h4>






        </div>
    )
}

export default CreateTopic