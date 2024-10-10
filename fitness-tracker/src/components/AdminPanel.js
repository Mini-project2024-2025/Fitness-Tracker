// NEW: Admin Panel Interface
import React, { useEffect, useState } from 'react';
import adminService from '../services/adminService';

function AdminPanel() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    adminService.getUsers()
      .then(data => setUsers(data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div>
      <h2>Admin Panel</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.activities.length} activities</li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
// Fetch the list of users and their activities using adminService.