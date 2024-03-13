// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'


function useSyncLocalStorageState ( key, defaultValue=''){
  const [state, setState] = React.useState(
    ()=> window.localStorage.getItem(key) ?? defaultValue
  )
  
  React.useEffect(() => {
    window.localStorage.setItem(key, state)
  }, [key,state])

  return [state, setState]
}

function Greeting({initialState = ''}) {

  const [name, setName] = useSyncLocalStorageState(initialState)

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
