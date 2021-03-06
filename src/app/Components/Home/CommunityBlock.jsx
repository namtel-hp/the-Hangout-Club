import React from 'react'
import LotiteView from './LotiteView/LotiteView'
import { Wave} from 'react-animated-text';
import animation from './LotiteView/Animation/community.json'
import './StyleHome.css'
import { Button, } from 'semantic-ui-react';
import { useHistory } from 'react-router-dom';

export default function CommunityBlock() {
    const history = useHistory()

    return (
        <div className='hero community_block_hero'>
            <div>
                <div className='hero_text'> 
                    <h1 className='wave_big_text_community' >
                        <Wave text="Hang Out Community" effect="stretch" effectChange={2.0} />
                    </h1>
                </div>
                <div className='community_text'>
                    <p>
                        Hang Out Club Community is the best platform out there, to connect people from different countries and different content 
                    </p>
            
                    <p className='hidden-sm'>
                       All the international students and foreigners can create channels and talk about what they like and dislike freely
                    </p>
                    <p className='hidden-sm'>
                      Our Community is built to connect people together  
                    </p>
                </div>
                <div className='hero_btn'>
                    <Button onClick={()=>history.push('/event')} style={{backgroundColor:'#7672F2', color:'white'}} content='Join The Community' />
                </div>
            </div>
            <div className='hero_right'>
                <LotiteView inverted animation={animation} />
            </div>
        </div>
    )
}
