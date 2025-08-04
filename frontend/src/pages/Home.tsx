import { useEffect, useState } from 'react';
import AddWorkoutLog from '../components/AddWorkoutLog';

export default function HomePage() {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('JWT token:', token);
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(res => {
          console.log('API response status:', res.status);
          return res.json();
        })
        .then(data => {
          console.log('API response data:', data);
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
    <div className="w-screen flex flex-col h-screen bg-[#F5F5DC]">
      <main className="flex-1 pt-16">
        <h1 className="text-3xl font-bold">
          Welcome to Fitness Tracker
          {username && (
            <span className="ml-2 text-blue-600">({username})</span>
          )}
        </h1>
        <h1>
         {!username && (
          <div className="text-3xl font-bold">
            Please login to continue.
          </div>
        )}
        </h1>
        {/* AddWorkoutLog component here */}
        {username && (
          <div className="mt-8 flex justify-center">
            <AddWorkoutLog />
          </div>
        )}
       
      </main>
    </div>
  );
}