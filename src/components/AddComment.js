import React,{useState} from 'react'
import { useSelector } from 'react-redux'
import PostService from '../services/PostService'
import { selectIsAuthenticated } from '../store/auth'

const AddComment = ({postId, addcommentCallback}) => {
    const isAuthenticated = useSelector(selectIsAuthenticated)
    const[newComment, setNewComment] = useState({content:''})
    const addnewcomment = async(e) => {
        e.preventDefault()
        const data = PostService.addComment(newComment, postId)
        if(data){
            addcommentCallback(data)
        }
        setNewComment({content:''})
    }
    return (
        <div>
            {isAuthenticated ? (
                <form onSubmit={addnewcomment}>
                    <input
                    type="text"
                    value={newComment.content}
                    onChange={({target})=>setNewComment({...newComment, content:target.value})}
                    />
                    <button>Add Comment</button>

                </form>
            ):''}

           
        </div>
    )
}

export default AddComment
