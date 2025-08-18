import { useEffect, useState } from 'react';
import AddWorkoutLog from '../components/AddWorkoutLog';
import WorkoutGrid from '../components/WorkoutGrid';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [refreshFlag, setRefreshFlag] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetch(`${API_BASE_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => res.json())
        .then(data => {
          if (data.username) {
            setUsername(data.username);
            setError('');
          } else {
            setUsername('');
            setError('No username found in response');
          }
        })
        .catch(err => {
          console.error('Fetch error:', err);
          setUsername('');
          setError('Failed to fetch user info');
        });
    } else {
      setError('No JWT token found');
    }
  }, []);

  return (
    <div className="w-screen flex flex-col min-h-screen bg-[#F5F5DC]">
      <main className="flex-1 pt-3">
        <h1 className="text-3xl font-bold">
          Welcome to Fitness Tracker
        
        </h1>
        {!username && (
          <div className="text-3xl font-bold">
            Please login to continue.
          </div>
        )}
        {username && (
          <div className="mt-8 flex flex-col items-center w-full">
            <div className="flex flex-col items-start w-full max-w-2xl gap-8">
              <WorkoutGrid isLoggedIn={!!username} refreshFlag={refreshFlag} />
              <AddWorkoutLog onAddSuccess={() => setRefreshFlag(f => !f)} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}