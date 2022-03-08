import React from 'react'
import Item from './Item'

const List = ({items}) => {
  const handlePinned = () =>{}
  const handleSelectNote = () =>{}

  return (
    <div className='list'>
        {
          items.map((item,i) => <Item item={item} index={i} handlePinned={handlePinned}  handleSelectNote={handleSelectNote} />)
        }
    </div>
  )
}

export default List