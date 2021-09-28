import React,{useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router'
import PostService from '../services/PostService'
import { selectActiveUser, selectIsAuthenticated } from '../store/auth'
import AddComment from '../components/AddComment'
import { Link } from 'react-router-dom'


const Post = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated)
  const activeUser = useSelector(selectActiveUser)
  const history = useHistory()

  const [post, setPost] = useState([])
  const {id} = useParams()
  useEffect(()=> {
        const fetchPost = async() => {
            const data = await PostService.getPost(id)
            setPost(data)
           
        }
        if(id){
           fetchPost() 
        }
        
    },[id])
    const addNewComment = (comment) => {
        setPost({...post, comments:[...post.comments, comment]})
    }
    const deletecomment = async(id) => {
        const response = prompt(
            "Are you sure you want to delete this comment?Type yes if you are"
        )
        if(response !== 'yes'){
            return
        }
        await PostService.deleteComment(id)
        setPost({...post, comments: post.comments.filter((comment)=> comment.id !== id)})
    }
    



    return (
        <div>
            <div className="container">
                 {post.user ? (<p>Author: {post.user.name} </p>
) : 'unknown'}
                <legend><strong>{post.title}</strong></legend>
                <p> {post.text}</p>
                <img style={{ width:"500px" }} src={post.imageUrl ? post.imageUrl : ''}/></div>            
          <div>
                <AddComment addcommentCallback={addNewComment} postId={id} />
            </div>
            <div>
            <h5><strong>Comments:</strong> </h5>
               {post.comments  ? 
      <div>
        {post.comments.map((comment) => (
          <div className="container">
            <h6>User: {comment.user.name}</h6>
            <p>{comment.content}</p>
          
           {activeUser ?
            <p>{activeUser.id === comment.user.id ?  <button onClick={() => deletecomment(comment.id)}>Delete</button> : ''}</p> : ''}
           <hr/>
           </div>
        ))}
      </div> : 'no comments yet'
      }
              
            </div>
           
        </div>
    )
}

export default Post
