import React from 'react';
import AdminLayout from '../HOC/AdminLayout';

const Dashboard = () => {
    return (
        <AdminLayout activeLink={'Home'}>
            <div className="user_dashboard">
                this is your dashboard
            </div>
        </AdminLayout>
        
    );
};

export default Dashboard;