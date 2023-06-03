import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemporisticsTestForm from './TemporisticsTestForm';
import DescriptionPage from './customComponents/DescriptionPage';
import Results from './customComponents/Results'; // Import Results component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemporisticsTestForm />} />
        <Route path="/description-page" element={<DescriptionPage />} />
        <Route path="/results" element={<Results />} /> {/* Removed `answers` prop */}
      </Routes>
    </Router>
  );
}

export default App;
