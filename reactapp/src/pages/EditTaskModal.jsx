import React, { useState, useEffect } from 'react';
import axios from '../api/axios';

const EditTaskModal = ({ show, onClose, taskId, onTaskUpdated }) => {
  const [task, setTask] = useState({
    title: '',
    description: '',
    priority: 'MEDIUM',
    status: 'PENDING',
  });

  useEffect(() => {
    if (show && taskId) {
      axios.get(`/api/tasks/${taskId}/`).then(response => {
        setTask(response.data);
      });
    }
  }, [show, taskId]);

  const handleChange = e => {
    const { id, value } = e.target;
    setTask(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`/api/tasks/${taskId}/`, task);
      alert('Task updated successfully');
      onTaskUpdated(); // callback to refresh list
      onClose(); // close modal
    } catch (error) {
      alert('Error updating task: ' + JSON.stringify(error.response.data));
    }
  };

  if (!show) return null;

  return (
    <div className="modal d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">Edit Task</h5>
              <button type="button" className="btn-close" onClick={onClose}></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="task-id" value={task.id || ''} />
              <div className="form-group mb-2">
                <label htmlFor="title">Title</label>
                <input type="text" className="form-control" id="title" value={task.title} onChange={handleChange} required />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="description">Description</label>
                <textarea className="form-control" id="description" rows="3" value={task.description} onChange={handleChange} required></textarea>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="priority">Priority</label>
                <select className="form-select" id="priority" value={task.priority} onChange={handleChange}>
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH">HIGH</option>
                </select>
              </div>
              <div className="form-group mb-2">
                <label htmlFor="status">Status</label>
                <select className="form-select" id="status" value={task.status} onChange={handleChange}>
                  <option value="PENDING">PENDING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
              <button type="submit" className="btn btn-primary">Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTaskModal;
