import { useState, useEffect } from 'react';

interface AdminDetails {
    id: number;
    username: string;
    fname: string;
    lname: string;
    email: string;
    password: string;
    mobile: string;
    address: string;
    postal_code: string;
    line1: string;
    line2: string;
    city: string;
    admin_has_avatar: boolean;
}

export const useAdminDetails = () => {
    const [adminDetails, setAdminDetails] = useState<AdminDetails | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAdminDetails = async () => {
            const email = sessionStorage.getItem('email');
            if (!email) {
                setError('No email found in session storage');
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadProfile`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });
                const data = await response.json();
                if (data.message === 'success') {
                    setAdminDetails(data.user);
                } else {
                    setError('Failed to load admin details');
                }
            } catch (err) {
                setError('Failed to load admin details');
            } finally {
                setLoading(false);
            }
        };

        fetchAdminDetails();
    }, []);

    return { adminDetails, loading, error };
};
