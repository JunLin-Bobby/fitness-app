import { useState, useEffect } from 'react';

type Exercise = {
  name: string;
  sets: number;
  reps: number;
  weight: number;
  notes?: string;
};

type WorkoutLog = {
  _id: string;
  date: string;
  muscleGroup: string;
  exercises: Exercise[];
};

export default function WorkoutDetailCard({
  log,
  onClose,
  onEdit,
  isEditing,
  onSaveEdit,
  onDelete,
}: {
  log: WorkoutLog;
  onClose: () => void;
  onEdit: () => void;
  isEditing: boolean;
  onSaveEdit: (log: WorkoutLog) => void;
  onDelete: (id: string) => void;
}) {
  const [editLog, setEditLog] = useState<WorkoutLog>(log);
  const [expanded, setExpanded] = useState(false);

  // 讓 editLog 跟 log prop 保持同步
  useEffect(() => {
    setEditLog(log);
  }, [log]);

  useEffect(() => {
    // 當元件掛載時啟動滑動展開
    setExpanded(true);
    return () => setExpanded(false);
  }, [log._id]);

  const handleEditChange = (field: keyof WorkoutLog, value: any) => {
    setEditLog({ ...editLog, [field]: value });
  };

  const handleExerciseChange = (idx: number, field: keyof Exercise, value: any) => {
    const newEx = [...editLog.exercises];
    newEx[idx] = { ...newEx[idx], [field]: value };
    setEditLog({ ...editLog, exercises: newEx });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEdit(editLog);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this workout log?')) {
      onDelete(log._id);
    }
  };

  return (
    <div
      className={`w-full max-w-2xl mt-6 bg-white rounded-lg shadow-lg p-6 transition-all duration-500 overflow-hidden ${
        expanded ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="text-xl font-bold">
          {isEditing
            ? <input
                type="text"
                className="border rounded p-1"
                value={editLog.muscleGroup}
                onChange={e => handleEditChange('muscleGroup', e.target.value)}
              />
            : `${log.muscleGroup} (${log.date.slice(0, 10)})`}
        </div>
        <button
          className="text-gray-400 hover:text-gray-700 text-2xl"
          onClick={onClose}
        >
          ×
        </button>
      </div>
      {isEditing ? (
        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label>Date</label>
            <input
              type="date"
              className="border rounded p-1 w-full"
              value={editLog.date.slice(0, 10)}
              onChange={e => handleEditChange('date', e.target.value)}
              required
            />
          </div>
          <div>
            <label>Exercises</label>
            {editLog.exercises.map((ex, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  placeholder="Name"
                  className="border rounded p-1 flex-1"
                  value={ex.name}
                  onChange={e => handleExerciseChange(idx, 'name', e.target.value)}
                  required
                />
                <input
                  type="number"
                  min={1}
                  placeholder="Sets"
                  className="border rounded p-1 w-16"
                  value={ex.sets}
                  onChange={e => handleExerciseChange(idx, 'sets', Number(e.target.value))}
                  required
                />
                <input
                  type="number"
                  min={1}
                  placeholder="Reps"
                  className="border rounded p-1 w-16"
                  value={ex.reps}
                  onChange={e => handleExerciseChange(idx, 'reps', Number(e.target.value))}
                  required
                />
                <input
                  type="number"
                  min={0}
                  placeholder="Weight (lb)"
                  className="border rounded p-1 w-24"
                  value={ex.weight}
                  onChange={e => handleExerciseChange(idx, 'weight', Number(e.target.value))}
                />
                <input
                  placeholder="Notes"
                  className="border rounded p-1 flex-1"
                  value={ex.notes || ''}
                  onChange={e => handleExerciseChange(idx, 'notes', e.target.value)}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-2 mt-4">
            <button
              type="button"
              className="bg-gray-300 px-4 py-2 rounded"
              onClick={onClose}
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
      ) : (
        <div>
          {log.exercises.map((ex, i) => (
            <div key={i} className="mb-2 border-b pb-2">
              <div className="font-semibold">{ex.name}</div>
              <div>
                Sets: {ex.sets} &nbsp; Reps: {ex.reps} &nbsp; Weight: {ex.weight} lb
              </div>
              {ex.notes && (
                <div className="text-gray-500 text-sm">Notes: {ex.notes}</div>
              )}
            </div>
          ))}
          <div className="flex gap-4 mt-2">
            <button className="text-blue-500 underline" onClick={onEdit}>
              Edit
            </button>
            <button className="text-red-500 underline" onClick={handleDelete}>
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
}