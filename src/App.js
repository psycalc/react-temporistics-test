import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemporisticsTestForm from './TemporisticsTestForm';
import DescriptionPage from './customComponents/DescriptionPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TemporisticsTestForm />} />
        <Route path="/description-page" element={<DescriptionPage />} />
      </Routes>
    </Router>
  );
}


export default App;
