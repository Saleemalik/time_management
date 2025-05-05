import React, { useEffect, useState } from 'react';
import axios from '../api/axios'; // use the custom instance we set up earlier
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [username, setUsername] = useState('');
  const [tasks, setTasks] = useState([]);
  const [currentURL, setCurrentURL] = useState('/api/tasks/');
  const [pagination, setPagination] = useState({ previous: null, next: null });
  const navigate = useNavigate();

  useEffect(() => {
    loadUser();
    loadTasks(currentURL);
  }, [currentURL]);

  const loadUser = async () => {
    try {
      const res = await axios.get('/user/me/');
      setUsername(res.data.username);
    } catch (err) {
      alert('Please log in.');
      navigate('/login');
    }
  };

  const loadTasks = async (url) => {
    try {
      const res = await axios.get(url);
      setTasks(res.data.results);
      setPagination({ previous: res.data.previous, next: res.data.next });
    } catch (err) {
      console.error(err.response?.data);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this task?')) return;
    try {
      await axios.delete(`/api/tasks/${id}/`);
      alert('Task deleted');
      loadTasks(currentURL);
    } catch (err) {
      alert('Error deleting task');
    }
  };

  return (
    <div className="container mt-3">
      <h1 className="text-center">Home PAGE</h1>
      <h2 className="text-center">Welcome, {username}</h2>

      <div className="d-flex justify-content-end">
        <button className="btn btn-primary m-2" onClick={handleLogout}>Logout</button>
      </div>

      <hr />
      <div className="d-flex justify-content-between mb-3">
        <h2>Tasks <b>Details</b></h2>
        <button className="btn btn-sm btn-primary">New Task</button> {/* You can open a modal here */}
      </div>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>productid</th>
            <th>title</th>
            <th>description</th>
            <th>priority</th>
            <th>status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(task => (
            <tr key={task.id}>
              <td>{task.id}</td>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.priority}</td>
              <td>{task.status}</td>
              <td>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(task.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="text-center mt-3">
        <button className="btn btn-primary me-2" disabled={!pagination.previous} onClick={() => setCurrentURL(pagination.previous)}>Previous</button>
        <button className="btn btn-primary" disabled={!pagination.next} onClick={() => setCurrentURL(pagination.next)}>Next</button>
      </div>
    </div>
  );
};

export default Home;
