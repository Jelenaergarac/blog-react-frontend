import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link
} from "react-router-dom";
import AllPosts from './containers/AllPosts'
import Register from './containers/Register';
import Login from './containers/Login';
import Post from './containers/Post';
import CreateNewPost from './containers/CreateNewPost'
import { useEffect } from 'react';
import { getActiveUser } from './store/auth';
import PublicRoute from './components/shared/PublicRoute'
import PrivateRoute from './components/shared/PrivateRoute'
import { useDispatch } from 'react-redux';
import store from './store'
import MyPosts from './containers/MyPosts';
import Authors from './containers/Authors'
function App() {
  useEffect(()=> {
    if(localStorage.getItem('token')){
      setTimeout(()=> {
       store.dispatch(getActiveUser())
      },500)
    }
  },[])
  return (
    <Router>
      
       <div className="App">
      <Navbar />
      <Switch>
        <PublicRoute exact path='/register'>
          <Register/>

        </PublicRoute>
           <PublicRoute exact path='/login'>
          <Login/>

        </PublicRoute>
         <Route exact path='/posts'>
          <AllPosts/>

        </Route>
         <Route  path='/posts/:id'>
          <Post/>
          </Route>
         <PrivateRoute exact path='/add'>
          <CreateNewPost/>

        </PrivateRoute>
        <PrivateRoute exact path='/edit/:id'>
          <CreateNewPost/>

        </PrivateRoute>
               <Route exact path="/author/:id">
            <Authors />
          </Route>
        <PrivateRoute exact path="/my-posts" >
            <MyPosts/>
            </PrivateRoute>
            <Route path="/">
              <Redirect to="/posts" />

            </Route>
              <Route path="*">
              <div>Page not found</div>

            </Route>
      </Switch>
    </div>
    </Router>
   
  );
}

export default App;
