import React, { useEffect, useState } from 'react';
import { authAPI } from '../api/client';
import { useAuth } from '../context/AuthContext';
import { resolveImageSrc } from '../utils/image';

const Profile: React.FC = () => {
  const { user, setUser } = useAuth();
  const [profile, setProfile] = useState<any>(user);
  const [loading, setLoading] = useState(false);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const res = await authAPI.getProfile();
      const data = res.data.data || res.data;
      setProfile(data);
      setUser && setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
    } catch (e) {
      console.error('Failed to load profile', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!profile) fetchProfile();
  }, []);

  if (loading) return <div className="p-6">Loading...</div>;
  if (!profile) return <div className="p-6">No profile found.</div>;

  const img = resolveImageSrc({ img: profile.picture, title: profile.name });

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
        <div className="flex gap-6 items-center">
          <img src={img} alt={profile.name} className="w-28 h-28 object-cover rounded-full border" />
          <div>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-sm text-gray-600">{profile.email}</p>
            <p className="text-sm text-gray-600">{profile.phone}</p>
            <p className="text-sm text-gray-600">{profile.address}</p>
            <p className="text-sm text-gray-500 mt-2">Role: {profile.role}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
