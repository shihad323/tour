import React, { useEffect, useState } from 'react';
import { tourAPI, usersAPI } from '../api/client';

interface Tour {
  _id: string;
  slug: string;
  title: string;
  description?: string;
  location?: string;
  costFrom?: number;
}

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
}

const AdminDashboard: React.FC = () => {
  const [tours, setTours] = useState<Tour[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loadingTours, setLoadingTours] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [newTour, setNewTour] = useState({ title: '', slug: '', location: '', costFrom: '' });
    const [includedText, setIncludedText] = useState('');
    const [excludedText, setExcludedText] = useState('');
    const [amenitiesText, setAmenitiesText] = useState('');
    const [tourPlanText, setTourPlanText] = useState('');
  const [tourTypes, setTourTypes] = useState<any[]>([]);
  const [selectedTourType, setSelectedTourType] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [newTypeName, setNewTypeName] = useState('');
  const [newTypeDesc, setNewTypeDesc] = useState('');
  const [imageFiles, setImageFiles] = useState<FileList | null>(null);

  const fetchTours = async () => {
    setLoadingTours(true);
    try {
      const res = await tourAPI.getAllTours(0, 1000);
      setTours(res.data.tours || res.data.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch tours');
    } finally {
      setLoadingTours(false);
    }
  };

  const fetchTourTypes = async () => {
    try {
      const res = await tourAPI.getTourTypes();
      const types = res.data.data || res.data || [];
      setTourTypes(types);
      if (types.length > 0) setSelectedTourType(types[0]._id || types[0].id || '');
    } catch (err: any) {
      setError(err.message || 'Failed to load tour types');
    }
  };

  const handleCreateTourType = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTypeName.trim()) return setError('Type name required');
    try {
      const payload = { name: newTypeName.trim(), description: newTypeDesc.trim() };
      const res = await tourAPI.createTourType(payload);
      const created = res.data.data || res.data;
      // refresh types
      await fetchTourTypes();
      setNewTypeName('');
      setNewTypeDesc('');
    } catch (err: any) {
      setError(err.message || 'Failed to create tour type');
    }
  };

  const fetchUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await usersAPI.getAllUsers(0, 1000);
      setUsers(res.data.users || res.data.data || []);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch users');
    } finally {
      setLoadingUsers(false);
    }
  };

  useEffect(() => {
    fetchTours();
    fetchUsers();
    fetchTourTypes();
  }, []);

  const handleDeleteTour = async (id: string) => {
    if (!window.confirm('Delete this tour?')) return;
    try {
      await tourAPI.deleteTour(id);
      setTours(t => t.filter(x => x._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete tour');
    }
  };

  const handleCreateTour = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // validate required fields for backend
      if (!selectedTourType) throw new Error('Please select a tour type');
      if (!startDate || !endDate) throw new Error('Please provide start and end dates');

      // validate costFrom is numeric
      const costNum = Number(newTour.costFrom);
      if (Number.isNaN(costNum) || costNum < 0) throw new Error('Cost must be a non-negative number');

      // build FormData to include images
      const form = new FormData();
      form.append('title', newTour.title);
      form.append('slug', newTour.slug);
      form.append('location', newTour.location);
      form.append('costFrom', String(costNum));
      form.append('description', newTour.title + ' - created from admin panel');
      form.append('tourType', selectedTourType);
      form.append('startDate', new Date(startDate).toISOString());
      form.append('endDate', new Date(endDate).toISOString());

        // parse included/excluded/tourPlan as arrays and amenities as array
        const parseLines = (txt: string) => txt.split(/\r?\n/).map(s => s.trim()).filter(Boolean);
        const parseCSV = (txt: string) => txt.split(',').map(s => s.trim()).filter(Boolean);

        const includedArr = parseLines(includedText);
        const excludedArr = parseLines(excludedText);
        const amenitiesArr = parseCSV(amenitiesText);
        const tourPlanArr = parseLines(tourPlanText);

        form.append('included', JSON.stringify(includedArr));
        form.append('excluded', JSON.stringify(excludedArr));
        form.append('amenities', JSON.stringify(amenitiesArr));
        form.append('tourPlan', JSON.stringify(tourPlanArr));

      // require exactly 5 images
      if (!imageFiles || imageFiles.length !== 5) {
        throw new Error('Please select exactly 5 images for the tour');
      }
      for (let i = 0; i < 5; i++) {
        form.append('images', imageFiles[i]);
      }

      const res = await tourAPI.createTourForm(form);
      const created = res.data.data || res.data.tour || res.data;
      setTours(prev => [created, ...prev]);
      setNewTour({ title: '', slug: '', location: '', costFrom: '' });
        setIncludedText('');
        setExcludedText('');
        setAmenitiesText('');
        setTourPlanText('');
      setSelectedTourType(tourTypes.length > 0 ? (tourTypes[0]._id || tourTypes[0].id || '') : '');
      setStartDate('');
      setEndDate('');
      setImageFiles(null);
    } catch (err: any) {
      const serverMsg = err?.response?.data;
      if (serverMsg) {
        // prefer detailed validation errors when available
        setError(serverMsg.message || JSON.stringify(serverMsg));
      } else {
        setError(err.message || 'Failed to create tour');
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      await usersAPI.deleteUser(id);
      setUsers(u => u.filter(x => x._id !== id));
    } catch (err: any) {
      setError(err.message || 'Failed to delete user');
    }
  };

  return (
    <div className="min-h-screen px-4 py-12 bg-gray-50">
      <div className="mx-auto space-y-8 max-w-7xl">
        <div className="p-6 bg-white rounded-lg shadow">
          <h1 className="mb-2 text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-gray-600">Manage tours and users, and view system information.</p>
        </div>

        {error && (
          <div className="p-4 border border-red-200 rounded bg-red-50">{error}</div>
        )}

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Create New Tour</h2>
            <form onSubmit={handleCreateTour} className="space-y-3">
              <input className="w-full p-2 border rounded" placeholder="Title" value={newTour.title} onChange={e => setNewTour(s => ({ ...s, title: e.target.value }))} required />
              <input className="w-full p-2 border rounded" placeholder="Slug" value={newTour.slug} onChange={e => setNewTour(s => ({ ...s, slug: e.target.value }))} required />
              <input className="w-full p-2 border rounded" placeholder="Location" value={newTour.location} onChange={e => setNewTour(s => ({ ...s, location: e.target.value }))} />
              <input
                type="number"
                min="0"
                step="0.01"
                className="w-full p-2 border rounded"
                placeholder="Cost From"
                value={newTour.costFrom}
                onChange={e => setNewTour(s => ({ ...s, costFrom: e.target.value }))}
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <select className="p-2 border rounded" value={selectedTourType} onChange={e => setSelectedTourType(e.target.value)}>
                  <option value="">Select tour type</option>
                  {tourTypes.map(t => (
                    <option key={t._id || t.id} value={t._id || t.id}>{t.name}</option>
                  ))}
                </select>
                <input type="date" className="p-2 border rounded" value={startDate} onChange={e => setStartDate(e.target.value)} />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium">Included (one per line)</label>
                <textarea className="w-full p-2 border rounded" rows={3} value={includedText} onChange={e => setIncludedText(e.target.value)} placeholder="e.g. Breakfast\nLocal guide" />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium">Excluded (one per line)</label>
                <textarea className="w-full p-2 border rounded" rows={3} value={excludedText} onChange={e => setExcludedText(e.target.value)} placeholder="e.g. Flights\nPersonal expenses" />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium">Amenities (comma separated)</label>
                <input className="w-full p-2 border rounded" placeholder="WiFi, Parking, Pool" value={amenitiesText} onChange={e => setAmenitiesText(e.target.value)} />
              </div>
              <div className="mt-2">
                <label className="block text-sm font-medium">Tour Plan (one step per line)</label>
                <textarea className="w-full p-2 border rounded" rows={4} value={tourPlanText} onChange={e => setTourPlanText(e.target.value)} placeholder="Day 1: Arrival\nDay 2: City tour" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <input type="date" className="p-2 border rounded" value={endDate} onChange={e => setEndDate(e.target.value)} />
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={e => setImageFiles(e.target.files)}
                    className="w-full"
                  />
                  <small className="text-sm text-gray-500">Select exactly 5 images</small>
                </div>
              </div>
              <div>
                <button className="px-4 py-2 text-white rounded bg-primary">Create Tour</button>
              </div>
            </form>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">Manage Tour Types</h2>
            <form onSubmit={handleCreateTourType} className="space-y-3">
              <input className="w-full p-2 border rounded" placeholder="Type name" value={newTypeName} onChange={e => setNewTypeName(e.target.value)} />
              <input className="w-full p-2 border rounded" placeholder="Description" value={newTypeDesc} onChange={e => setNewTypeDesc(e.target.value)} />
              <div>
                <button className="px-4 py-2 text-white rounded bg-primary">Create Type</button>
              </div>
            </form>

            <div className="mt-4">
              <h3 className="text-sm font-semibold mb-2">Existing Types</h3>
              <div className="space-y-2 text-sm text-gray-700">
                {tourTypes.length === 0 ? <div>No tour types found</div> : tourTypes.map(t => (
                  <div key={t._id || t.id} className="p-2 border rounded">{t.name} — {t.description}</div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-6 bg-white rounded-lg shadow">
            <h2 className="mb-4 text-xl font-semibold">System Info</h2>
            <p className="text-sm text-gray-700">Server: {window.location.hostname}</p>
            <p className="text-sm text-gray-700">Environment: {import.meta.env.MODE}</p>
            <p className="text-sm text-gray-700">API Base: {(import.meta.env.VITE_API_URL as string) || 'http://localhost:5000/api/v1'}</p>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">All Tours</h2>
          {loadingTours ? (
            <p>Loading tours...</p>
          ) : (
            <div className="space-y-3">
              {tours.map(t => (
                <div key={t._id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-semibold">{t.title}</div>
                    <div className="text-sm text-gray-500">{t.slug} — {t.location} — ${t.costFrom}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDeleteTour(t._id)} className="px-3 py-1 text-white bg-red-500 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-xl font-semibold">Users</h2>
          {loadingUsers ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-3">
              {users.map(u => (
                <div key={u._id} className="flex items-center justify-between p-3 border rounded">
                  <div>
                    <div className="font-semibold">{u.name} <span className="text-sm text-gray-500">({u.role || 'user'})</span></div>
                    <div className="text-sm text-gray-500">{u.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => handleDeleteUser(u._id)} className="px-3 py-1 text-white bg-red-500 rounded">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
