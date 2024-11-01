import React, { useState } from 'react';
import LectureCard from "../pages/lecture/LectureCard";
import LabCard from "../pages/lab/LabCard";

const Home = () => {
  const [showLecture, setShowLecture] = useState(true);
  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-gray-800 via-gray-600 to-gray-900 p-1">
      <h1 className="text-3xl font-bold text-white mb-6">
      </h1>
      <div className="mb-4">
        <button
          onClick={() => setShowLecture(true)}
          className={`mx-2 px-4 py-2 rounded-lg text-white transition duration-300 ${
            showLecture ? 'bg-blue-600' : 'bg-gray-600 hover:bg-blue-600'
          }`}
        >
          Lectures
        </button>
        <button
          onClick={() => setShowLecture(false)}
          className={`mx-2 px-4 py-2 rounded-lg text-white transition duration-300 ${
            !showLecture ? 'bg-blue-600' : 'bg-gray-600 hover:bg-blue-600'
          }`}
        >
          Labs
        </button>
      </div>
      <div >
        {showLecture ? <LectureCard /> : <LabCard />}
      </div>
    </div>
  );
}

export default Home;
