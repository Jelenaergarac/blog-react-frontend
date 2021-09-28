import React,{useState} from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import {register} from '../store/auth'
const Register = () => {
    const dispatch = useDispatch()
    const history = useHistory()

    const[userData, setUserData] = useState({
        name:'',
        email:'',
        password:'',
        password_confirmation:'',
    })
    const handleSubmit = (e)=> {
        e.preventDefault()
      
     dispatch(register(userData))
     history.push('/posts')
    
        
    }

    return (
        <div>
           <div className="row justify-content-center">
               <div className="col-md-6 shadow-lg p-3 mb-5 bg-white rounded">
                   <h2>Register Here</h2>
                   <form onSubmit={handleSubmit}>
                       <input
                       className="form-control"
                       required
                       type="text"
                       value={userData.name}
                       onChange={({target})=> setUserData({...userData, name:target.value})}
                       placeholder="name"
                       />
                          <input
                       className="form-control"
                       required
                       type="email"
                        value={userData.email}
                       onChange={({target})=> setUserData({...userData, email:target.value})}
                       placeholder="email"
                       />
                          <input
                       className="form-control"
                       required
                       type="password"
                        value={userData.password}
                       onChange={({target})=> setUserData({...userData, password:target.value})}
                       placeholder="password"
                       />
                          <input
                       className="form-control"
                       required
                       type="password"
                        value={userData.password_confirmation}
                       onChange={({target})=> setUserData({...userData, password_confirmation:target.value})}
                       placeholder="Confirm password here"
                       />
                       <button className="btn btn-success">Submit</button>
                   </form>

               </div>

           </div>
        </div>
    )
}

export default Register
