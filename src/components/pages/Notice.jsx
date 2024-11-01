import React, { useEffect, useState } from 'react';

const Notice = () => {
    const [notices, setNotices] = useState([]);
    const [topic, setTopic] = useState('');
    const [description, setDescription] = useState('');
    const [editId, setEditId] = useState(null);

    const fetchNotices = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/notices');
            const data = await response.json();
            setNotices(data);
        } catch (error) {
            console.error('Error fetching notices:', error);
        }
    };

    useEffect(() => {
        fetchNotices();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const notice = { topic, description };

        try {
            const response = await fetch(editId ? `http://localhost:5000/api/notices/${editId}` : 'http://localhost:5000/api/notices', {
                method: editId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(notice),
            });

            if (response.ok) {
                alert(editId ? 'Notice updated successfully!' : 'Notice submitted successfully!');
                setTopic('');
                setDescription('');
                setEditId(null);
                fetchNotices();
            } else {
                alert('Failed to submit notice. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting notice:', error);
            alert('An error occurred while submitting the notice.');
        }
    };

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this notice?");
        if (confirmDelete) {
            try {
                const response = await fetch(`http://localhost:5000/api/notices/${id}`, {
                    method: 'DELETE',
                });

                if (response.ok) {
                    alert('Notice deleted successfully!');
                    fetchNotices(); 
                } else {
                    alert('Failed to delete notice. Please try again.');
                }
            } catch (error) {
                console.error('Error deleting notice:', error);
                alert('An error occurred while deleting the notice.');
            }
        }
    };

    const handleEdit = (notice) => {
        setTopic(notice.topic);
        setDescription(notice.description);
        setEditId(notice._id);
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-700 to-gray-900 p-5">
            <h2 className="text-2xl font-bold mb-4 text-white text-center">Manage Notices</h2>
            <form onSubmit={handleSubmit} className="bg-white max-w-md mx-auto p-6 rounded-lg space-y-4 shadow-lg">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Topic</label>
                    <input
                        type="text"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-gray-600 text-white rounded-md py-2 hover:bg-gray-800 transition duration-200"
                >
                    {editId ? 'Update Notice' : 'Submit Notice'}
                </button>
            </form>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <h3 className="text-xl font-bold mb-4 text-white col-span-full text-center">Existing Notices</h3>
                {notices.map((notice) => (
                    <div key={notice._id} className="border border-gray-300 p-4 rounded-md shadow-md bg-zinc-800 max-w-sm mx-auto h-56 flex flex-col">
                        <h4 className="font-semibold text-white">{notice.topic}</h4>
                        <p className="flex-grow text-gray-300">{notice.description}</p>
                        <div className="mt-4 flex justify-between">
                            <button
                                onClick={() => handleEdit(notice)}
                                className="text-yellow-500 hover:text-yellow-600 border border-yellow-500 rounded-md px-2 py-1 transition duration-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(notice._id)}
                                className="text-red-500 hover:text-red-600 border border-red-500 rounded-md px-2 py-1 transition duration-200"
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

export default Notice;
