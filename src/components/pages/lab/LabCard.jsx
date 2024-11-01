import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LabCard = () => {
  const [labs, setLabs] = useState([]);

  useEffect(() => {
    const fetchLabs = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lab'); 
        setLabs(response.data);
      } catch (error) {
        console.error('Error fetching labs:', error);
      }
    };

    fetchLabs();
  }, []);

  const deleteLab = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lab/${id}`); 
      setLabs((prevLabs) => prevLabs.filter((lab) => lab._id !== id));
      console.log('Lab deleted successfully');
    } catch (error) {
      console.error('Error deleting lab:', error);
    }
  };

  const sortedLabs = [...labs].sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);

    const startTimeA = a.startTime.split(':');
    const startTimeB = b.startTime.split(':');

    dateA.setHours(startTimeA[0], startTimeA[1]);
    dateB.setHours(startTimeB[0], startTimeB[1]);

    return dateA - dateB; 
  });

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-white mb-6">Lab Schedule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedLabs.map((lab) => (
          <div
            key={lab._id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src="https://img.freepik.com/free-vector/laboratory-background-illustration_1284-16822.jpg?uid=R168750986&ga=GA1.1.293342500.1719385243&semt=ais_hybrid"
              alt="Lab"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{lab.module}</h3>
              <p className="text-gray-700">Module Code: {lab.moduleCode}</p>
              <p className="text-gray-700">Date: {lab.date.split('T')[0]}</p>
              <p className="text-gray-700">Start Time: {lab.startTime}</p>
              <p className="text-gray-700">End Time: {lab.endTime}</p>
              <p className="text-gray-700">Hall: {lab.labHall}</p>
              <button
                onClick={() => deleteLab(lab._id)} 
                className="mt-2 bg-red-500 text-white rounded px-4 py-2 hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LabCard;
