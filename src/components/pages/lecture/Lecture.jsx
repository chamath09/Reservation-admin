import React, { useState } from 'react';
import axios from 'axios';

const Lecture = () => {
  const [formData, setFormData] = useState({
    module: '',
    moduleCode: '',
    date: '',
    startTime: '',
    endTime: '',
    hall: '',
  });
  const [submittedLectures, setSubmittedLectures] = useState([]);

  // List of available halls
  const halls = [
    'SF-01', 'SF-02', 'SF-03', 'SF-04', 'SF-05',
    'FF-01', 'FF-02', 'FF-03', 'FF-04', 'FF-05',
    'GF-01', 'GF-02', 'GF-03', 'GF-04', 'GF-05',
    'LGF-01', 'LGF-02', 'LGF-03', 'LGF-04', 'LGF-05',
  ];

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if the same date, time, and hall already exists in the submittedLectures
    const isDuplicate = submittedLectures.some(
      lecture =>
        lecture.date === formData.date &&
        lecture.startTime === formData.startTime &&
        lecture.endTime === formData.endTime &&
        lecture.hall === formData.hall
    );

    if (isDuplicate) {
      alert('This time slot for the selected hall has already been taken. Please select a different time or hall.');
    } else {
      try {
        // Send the data to the server
        await axios.post('http://localhost:5000/api/lecture', formData);
        setSubmittedLectures([...submittedLectures, formData]);
        alert('Lecture added successfully!');

        // Clear the form
        setFormData({
          module: '',
          moduleCode: '',
          date: '',
          startTime: '',
          endTime: '',
          hall: '',
        });
      } catch (error) {
        console.error('Error adding lecture:', error);
        alert('Failed to add lecture. Please try again later.');
      }
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-800 to-gray-900">
      <div className="w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Schedule a Lecture</h2>
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

          <div className="flex flex-col sm:flex-row sm:space-x-4">
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
            <label className="block text-sm font-medium text-gray-700">Hall</label>
            <select
              name="hall"
              value={formData.hall}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            >
              <option value="">Select a hall</option>
              {halls.map((hall, index) => (
                <option key={index} value={hall}>
                  {hall}
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

export default Lecture;
