import React from 'react'
import {useEffect, useState} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { BsChevronDoubleRight } from "react-icons/bs";
import ReactPlayer from 'react-player/youtube'
import ReactPaginate from 'react-paginate'
import http from '../plugins/http';
import './style.css';

const SingleTopic = ({thisUser, allusers}) => {
    const itemsPerPage =10
    const {id} = useParams()

    const nav= useNavigate()

    const [singleTopic, setSingleTopic] =useState()
    const [loading, setLoading] = useState(true)

    const [currentItems, setCurrentItems] = useState(null); // itemai kuriuos rodo puslapyje
    const [pageCount, setPageCount] = useState(0);      // kuris puslaois
    const [itemOffset, setItemOffset] = useState(0);    // kiek itemu per puslapi -> kiek reikia kad pavaziuotu
    useEffect(()=>{
        getSingleTopic()

    },[])

    useEffect(() => {

        const endOffset = itemOffset + itemsPerPage;

        setCurrentItems(singleTopic?.posts.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(singleTopic?.posts?.length / itemsPerPage));
    }, [itemOffset, itemsPerPage, singleTopic]);

    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % singleTopic?.posts?.length;
        setItemOffset(newOffset);
    };

    const getSingleTopic = async() =>{
        const res = await http.get('topic/'+id)
        setSingleTopic(res.singletopic)
        setLoading(false)
    }

    const getAvatar = (arg) =>{
        const pic = allusers?.find(x => x.username===arg)
        console.log(pic)
        return (pic)
    }


    const createPost = (arg) =>{
        nav("/createpost/"+arg)
    }

    if (loading)
        return <div> loading...</div>

    return (
        <div className="items">
            <div>
                <div className='d-flex user-card-all topic-header'>
                    <div className='flex2'>
                        Discussion <BsChevronDoubleRight />
                    </div>
                    <div className='flex4'>
                        <h5> "{singleTopic.title}"</h5>
                    </div>
                    <div className='flex1 pl-20 text-left'>

                    </div>
                    <div className='flex3 pl-20 text-left'>
                        Created {(new Date(singleTopic.time)).toLocaleString('lt-Lt')} by <h5 className='figure'>{singleTopic.username}</h5>
                    </div>
                    <div className='flex2 pl-20'>
                        {thisUser.username && <button onClick={()=>createPost(id)}>Create post</button>}
                    </div>

                </div>

            </div>

            {singleTopic.posts.length >0 ?
                <div>
                    <div >

                        {currentItems?.map((x,i) =>
                            <div className='d-flex post-card'>
                                <div className='flex2'>
                                    <span>Written by: </span> <br/>
                                    <b>{x.username}</b> <br/>
                                    <span className='post-time'>{(new Date( x.time)).toLocaleString('lt-Lt')} </span><br/>
                                    <img className='post-writer-img' src={getAvatar(x.username)} alt='ner avataro'/>
                                </div>
                                <div className='flex8 text-left pl-20'>
                                    {x.photo &&
                                        <>
                                            <img src={x.photo} className="post-img" alt="nieko"/><br/>
                                        </>
                                    }
                                    {x.text}<br/>
                                    {x.youtubeUrl &&
                                        <>
                                            <a href={x.youtubeUrl}>{x.youtubeUrl}</a>
                                            <ReactPlayer url={x.youtubeUrl} width='370px' height='210px'/>
                                        </>
                                    }
                                </div>
                            </div>
                        )}

                    </div>

                </div>
                :
                <h3 className='mt-20'>There are no any posts in this discussion</h3>
            }
            <h1></h1>
            <ReactPaginate
                breakLabel="..."
                nextLabel="next >"
                onPageChange={handlePageClick}
                pageRangeDisplayed={itemsPerPage}
                pageCount={pageCount}
                previousLabel="< previous"
                renderOnZeroPageCount={null}

                pageClassName="page-item"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                containerClassName="pagination"
                activeClassName="active"
                style={{marginTop:"10px"}}

            />
        </div>
    )
}

export default SingleTopic