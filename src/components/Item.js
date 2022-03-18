import React from 'react'

const Item = ({item,handlePinned,index,actualIndex,handleSelectNote,key}) => {

  return (
    <div key={key} className={index === actualIndex ? "note activeNote" : 'note'} onClick={(e)=>handleSelectNote(item,e)}>
        <div>
            {item.title === "" ? "[Sin título]" : item.title.substring(0,20) + " ..." }
        </div>

        <div>
            <button onClick={()=>handlePinned(item,index)} className={item.pinned ? "pinButton active" : "pinButton"}>{item.pinned ? "pined" : "pin"}</button>
        </div>
    </div>
  )
}

export default Item