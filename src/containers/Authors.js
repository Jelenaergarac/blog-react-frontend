import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router'
import PostService from '../services/PostService'

const Authors = () => {
    const [authors, setAuthors] = useState([])
    const{id} = useParams()
    const [posts, setPosts] = useState([])
    useEffect(()=>{
        const fetchAuthorsPosts = async() => {
            const data = await PostService.getMyPosts(id)
            setAuthors(data)
        }
        fetchAuthorsPosts()
    },[id])
    return (
        <div>
            <h2>Author's Posts</h2>
            {authors.length ? (
                <div>
                    {authors.map((author)=> (
                        <div key={author.id}>
                            <legend>{author.title}</legend>
                            <p>{author.text}</p>
                            <img
                            style={{ "width":"500px" }}
                            src={author.imageUrl ? author.imageUrl : 'no photo'}
                            />

                        </div>
                    ))}

                </div>
            ): <h2>No posts yet</h2>}
            
        </div>
    )
}

export default Authors
