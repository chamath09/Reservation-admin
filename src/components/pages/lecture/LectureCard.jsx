import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LectureCard = () => {
  const [lectures, setLectures] = useState([]);

  // Fetch data from the API
  useEffect(() => {
    const fetchLectures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/lecture');
        setLectures(response.data); // Assuming the API returns an array of lecture objects
      } catch (error) {
        console.error('Error fetching lectures:', error);
      }
    };

    fetchLectures();
  }, []);

  // Function to delete a lecture
  const deleteLecture = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/lecture/${id}`);
      // Update the state to remove the deleted lecture
      setLectures(lectures.filter((lecture) => lecture._id !== id));
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  // Function to sort lectures by date and start time
  const sortedLectures = [...lectures].sort((a, b) => {
    // Create date objects from date and start time
    const dateA = new Date(a.date); // a.date is in ISO format
    const dateB = new Date(b.date); // b.date is in ISO format

    // Add time to the date objects
    const startTimeA = a.startTime.split(':');
    const startTimeB = b.startTime.split(':');

    // Set hours and minutes for comparison
    dateA.setHours(startTimeA[0], startTimeA[1]);
    dateB.setHours(startTimeB[0], startTimeB[1]);

    return dateA - dateB; // Sort ascending
  });

  return (
    <div className="">
      <h2 className="text-2xl font-bold text-white mb-6">Lecture Schedule</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {sortedLectures.map((lecture) => (
          <div
            key={lecture._id} // Use lecture._id instead of index for a unique key
            className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src="https://img.freepik.com/free-vector/flat-medical-conference-illustrated_23-2148885344.jpg?uid=R168750986&ga=GA1.1.293342500.1719385243&semt=ais_hybrid"
              alt="Lecture"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{lecture.module}</h3>
              <p className="text-gray-700">Module Code: {lecture.moduleCode}</p>
              <p className="text-gray-700">Date: {lecture.date.split('T')[0]}</p>
              <p className="text-gray-700">Start Time: {lecture.startTime}</p>
              <p className="text-gray-700">End Time: {lecture.endTime}</p>
              <p className="text-gray-700">Hall: {lecture.hall}</p>
              {/* Delete Button */}
              <button
                onClick={() => deleteLecture(lecture._id)} // Call deleteLecture with the lecture's id
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
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

export default LectureCard;
