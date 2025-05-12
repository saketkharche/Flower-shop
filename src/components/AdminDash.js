import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    pendingOrders: 0,
    revenue: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("/admin/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Error fetching admin stats:", err);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="admin-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>Admin Panel</h2>
        <nav>
          <ul>
            <li>
              <a href="/adminDash">Dashboard</a>
            </li>
            <li>
              <a href="/manage-users">Manage Users</a>
            </li>
            <li>
              <a href="/manage-orders">Manage Orders</a>
            </li>
            <li>
              <a href="/settings">Settings</a>
            </li>
            <li>
              <a href="/logout">Logout</a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <header className="top-header">
          <h1>Admin Dashboard</h1>
        </header>

        {/* Stats Cards */}
        <section className="dashboard-cards">
          <div className="card">
            <h3>Total Users</h3>
            <p>{stats.totalUsers}</p>
          </div>
          <div className="card">
            <h3>Total Orders</h3>
            <p>{stats.totalOrders}</p>
          </div>
          <div className="card">
            <h3>Pending Orders</h3>
            <p>{stats.pendingOrders}</p>
          </div>
          <div className="card">
            <h3>Revenue</h3>
            <p>₹{stats.revenue.toFixed(2)}</p>
          </div>
        </section>

        {/* Recent Activity */}
        <section className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>User John Doe registered</li>
            <li>Order #102 was shipped</li>
            <li>Product ABC was added to the catalog</li>
            <li>User Jane Smith updated their profile</li>
          </ul>
        </section>
      </main>
    </div>
  );
};

export default AdminDashboard;
