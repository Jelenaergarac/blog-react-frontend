import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router'
import { selectIsAuthenticated } from '../../store/auth'

const PublicRoute = ({children, ...props}) => {
           const isGuest = !useSelector(selectIsAuthenticated)

 
           return (
        
        <Route {...props}>
            {isGuest ? children : <Redirect to="/posts"/>}
            
        </Route>
    )
}

export default PublicRoute
