import React from 'react'

const statusContext = React.createContext({
    status: 0,
    autosave: ()=>{}
})

export default statusContext