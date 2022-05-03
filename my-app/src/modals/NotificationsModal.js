import React from 'react'
import http from '../plugins/http'

const NotificationsModal = ({setNotificationModal, notifications}) => {

    const closeModal = () =>{
        setNotificationModal(false)
    }

    const clearNotification = async() =>{
        const res =await http.get('clearnotifications')

        setNotificationModal(false)

    }


    return (
        <div className='modal-notication d-flex ali-center just-center'>
            {notifications.length > 0 ?
                <div>
                    <h4>Hello {notifications[0].username} !</h4>
                    {notifications.map((x,i)=> <div key={i}>

                        <p className='m-b-5'>You have new post in topic:</p>
                        <h5>{x.title}</h5>
                    </div>)}

                    <button onClick={()=>clearNotification()}>Clear notifications</button>

                </div> :
                <div >
                    <h5>There is no new posts</h5>
                    <div>
                        <button onClick={()=>closeModal()}>Close</button>
                    </div>
                </div>

            }

        </div>
    )
}

export default NotificationsModal