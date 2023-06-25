import { useState, useEffect } from 'react';
import mockPeople from './mockData/mockPeople.json';

const PeopleNearby = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [people, setPeople] = useState([]);

  useEffect(() => {
    const fetchPeople = async () => {
      setLoading(true);
      setError(null);
      setPeople([]);

      try {
        // const response = await fetch('/api/people/nearby');
        // const data = await response.json();
        // setPeople(data);
        setPeople(mockPeople);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPeople();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h2>People Nearby</h2>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name} ({person.age})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeopleNearby;