import { useState, useEffect } from 'react';

interface User {
    id: number;
    username: string;
    email: string;
    status: string;
    registered_date: string;
    mobile: string;
}

export const useUsers = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadAllUsers`);
                const data = await response.json();
                if (data.message === 'success') {
                    setUsers(data.users);
                } else {
                    setError('Failed to load users');
                }
            } catch (err) {
                setError('Failed to load users');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    return { users, loading, error };
};
