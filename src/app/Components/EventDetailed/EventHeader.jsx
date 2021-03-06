import { format } from 'date-fns'
import React, { Fragment } from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { openModal } from '../../redux/Modal/ModalAction'
import { Button, Label, Segment } from 'semantic-ui-react'
import { CancelUserPlace, userJoinEvent } from '../../firebase/FirestoreServices'
import './Style.css'

export default function EventHeader({events, isGoing, isAuthenticated, isHost}) {

    
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()

    const handleJoinEvent = async()=>{
        setLoading(true)
        try {
            await userJoinEvent(events)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }

    const handleCancelUserPlace= async()=>{
        setLoading(true)
        try {
            await CancelUserPlace(events)
        } catch (error) {
            toast.error(error.message)
        }finally{
            setLoading(false)
        }
    }
    return (
        <Fragment>
            <div className='event_header'
            style={{ backgroundImage: ` linear-gradient( rgba(0, 01, 0, 0.5), rgba(0, 0, 0, 0.5) ),url(/assets/categoryImages/${events.category}.jpg)`,}}
            >
                {
                events.status === "Online" &&
                <Label
                ribbon='right'
                style={{top: '50px',width:'150px', paddingRight:40}}
                color="green"
                content={`ONLINE EVENT `} />
                }
                <div className='container'>
                    <p className='title const'>{events.title}</p>
                    <p className='date const'>{format(events.date, 'MMMM d, yyyy h:mm a')}</p>
                    <p className='host const'>Hosted by 
                        <span>
                           {events.hostedBy}
                        </span>
                    </p>
                </div>
            </div>
            <Segment clearing attached="bottom" style={{marginTop: 10}}>

              { isAuthenticated ?
                <>
                    {!isHost && 
                    <Fragment>
                        { isGoing? 
                            <Button  loading={loading}  onClick={handleCancelUserPlace}>Cancel My Place</Button>
                            :
                            (events.invites > events.attendees.length) ?
                            <Button  loading={loading}   onClick={handleJoinEvent}  color="teal">
                                JOIN THIS EVENT
                            </Button>
                            :
                            <Button color='red'> Event is Completed</Button>
                        }
                    </Fragment> }
                </> :
                <> 
                    <Button  onClick={() => dispatch(openModal({modalType: 'LoginForm'}))}   color="green">
                        JOIN THIS EVENT
                    </Button>
                </>
              }

               {isHost && <Button color="orange" floated="right" as={Link} to={`/manage/${events.id}`}>
                Manage Event
                </Button>}
            </Segment>

        </Fragment>
    )
}
