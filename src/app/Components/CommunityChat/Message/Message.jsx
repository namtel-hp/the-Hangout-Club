import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import './styleMessage.css'

export default function Message({message}) {
   const { currentUser } = useSelector(state => state.auth)
    return (
            <div className='chat'>
                <div 
                className={`message_body ${ currentUser.uid === message.userUid && 'message_body_receiver'} `}

                >
                    <Link to={`/profile/${message.userUid}`}>
                        <img src={message.photoURL} alt=' ' />
                    </Link>
                    <div className={`message_container`}>
                        <p className={`messages ${ currentUser.uid === message.userUid && 'message_receiver'} `}>
                           {message.message}
                        </p>
                        {/* <p className='time_stamp '>date</p> */}
                    </div>
                </div>
            </div>
        )
}


//className={`message_body ${ currentUser.displayName === message.displayName && 'message_body_receiver'} `}

// ${ currentUser.displayName === message.displayName && 'message_receiver'}