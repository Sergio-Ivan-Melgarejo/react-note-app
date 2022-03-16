import React from 'react'

const Editor = ({item,onChangeTitle,onChangeText}) => {

  return (
    <form className='editor'>
        <fieldset className=''>
            <input className='title' value={item.title} onChange={onChangeTitle} />
        </fieldset>

        <fieldset className='editor-textarea'>
            <textarea className='content' value={item.text} onChange={onChangeText} >
            </textarea>
        </fieldset>
    </form>
  )
}

export default Editor