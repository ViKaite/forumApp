import React from 'react'
import { useState } from 'react'
import MyTopics from '../components/MyTopics'
import MyPosts from '../components/MyPosts'

const MyAccount = ({thisUser}) => {
    const [myAccPage, setMyAccPage] = useState(1)

    return (
        <div>
            <h4>My Account</h4>
            <div className='d-flex mb-10 mr--12'>
                <div onClick={()=>setMyAccPage(1)} className='flex1 border-blue p-10 pointer' style={{backgroundColor: myAccPage===2 ? "rgb(215,212,214)" : "rgba(73,73,73,0.87)"}}>
                    My topics

                </div>
                <div onClick={()=>setMyAccPage(2)} className='flex1 border-blue p-10 pointer' style={{backgroundColor: myAccPage===1 ? "rgb(215,212,214)" : "rgba(73,73,73,0.87)"}}>
                    My posts
                </div>

            </div>
            <div>
                {myAccPage===1 && <MyTopics thisUser={thisUser}/>}
                {myAccPage===2 && <MyPosts thisUser={thisUser}/>}
            </div>

        </div>
    )
}

export default MyAccount