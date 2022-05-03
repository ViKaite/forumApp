import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { BsSuitHeart, BsSuitHeartFill } from "react-icons/bs";
import "./style.css"

const TopicCard = ({topic, favoritesAll, fav, setFav}) => {

    const nav = useNavigate()
    const [getFavorited, setFavorited] = useState(
        JSON.parse(localStorage.favoritesTopic).find((x) => x === topic._id)
    );

    useEffect(() => {
        setFavorited(
            JSON.parse(localStorage.favoritesTopic).find((x) => x === topic._id)
        );
    }, [favoritesAll, localStorage.favoritesTopic, topic]);

    const getSingleTopic = (arg) =>{
        nav("/singletopic/"+arg)
    }

    function setFavoritedStatus(id) {
        let favorites = JSON.parse(localStorage.favoritesTopic);
        setFavorited(!getFavorited);

        if (!getFavorited) {
            favorites.push(id);
        } else {
            favorites = favorites.filter((x) => x !== id);
        }
        localStorage.setItem("favoritesTopic", JSON.stringify(favorites));
        setFav(!fav)

    }



    return (
        <div>
            <div className='topic-card d-flex space-between just-start mr--12'>
                <div className='flex4'>
                    <p className='topic-text pointer' onClick={()=>getSingleTopic(topic._id)}>{topic.title}</p>
                </div>
                <div className='flex2'>
                    <p>{(new Date(topic.time)).toLocaleString('lt-Lt')}</p>
                </div>
                <div className='flex1'>
                    <p>{topic.posts.length}</p>
                </div>
                <div className='flex1'>
                    <img src={topic.photo} alt="no avatar"/>
                </div>
                <div className='flex2 pl-20 text-left'>
                    <p>{topic.username}</p>
                </div>
                <div className='pl-20 text-left'>
                    {!getFavorited ? (
                        <BsSuitHeart
                            className="topic-card-favorite-icon"
                            onClick={() => setFavoritedStatus(topic._id)}
                            title="Add to favorites"
                            style={{ color: "black" }}
                        />
                    ) : (
                        <BsSuitHeartFill
                            className="topic-card-favorite-icon"
                            onClick={() => setFavoritedStatus(topic._id)}
                            title="Remove from favorites"
                        />
                    )}
                </div>




            </div>
        </div>
    )
}

export default TopicCard