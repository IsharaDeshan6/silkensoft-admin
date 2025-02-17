import { useState, useEffect } from 'react';

interface DashboardStats {
    totalRevenue: number;
    totalOrdersCount: number;
    totalProductsCount: number;
    totalUsersCount: number;
}

export function useDashboardStats() {
    const [stats, setStats] = useState<DashboardStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        async function fetchStats() {
            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}DashboardStatsServlet`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setStats(result);
            } catch (error) {
                setError(error as Error);
            } finally {
                setLoading(false);
            }
        }

        fetchStats();
    }, []);

    return { stats, loading, error };
}
