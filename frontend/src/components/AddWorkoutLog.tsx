import { useState } from 'react';
import WorkoutLogForm from './WorkoutLogForm';

export default function AddWorkoutLog({ onAddSuccess }: { onAddSuccess?: () => void }) {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full max-w-md">
      {!showForm ? (
        <button
          className="bg-green-600 text-white px-6 py-2 rounded shadow hover:bg-green-700 transition"
          onClick={() => setShowForm(true)}
        >
          Add Workout Log
        </button>
      ) : (
        <WorkoutLogForm
          onSuccess={() => {
            setShowForm(false);
            onAddSuccess && onAddSuccess();
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}