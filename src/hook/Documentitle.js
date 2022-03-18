import { useEffect } from 'react'

const useDocumentitle = (text,defaultValue) => {
    useEffect(() => {
        document.title =  !text ? defaultValue : text; 
      })    
}

export default useDocumentitle