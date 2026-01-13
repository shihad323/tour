import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone?: string;
  address?: string;
}

const Register: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
  });
  const [pictureFile, setPictureFile] = useState<File | null>(null);
  const [picturePreview, setPicturePreview] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const { confirmPassword, ...userData } = formData;
      // if picture selected, send as FormData
        if (pictureFile) {
          const fd = new FormData();
          Object.keys(userData).forEach(key => {
            const val = (userData as any)[key];
            if (val !== undefined && val !== null) fd.append(key, String(val));
          });
          fd.append('picture', pictureFile);
          await register(fd);
        } else {
          await register(userData);
        }
      navigate('/login');
    } catch (err: any) {
      setError(err.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setPictureFile(file);
    if (file) setPicturePreview(URL.createObjectURL(file));
    else setPicturePreview(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-8">
      <div className="w-full max-w-lg bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create an account</h2>
        {error && <div className="mb-4 text-sm text-red-600">{error}</div>}

        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="flex items-center gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile</label>
              <div className="mt-2 flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-full overflow-hidden border">
                  {picturePreview ? (
                    <img src={picturePreview} alt="preview" className="w-full h-full object-cover" />
                  ) : (
                    <img src="/tour_images/default_1.jpg" alt="avatar" className="w-full h-full object-cover" />
                  )}
                </div>
                <input type="file" accept="image/*" onChange={handleFileChange} className="text-sm" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Full name</label>
            <input name="name" value={formData.name} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input name="email" type="email" value={formData.email} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input name="phone" value={formData.phone} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input name="address" value={formData.address} onChange={handleChange} className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <input name="password" type="password" value={formData.password} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="new-password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm</label>
              <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} required className="w-full p-3 border border-gray-300 rounded-md mt-1 focus:outline-none focus:ring-2 focus:ring-primary" autoComplete="new-password" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full py-2 mt-2">
            {loading ? 'Registering...' : 'Create account'}
          </button>

          <p className="text-center text-sm text-gray-600 mt-2">
            Already have an account? <a href="/login" className="text-primary font-medium">Login</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
