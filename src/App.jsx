import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import QuotePage from './QuotePage';


function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/order" element={<QuotePage />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
