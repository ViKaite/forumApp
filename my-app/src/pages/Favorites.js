import React from 'react'
import { useEffect, useState} from "react";
import http from '../plugins/http';
import TopicCard from '../components/TopicCard';
import "./style.css"


const Favorites = () => {
    const [favoritesAll, setFavoritesAll] = useState([])
    const [fav, setFav] = useState(true)
    const favoriteArray = JSON.parse(localStorage.favoritesTopic)

    useEffect(() => {
        http.post({favoriteArray}, 'getFavoriteTopics').then(res => {
            const favoriteTopics = res.getFavoriteTopics
            const realFavorites = favoriteTopics.map(x=>x._id)
            localStorage.setItem("favoritesTopic", JSON.stringify(realFavorites));

            setFavoritesAll(favoriteTopics)
        })
    }, [localStorage.favoritesTopic,fav])


    return (
        <div>
            <h3>Favorite Topics</h3>
            {favoritesAll.length>0 ?
                <div>
                    <div className='d-flex user-card-all topic-header'>
                        <div className='flex5 pt-10'>
                            <h3>Topics </h3>
                        </div>
                        <div className='flex2 pl-20 text-left pt-10'>
                            <h3>Create time </h3>
                        </div>
                        <div className='flex1 pl-20 text-left pt-10'>
                            <h3>Posts </h3>
                        </div>
                        <div className='flex4 pl-20 pt-10'>
                            <h3>Created by</h3>
                        </div>

                    </div>
                    {favoritesAll.map((x,i) =>
                        <TopicCard topic={x} favoritesAll={favoritesAll} fav={fav} setFav={setFav} key={i}/>
                    )}
                </div>
                :
                <h3>There are no any favorite topics in the list</h3>
            }

        </div>
    )
}

export default Favorites