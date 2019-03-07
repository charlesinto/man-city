import React from 'react';
import AdminNav from '../Admin/Nav/AdminNav';

const AdminLayout = ({children, activeLink, matches }) => {
    return (
        <div className="admin_container">
            <div className="admin_left_nav">
                <AdminNav activeLink={activeLink} matches={matches} />
            </div>
            <div className="admin_right" id="admin_right">
                {children}
            </div>
        </div>
    );
};

export default AdminLayout;