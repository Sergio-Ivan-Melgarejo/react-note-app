import React, { useContext }  from 'react'
import Status from './Status';
import statusContext from './status-context';

const Editor = ({item,onChangeTitle,onChangeText}) => {
  const status = useContext(statusContext)

  function handleTitleChange(e){
    onChangeTitle(e)
    status.autosave()
  }

  function handleTextChange(e){
    onChangeText(e)
    status.autosave()
  }

  return(
    <form className='editor'>
      <Status statusCode={status.status} />
        <fieldset className=''>
            <input className='title' value={item.title} onChange={handleTitleChange} />
        </fieldset>

        <fieldset className='editor-textarea'>
            <textarea className='content' value={item.text} onChange={handleTextChange} >
            </textarea>
        </fieldset>
    </form>
  )
}

export default Editor