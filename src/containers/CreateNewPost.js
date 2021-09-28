import React,{useState} from 'react'
import { useHistory, useParams } from 'react-router';
import PostService from '../services/PostService';

const CreateNewPost = () => {
    const history = useHistory()
    const {id} = useParams()

    const[newPost,setNewPost] = useState({
        title:'',
        text:'',
        imageUrl:''
    });
    const handleSubmit = async(e) => {
        e.preventDefault()
        if(id){
            await PostService.editPost(id, newPost)
        }else{
            await PostService.addPost(newPost)
        }
        
        history.push('/my-posts')
    }


    return (
        <div className="row justify-content-center">

            <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
                <h2>Create New Post</h2>
                <form onSubmit={handleSubmit}>
    <input
    required
    type="text"
    placeholder="title"
    className="form-control"
    value={newPost.title}
    onChange={({target})=> setNewPost({...newPost, title:target.value})}
    />
    <input
    required
    placeholder="description"
    type="text"
    className="form-control"
    value={newPost.text}
    onChange={({target})=>setNewPost({...newPost, text:target.value})}


    />
    <input 
    type="url" 
    className="form-control" 
    id="imageUrl" placeholder="Image url" 
    value={newPost.imageUrl} 
    onChange={({target})=> setNewPost({...newPost, imageUrl:target.value})} />

    <button className="btn btn-success">{id ? 'Edit' : 'Add'}</button>
    </form>
            </div>
        </div>
    )
}

export default CreateNewPost
