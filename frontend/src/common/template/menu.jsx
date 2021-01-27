import React from 'react'
import MenuItem from './menuItem'
import MenuTree from './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Início' icon='home' />
        <MenuItem path='usuarios' label='Gestão de usuários' icon='user' />
        <MenuItem path='contatos' label='Contatos' icon='phone-square' />
        <MenuItem path='compromissos' label='Compromissos' icon='calendar' />
    </ul>
)