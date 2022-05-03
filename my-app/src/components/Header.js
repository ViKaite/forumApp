import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import http from '../plugins/http';

const Header = ({toolbar, setToolbar, setMessage, thisUser, setThisUser}) => {
    const divStyle = {
        width: "100%",
        height: "100px",
        marginTop: "0px",
        marginBottom: "10px",
        marginLeft: "10px",
        backgroundColor: "lightgray",

    };

    const nav=useNavigate()

    const logout = async() =>{

        const res = await http.get('logout')

        setMessage("")
        setToolbar(true)
        setThisUser({username:"", photo:""})
        nav("/")
    }

    return (
        <div style={divStyle}>
            <div >
                {toolbar &&
                    <div className='d-flex just-start'>
                        <button><Link className='text-nondec' to="/"> All Topics </Link></button>
                        <button><Link className='text-nondec' to="/allusers"> Users List </Link></button>
                        <button><Link className='text-nondec' to="/login"> Login </Link></button>
                        <button><Link className='text-nondec' to="/register"> Register </Link></button>
                        <button><Link className='text-nondec' to="/favorites"> Favorites </Link></button>
                    </div>
                }
                {!toolbar &&
                    <div>
                        <div className='d-flex just-end'>
                            <div className='userinfo'> User: <b><i>{thisUser.username}</i></b> </div>

                        </div>
                        <div className='d-flex just-start'>
                            <button><Link className='text-nondec' to="/"> All Topics </Link></button>
                            <button><Link className='text-nondec' to="/allusers"> Users List </Link></button>
                            <button><Link className='text-nondec' to="/createtopic"> Create Topic </Link></button>
                            <button><Link className='text-nondec' to="/myaccount"> My Account </Link></button>
                            <button><Link className='text-nondec' to="/changeavatar"> Change Avatar </Link></button>
                            <button><Link className='text-nondec' to="/favorites"> Favorites </Link></button>
                            <button onClick={()=>logout()}  className="red-text">Logout</button>
                        </div>
                    </div>
                }

            </div>
        </div>
    )
}

export default Header