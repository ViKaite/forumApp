import React from 'react'
import "./style.css"

const UserCard = ({user}) => {
    return (
        <div>
            <div className='user-card d-flex space-between just-start'>
                <div className='flex1'>
                    <img src={user.photo} alt="no avatar"/>
                </div>
                <div className='flex2 pl-20 text-left'>
                    <p className='mt-30'>{user.username}</p>
                </div>
                <div className='flex2'>
                    <p className='mt-30'>{(new Date(user.createTime)).toLocaleString('lt-Lt')}</p>
                </div>
            </div>
        </div>
    )
}

export default UserCard