import React, { useEffect, useState } from 'react';
import api from '../Api';
import Loading from '../components/Loading';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUser = async () => {
        try {
            const res = await api.get('/api/u/user');
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            setError('Failed to fetch user data');
            setLoading(false);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    if (loading) {
        return <Loading loading={loading} />;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <p><strong>Username:</strong> {user.username}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p>No user data available</p>
            )}
        </div>
    );
};

export default Dashboard;
