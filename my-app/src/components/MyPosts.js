import React from 'react'
import { useState, useEffect } from 'react'
import ReactPlayer from 'react-player'
import http from '../plugins/http'

const MyPosts = ({thisUser}) => {

    const [allposts, setAllPosts] =useState([])

    useEffect(()=>{
        getAllPosts()

    },[])

    const getAllPosts = async() =>{
        const res = await http.get('myposts')
        if(res.myPosts.length>0){
            setAllPosts(res.myPosts)
        }

    }

    return (
        <div>

            {allposts.length>0 ?
                <div>
                    {allposts.map(x =>
                        <>
                            <div className='myposts-card'>
                                <p>Topic <b>"{x.title}"</b> created <span className='post-time'><i><b>{(new Date( x.time)).toLocaleString('lt-Lt')}</b></i></span> by <b>{x.username}</b></p>
                            </div>

                            {x.posts.map(y =>
                                <>
                                    <div className='flex8 text-left pl-20 border-blue myposts-card-text'>
                                        <span className='post-time'>{(new Date( y.time)).toLocaleString('lt-Lt')} </span><br/>
                                        {y.photo &&
                                            <>
                                                <img src={y.photo} className="post-img" alt="nieko"/><br/>
                                            </>
                                        }
                                        {y.text}<br/>
                                        {y.youtubeUrl &&
                                            <>
                                                <a href={y.youtubeUrl}>{y.youtubeUrl}</a>
                                                <ReactPlayer url={y.youtubeUrl} width='370px' height='210px'/>
                                            </>
                                        }
                                    </div>
                                </>
                            )}
                        </>
                    )}
                </div>
                :
                <div>
                    <h4>Any posts have not been written by You </h4>
                </div>
            }
        </div>
    )
}

export default MyPosts