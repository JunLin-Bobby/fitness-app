import { useState } from 'react';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function WorkoutLogForm({ onSuccess, onCancel }: { onSuccess: () => void, onCancel: () => void }) {
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [muscleGroup, setMuscleGroup] = useState('');
  const [exercises, setExercises] = useState([{ name: '', sets: 1, reps: 1, weight: '', notes: '' }]);
  const [tags, setTags] = useState('');
  const [error, setError] = useState('');

  const handleExerciseChange = (idx: number, field: string, value: any) => {
    setExercises(exercises =>
      exercises.map((ex, i) => i === idx ? { ...ex, [field]: value } : ex)
    );
  };

  const addExercise = () => setExercises([...exercises, { name: '', sets: 1, reps: 1, weight: '', notes: '' }]);
  const removeExercise = (idx: number) => setExercises(exercises.filter((_, i) => i !== idx));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const token = localStorage.getItem('token');
    try {
      const res = await fetch(`${API_BASE_URL}/workouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          date,
          muscleGroup,
          exercises: exercises.map(ex => ({
            ...ex,
            weight: Number(ex.weight) || 0,
          })),
          tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        }),
      });
      if (!res.ok) throw new Error('Failed to add workout log');
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'Error');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
      <h2 className="text-xl font-bold mb-4">Add Workout Log</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Date</label>
          <input
            type="date"
            className="border rounded p-1 w-full"
            value={date}
            onChange={e => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Muscle Group</label>
          <input
            type="text"
            className="border rounded p-1 w-full"
            value={muscleGroup}
            onChange={e => setMuscleGroup(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exercises</label>
          {exercises.map((ex, idx) => (
            <div key={idx} className="mb-2 border rounded p-2 bg-gray-50">
              <div className="flex gap-2 mb-2 items-end">
                <div className="flex-1">
                  <label className="block text-xs mb-1">Exercise Name</label>
                  <input
                    placeholder="Exercise Name"
                    className="border rounded p-1 w-full"
                    value={ex.name}
                    onChange={e => handleExerciseChange(idx, 'name', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Sets</label>
                  <input
                    type="number"
                    min={1}
                    placeholder="Sets"
                    className="border rounded p-1 w-16"
                    value={ex.sets}
                    onChange={e => handleExerciseChange(idx, 'sets', e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs mb-1">Reps</label>
                  <input
                    type="number"
                    min={1}
                    placeholder="Reps"
                    className="border rounded p-1 w-16"
                    value={ex.reps}
                    onChange={e => handleExerciseChange(idx, 'reps', e.target.value)}
                    required
                  />
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <input
                  type="number"
                  min={0}
                  placeholder="Weight (lb)"
                  className="border rounded p-1 w-32"
                  value={ex.weight}
                  onChange={e => handleExerciseChange(idx, 'weight', e.target.value)}
                />
                <input
                  placeholder="Notes"
                  className="border rounded p-1 flex-1"
                  value={ex.notes}
                  onChange={e => handleExerciseChange(idx, 'notes', e.target.value)}
                />
                {exercises.length > 1 && (
                  <button
                    type="button"
                    className="text-red-500"
                    onClick={() => removeExercise(idx)}
                    title="Remove exercise"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-600 underline"
            onClick={addExercise}
          >
            Add Exercise
          </button>
        </div>
        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="border rounded p-1 w-full"
            value={tags}
            onChange={e => setTags(e.target.value)}
          />
        </div>
        <div className="flex gap-2 mt-4">
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}