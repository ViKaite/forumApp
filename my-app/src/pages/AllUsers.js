import React from 'react'

import UserCard from '../components/UserCard'
import { BsArrowDownSquare } from "react-icons/bs";
import "./style.css"

const AllUsers = ({allusers}) => {

    return (
        <div>
            <h2>User List</h2>
            {allusers.length >0 ?
                <div>
                    <div className='d-flex user-card-all'>
                        <div className='flex1'>
                            <h3>Avatar </h3>
                        </div>
                        <div className='flex2 pl-20 text-left'>
                            <h3>Username </h3>
                        </div>
                        <div className='flex2'>
                            <h3> <BsArrowDownSquare className='mb--3'/> Registered</h3>
                        </div>

                    </div>
                    {allusers.map((x,i) =>
                        <UserCard user={x} key={i}/>
                    )}
                </div>
                :
                <h3>User list is empty</h3>
            }
        </div>
    )
}

export default AllUsers