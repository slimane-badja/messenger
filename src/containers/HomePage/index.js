import React, { useEffect, useState } from 'react';
import './style.css';
import Layout from '../../compenents/Layout';
import  { useDispatch, useSelector } from 'react-redux';
import { getRealtimeConversations, getRealtimeUsers, updateMessage } from '../../actions';


//l'affichage de l'utilisateur qu'il soit connecté ou pas 
const User = (props) => {

  const {user, onClick} = props;
    return (
      <div onClick={() => onClick(user)} className="displayName">
      <div className="displayPic">
    <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
     </div>
       <div style={{ display: 'flex', flex: 1, justifyContent: 'space-between',   margin: '0 10px'}}>
    <span style={{fontWeight: 500}}>{user.firstName} {user.lastName}</span>
    <span className={user.isOnline ? `onlineStatus` : `onlineStatus off`}></span>
     </div>
    </div> 

    );

}


const HomePage = (props) => {
     
   const dispatch = useDispatch();
    const auth = useSelector(state => state.auth);
    const user = useSelector(state => state.user);
    const [chatStarted, setChatStarted] = useState(false);
    const [chatUser, setChatUser] = useState('');
    const [message, setMessage] = useState('');
    const [userUid, setUserUid] = useState(null);
    let unsubscribe;
    useEffect(() => {
        unsubscribe = dispatch(getRealtimeUsers(auth.uid))
        .then(unsubscribe => {
          return unsubscribe;
        })
        .catch(error =>{
          console.log(error);
        })
    }, []);
  //compenentWillUnmount pour une faute!!
  useEffect(() => {
    return () => {
      //cleanup
      unsubscribe.then(f => f()).catch(error => console.log(error));
    }

  }, []);

  //initialisation de la conversation 
  const initChat = (user) => {

    setChatStarted(true)
    setChatUser(`${user.firstName} ${user.lastName}`)
    setUserUid (user.uid);

    console.log(user);

    dispatch(getRealtimeConversations({ uid_1: auth.uid, uid_2: user.uid }));
  }
 // la conversation
const submitMessage =(e) => {
  const msgObj = {
    user_uid_1: auth.uid,
    user_uid_2: userUid,
    message
  }

  if(message !==""){
    dispatch(updateMessage(msgObj))
    .then(() => {
      setMessage('')
    });
  }
   //console.log(msgObj);
}



//l'affichage de la liste des utilisateurs connecté et non connéctés
  return (
    <Layout>
    <section className="container">
    <div className="listOfUsers">
             
             {
               user.users.length > 0 ?
               user.users.map(user => {
                 return (
                 <User
                 onClick={initChat} 
                 key={user.uid} 
                 user={user} />
                 );
               }) : null
             }

                
           








        
                
    </div>
    <div className="chatArea">
        <div className="chatHeader"> 
        {
          chatStarted ? chatUser : ''
        }
        </div>
        <div className="messageSections">
             {
               chatStarted ?
               user.conversations.map(con =>
                <div style={{ textAlign: con.user_uid_1 == auth.uid ? 'right' : 'left' }}>
                <p className="messageStyle" >{con.message}</p>
            </div>)
                : null
             }
             </div>
              {
                chatStarted ?
                <div className="chatControls">
                  <textarea 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="write message"
                  />
                  <button onClick={submitMessage}>Send</button>
                </div> : null
              }        
        
        
    </div>
</section>
</Layout>
  );
}

export default HomePage;