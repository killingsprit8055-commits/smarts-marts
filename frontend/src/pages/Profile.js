import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { authService } from '../services/api';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await authService.getUser();
      setName(response.data.name || '');
    } catch (err) {
      setError('Error fetching profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await authService.updateProfile({ name });
      setSuccess('Profile updated successfully!');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Error updating profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Profile</h1>

      <div className="border rounded-lg p-8 shadow-md">
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Phone Number</label>
          <p className="text-lg text-gray-800">{user?.phoneNumber}</p>
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Name</label>
          {editing ? (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded px-4 py-2 focus:outline-none focus:border-blue-500"
            />
          ) : (
            <p className="text-lg text-gray-800">{name || 'Not set'}</p>
          )}
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        {success && <p className="text-green-600 mb-4">{success}</p>}

        <div className="flex gap-4">
          {editing ? (
            <>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {saving ? 'Saving...' : 'Save'}
              </button>
              <button
                onClick={() => setEditing(false)}
                className="bg-gray-400 text-white px-6 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </>
          ) : (
            <button
              onClick={() => setEditing(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
