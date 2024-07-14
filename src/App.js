import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AdTable from './components/AdTable/AdTable';
import AdShowcase from './components/AdShowcase/AdShowcase';
import Statistics from './components/Statistics/Statistics';
import Header from './components/Header';
import ErrorNotification from './components/ErrorNotification';

function App() {
    return (
        <Router>
            <Header />
            <ErrorNotification />
            <Routes>
                <Route path="/" element={<AdTable />} />
                <Route path="/ad-showcase" element={<AdShowcase />} />
                <Route path="/statistics" element={<Statistics />} />
            </Routes>
        </Router>
    );
}

export default App;
