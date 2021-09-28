import HttpService from './HttpService'

class PostService extends HttpService{

    getPosts = async(number = 1)=> {
        try{
            const {data} = await this.client.get(`/posts/?page=${number}`);
            return data;

        }catch(error){
            console.error(error)
        }
    }
    getPost = async(id)=> {
        const {data} = await this.client.get(`posts/${id}`)
          return data;
    }
    addPost = async(newPost) => {
        const {data} = await this.client.post(`/posts`, newPost)
        return data;
    }
    editPost = async(id, post) => {
        try{

            const {data} = await this.client.put(`posts/${id}`, post)
               return data;
        }catch(error){
            console.error(error)
        }

    }
    deletePost = async(id) => {
        try{

            const {data} = await this.client.delete(`posts/${id}`)
            return data;
        }catch(error){
            console.error(error)
        }
    }
    deleteComment = async(id) => {
        try {

            const {data} = await this.client.delete(`comments/${id}`)
            return data;
        }catch(error){
            console.error(error)
        }
    }
    addComment = async (comment, postId) => {
        try{
            const {data} = await this.client.post(`posts/${postId}/comments`,comment)
             return data;
        }catch(error){
            console.error(error)
        }
    }
    getMyPosts = async(id) => {
        const {data} = await this.client.get(`my-posts/${id}`)
        return data;
    }
}
export default new PostService()
