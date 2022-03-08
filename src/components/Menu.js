import React from 'react'

const Menu = ({handleNew}) => {
    return ( 
        <div className='menu'>
            <input className='search' type="search" placeholder='search ... ' />
            <input className='btn' type="button" value="nueva nota" onClick={handleNew} />
        </div>
    )
}

export default Menu