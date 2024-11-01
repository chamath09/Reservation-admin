import React, { useState } from 'react';
import axios from 'axios';

const Lab = () => {
  const [formData, setFormData] = useState({
    module: '',
    moduleCode: '',
    date: '',
    startTime: '',
    endTime: '',
    labHall: '', 
  });
  const [submittedLabs, setSubmittedLabs] = useState([]);

  const labHalls = [
    'Multimedia Lab', 'Network Lab', 'Software Lab', 'ICT Lab',
    'Physics Lab', 'Chemistry Lab', 'Agriculture Lab', 'Food Lab', 'Civil Lab',
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isDuplicate = submittedLabs.some(
      lab =>
        lab.date === formData.date &&
        lab.startTime === formData.startTime &&
        lab.endTime === formData.endTime &&
        lab.labHall === formData.labHall
    );

    if (isDuplicate) {
      alert('This time slot for the selected lab hall has already been taken. Please select a different time or lab hall.');
    } else {
      try {
        await axios.post('http://localhost:5000/api/lab', formData);
        setSubmittedLabs([...submittedLabs, formData]);
        alert('Lab session added successfully!');

        setFormData({
          module: '',
          moduleCode: '',
          date: '',
          startTime: '',
          endTime: '',
          labHall: '',
        });
      } catch (error) {
        console.error('Error adding lab session:', error);
        alert('Failed to add lab session. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Schedule a Lab Session</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Module</label>
            <input
              type="text"
              name="module"
              value={formData.module}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Module Code</label>
            <input
              type="text"
              name="moduleCode"
              value={formData.moduleCode}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">Start Time</label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>

            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700">End Time</label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Lab Hall</label>
            <select
              name="labHall" 
              value={formData.labHall}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a lab hall</option>
              {labHalls.map((lab, index) => (
                <option key={index} value={lab}>
                  {lab}
                </option>
              ))}
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Lab;
