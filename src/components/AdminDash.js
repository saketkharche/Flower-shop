import React from 'react';
import './AdminDashboard.css';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <div className="sidebar">
        <h2>Admin Panel</h2>
        <ul>
          <li><Link to="/adminDash">Dashboard</Link></li>
          <li><Link to="/manage-users">Manage Users</Link></li>
          <li><Link to="/manage-orders">Manage Orders</Link></li>
          <li><Link to="/settings">Settings</Link></li>
          <li><Link to="/logout">Logout</Link></li>
        </ul>
      </div>
      
      <div className="dashboard-content">
        <h1>Admin Dashboard</h1>
        
        {/* Dashboard Cards */}
        <div className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>120</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>58</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p>10</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>$2000</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>User John Doe registered</li>
            <li>Order #102 was shipped</li>
            <li>Product ABC was added to the catalog</li>
            <li>User Jane Smith updated their profile</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
