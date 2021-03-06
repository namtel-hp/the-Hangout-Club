import React from 'react'
import { Link } from 'react-router-dom'
import { Header, Icon } from 'semantic-ui-react'

import './CommunityRow.css'

export default function CommunityRow({title, icon ,id, onClick}) {


    return (
        <div className='row' onClick={onClick}>
            {icon ? 
                <Header className='row_header'>
                    <Icon  className='icon' name={icon} />
                    <Header.Content className='title'>{title}</Header.Content>
                </Header>
                    :
                <Link to ={`/community/${id}`}>
                    <Header className='row_header_sub' as='h3'>
                        <Header.Content># {title}</Header.Content>
                    </Header>
                </Link>
            }
        </div>
    )
}
