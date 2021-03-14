import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import './style.css';
import { logout } from '../../actions';
/**
* @author
* @function Header
**/

const Header = (props) => {
  const  auth = useSelector(state => state.auth);
  const dispatch = useDispatch();
  return(
    <header className="header">
        <div style={{display: 'flex'}}>
          <div className="logo">Web Messenger</div>
          {
             !auth.authenticated ?
             <ul className="leftMenu">
             <li><NavLink to={'/login'}>Login</NavLink></li>
             <li><NavLink to={'/signup'}>Sign up</NavLink></li>
           </ul> : null
          }


            
        </div>
          <div style={{margin: '20px 0', color: '#fff', fontWeight: 'bold'}}>
            {auth.authenticated ?`Azull ${auth.firstName} ${auth.lastName}`: ''}
          </div>
        <ul className="menu">
             {
               auth.authenticated ?
               <li>
                <Link to={'#'} onClick={() => {
                  dispatch(logout(auth.uid))
                }}>Logout</Link>
            </li> : null
             }

             
        </ul>
    </header>
   )

 }

export default Header