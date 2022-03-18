import React, { useContext } from 'react'
import ItemsContext from './Items-context'

const Menu = () => {
    const context = useContext(ItemsContext)
  
    return ( 
        <div className='menu'>
            <input onChange={(e)=>context.onSearch(e)} className='search' type="search" placeholder='search ... ' />
            <input onClick={(e)=>context.onNew(e)} className='btn' type="button" value="Nueva Nota" />
        </div>
    )
}

export default Menu