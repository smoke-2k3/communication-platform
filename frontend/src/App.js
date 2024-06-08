import React from 'react';
import { BrowserRouter as Router, Route, Routes as Switch } from 'react-router-dom';
import GoogleLogin from './components/GoogleLogin';
import Dashboard from './components/Dashboard'; // Create this component later

const App = () => {
    return (
        <Router>
            <Switch>
                <Route path="/" element={<GoogleLogin />} exact />
                <Route path="/dashboard" element={<Dashboard />} />
            </Switch>
        </Router>
    );
};

export default App;
