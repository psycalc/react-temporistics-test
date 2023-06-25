import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';
import TemporisticsTestForm from './TemporisticsTestForm';
import DescriptionPage from './customComponents/DescriptionPage';
import Results from './customComponents/Results';
import PeopleNearby from './customComponents/PeopleNearby';

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/description-page">Description Page</Link>
          </li>
          <li>
            <Link to="/people-nearby">People Nearby</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<TemporisticsTestForm />} />
        <Route path="/description-page" element={<DescriptionPage />} />
        <Route path="/results" element={<Results />} />
        <Route path="/people-nearby" element={<PeopleNearby />} />
      </Routes>
    </Router>
  );
}

export default App;