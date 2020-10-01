import React from 'react'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

// Importing Pages
import BusinessProfile from './pages/BuisnessProfile'
import BusinessView from './pages/BuisnessView'
import Home from './pages/Home'
import Login from './pages/Login'
import UserProfile from './pages/UserProfile'

// Import Nav
// import Nav from './components/Nav'

const App = () => {
  return (
    <>
      <Router>
        <div>
          {/* <Nav /> */}
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/businessprofile" component={BusinessProfile} />
            <Route path="/businessview" component={BusinessView} />
            <Route path="/login" component={Login} />
            <Route path="/userprofile" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </>
  )
}

export default App
