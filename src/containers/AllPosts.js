import React,{useState, useEffect} from 'react'
import PostService from '../services/PostService'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { useSelector } from 'react-redux'
import { selectActiveUser } from '../store/auth'
const AllPosts = () => {
    const [posts, setPosts] = useState([])
    const[page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const[totalPages, setTotalPages] = useState(1)
    const history = useHistory()
    const activeUser = useSelector(selectActiveUser)    
    
    useEffect(()=>{
        const fetchPosts = async()=> {
         
            setLoading(true)
            const data = await PostService.getPosts(page)
            console.log('jeca', data)
            setTotalPages(data.last_page)
            setPosts([...posts, ...data.data])
            setLoading(false)

        }
        fetchPosts()
    },[page])
    const deletePost = async(id) => {
        const response = prompt(
            "Are you sure you want to delete this post?Type 'yes' if you are"
        )
        if(response ==! 'yes'){
            return 
        }
        const data = await PostService.deletePost(id)
      
             setPosts(posts.filter((post)=> post.id !== id))
      
        
        history.push('/posts')
    }
    return (
            <div className="container">
          
            <h3>All posts</h3>
     

            <div>
              
                     {posts.map((post)=> (
                         <>
                       <Link key={post.id} to ={`posts/${post.id}`}>
                     <p><strong>{post.title}</strong> </p>
                     <Link to={`author/${post.user.id}`}>
                     <p> <strong>Author:</strong> {post.user.name} </p>
                     </Link>
                   
                 
            <img style={{ width:"500px" }} src={post.imageUrl ? post.imageUrl : ''}/>
                       </Link>
        
            {activeUser ?
            <p>{activeUser.id === post.user.id ?  <button onClick={() => deletePost(post.id)}>Delete</button> : ''}</p> : ''}
                       
                       <hr/>
              
                       


</>
                               ))}
                                {totalPages !== page && <button  onClick={() => setPage(page + 1)}>{loading ? 'Loading...' : 'Load More'}</button>}
                      
              
                 
               
            </div>
            


            
        </div>
    )
}

export default AllPosts

