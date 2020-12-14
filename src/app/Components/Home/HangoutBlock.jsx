import React from 'react'
import LotiteView from './LotiteView/LotiteView'
import animation from './LotiteView/Animation/connect.json'
import Typical from 'react-typical'
import { Button } from 'semantic-ui-react'
import'./StyleHome.css'
import { useHistory } from 'react-router-dom'



export default function HangoutBlock() {
    const history = useHistory()
    var w = window.innerWidth;

    return (
        <div className='event'>
            <div className='event_right'>
                <LotiteView  animation={animation} width={w <=700? 300: 600} height={w <=700? 300: 600} />
            </div>
            <div className='type'>
                <Typical
                    steps={['Welcome To the Family', 700, 'Hang Out Family', 400]}
                    loop={Infinity}
                    wrapper="h1"
                />
                <div className='event_text hang'>
                    <p>
                        Hang Out Club provides the best of event In Tomsk State,
                        We provide culture, music, education, food, travel, film, 
                        music and online events
                    </p>
                    <p>
                        All of the Tomsk State University events we provides 
                        and We have of our own programs, 
                        <span>
                            You get excited!, Join Events
                        </span>
                    </p>
                </div>

                <div  className='hero_btn'>
                    <Button onClick={()=>history.push('/event')} style={{ backgroundColor: '#14a2f4', color: 'white'}} content='Join The Club' />
                </div>
            </div>
        </div>
    )
}
