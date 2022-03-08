import React from 'react'

const Editor = () => {
  return (
    <form className='editor'>
        <fieldset className=''>
            <input className='title'/>
        </fieldset>

        <fieldset className='editor-textarea'>
            <textarea className='content'></textarea>
        </fieldset>
    </form>
  )
}

export default Editor