// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


function useSyncLocalStorageState ( 
    key, 
    defaultValue='', 
    { serialize = JSON.stringify, deserialize = JSON.parse } = {}
  ){
  const [state, setState] = React.useState(
    ()=> {
      const valueInLocalStoreage = window.localStorage.getItem(key)
      if(valueInLocalStoreage) {
        return deserialize(valueInLocalStoreage)
      }
      return typeof defaultValue === 'function' ? defaultValue() : defaultValue
    }
  )
  
  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    if(prevKeyRef !==key){
      window.localStorage.removeItem(prevKeyRef)
    }
    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize( state))
  }, [key,serialize,state])

  return [state, setState]
}

function Greeting({initialName = ''}) {

  const [name, setName] = useSyncLocalStorageState('name' ,initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="State">State: </label>
        <input value={name} onChange={handleChange} id="State" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your State'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
