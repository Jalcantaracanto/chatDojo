import React from 'react'
import './App.css'

function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/:roomId" component={ChatRoom} />
            </Switch>
        </Router>
    )
}

export default App
