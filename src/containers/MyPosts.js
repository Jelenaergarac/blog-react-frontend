import React,{useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import PostService from '../services/PostService'
import {selectActiveUser} from '../store/auth'
import { Link } from 'react-router-dom'

const MyPosts = () => {
    const[posts, setPosts] = useState([])
    const activeUser = useSelector(selectActiveUser)
    
    useEffect(()=> {
        const fetchMyPosts = async() => {
            if(!activeUser){
                return;
            }
            const data = await PostService.getMyPosts(activeUser.id)
            setPosts(data)
            
        } 
        fetchMyPosts()
    },[activeUser])
    return (
        <div className="container">
            <div className="row">
                {posts.length ? (
                    <div>
                        {posts.map((post)=>(
                            <div key={post.id}>
                            
                            <legend><strong>{post.title}</strong></legend>
                            <p>{post.text}</p>
                            <img style={{ "width":"500px" }}
                            src={post.imageUrl ? post.imageUrl : "no photos"}
                            />
                            </div>
                            
                        ))}

                    </div>
                ): <Link to="/add"><h2>No posts yet, click here to start </h2></Link>}

            </div>
            
        </div>
    )
}

export default MyPosts
