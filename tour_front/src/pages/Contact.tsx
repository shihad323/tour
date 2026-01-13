import React from 'react';

const Contact: React.FC = () => {
  const contacts = [
    {
      name: 'Iftakha alam',
      role: 'Customer Support Lead',
      email: 'iftakharalamshihad@gmail.com',
      phone: '01755737418'
    },
    {
      name: 'jiaul kamal',
      role: 'Partnerships & Sales',
      email: 'jiaulkamal@gmail.com',
      phone: '01896097385'
    },
    {
      name: 'Abdullah al munzir',
      role: 'Operations Manager',
      email: 'abdullahalmunzir@gmail.com',
      phone: '01715244436'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-4 py-8 text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-800">Contact Us</h1>
        <p className="text-lg text-gray-600">We're here to help — reach out to any of our team members below</p>
      </div>

      <div className="max-w-4xl px-4 py-12 mx-auto space-y-6">
        {contacts.map((c) => (
          <div key={c.email} className="p-6 bg-white rounded-lg shadow">
            <h3 className="text-xl font-semibold">{c.name}</h3>
            <p className="mb-2 text-sm text-gray-500">{c.role}</p>
            <p className="text-gray-700">Email: <a href={`mailto:${c.email}`} className="text-primary">{c.email}</a></p>
            <p className="text-gray-700">Phone: <a href={`tel:${c.phone}`} className="text-primary">{c.phone}</a></p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
