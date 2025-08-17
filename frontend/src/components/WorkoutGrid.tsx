import { useEffect, useState } from 'react';
import WorkoutDetailCard from './WorkoutDetailCard';

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

export default function WorkoutGrid({ isLoggedIn, refreshFlag }: { isLoggedIn: boolean, refreshFlag?: boolean }) {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [selected, setSelected] = useState<WorkoutLog | null>(null);
  const [loading, setLoading] = useState(false);
  const [editLog, setEditLog] = useState<WorkoutLog | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    const token = localStorage.getItem('token');
    fetch(`/api/workouts`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(data => {
        const sorted = [...data].reverse();
        setLogs(sorted);
      })
      .finally(() => setLoading(false));
  }, [isLoggedIn, refreshFlag]);

  // 編輯表單送出
  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editLog) return;
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/workouts/${editLog._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editLog),
    });
    if (res.ok) {
      setEditLog(null);
      setSelected(null);
      // 觸發刷新
      window.location.reload();
    }
  };

  // 編輯送出
  const handleSaveEdit = async (log: WorkoutLog) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/workouts/${log._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(log),
    });
    if (res.ok) {
      setIsEditing(false);
      // 重新 fetch logs
      const newRes = await fetch(`/api/workouts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newLogs = await newRes.json();
      const sorted = [...newLogs].reverse();
      setLogs(sorted);
      // 找回剛剛編輯的 log
      const updatedLog = sorted.find(l => l._id === log._id);
      setSelected(updatedLog || null);
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');
    const res = await fetch(`/api/workouts/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      // 重新 fetch logs
      const newRes = await fetch(`/api/workouts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newLogs = await newRes.json();
      const sorted = [...newLogs].reverse();
      setLogs(sorted);
      setSelected(null);
    }
  };

  if (!isLoggedIn) return null;

  return (
    <div className="p-4 w-full flex flex-col items-center">
      <div className="grid grid-cols-5 gap-4 w-full">
        {logs.map((log, idx) => (
          <div
            key={log._id}
            className="bg-white rounded-lg shadow p-4 cursor-pointer hover:ring-2 ring-blue-400 transition-all duration-200"
            onClick={() => setSelected(selected?._id === log._id ? null : log)}
          >
            <div className="font-bold">Day {idx + 1}</div>
            <div className="text-sm text-gray-600">{log.muscleGroup}</div>
          </div>
        ))}
      </div>
      {selected && (
        <WorkoutDetailCard
          log={selected}
          onClose={() => {
            setSelected(null);
            setIsEditing(false);
          }}
          onEdit={() => setIsEditing(true)}
          isEditing={isEditing}
          onSaveEdit={handleSaveEdit}
          onDelete={handleDelete}
        />
      )}
      {loading && (
        <div className="text-center text-gray-500 mt-4">Loading...</div>
      )}
    </div>
  );
}

