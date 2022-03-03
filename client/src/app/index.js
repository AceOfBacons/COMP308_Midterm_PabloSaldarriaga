import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { NavBar } from '../components'
import { GamesList, GameSurveyInsert, GamesUpdate } from '../pages'

import 'bootstrap/dist/css/bootstrap.min.css'

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path="/games/list" exact component={GamesList} />
                <Route path="/games/create" exact component={GameSurveyInsert} />
                <Route
                    path="/games/update/:id"
                    exact
                    component={GamesUpdate}
                />
            </Switch>
        </Router>
    )
}

export default App
