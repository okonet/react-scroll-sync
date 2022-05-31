import React from 'react'

const ScrollSyncContext = React.createContext({
  registerPane: () => {},
  unregisterPane: () => {}
})

export default ScrollSyncContext
