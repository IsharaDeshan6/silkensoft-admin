'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { RecentSales } from "@/components/admin/dashboard/RecentSales";
import { DashboardStats } from "@/components/admin/dashboard/DashboardStats";
import { Chart } from "@/components/admin/dashboard/Chart";
import { useAuth } from '@/context/AuthContext';
import { useRecentTransactions } from '@/hooks/useRecentTransactions';

export default function Dashboard() {
    const { isAuthenticated } = useAuth();
    const { data, loading, error } = useRecentTransactions();

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <>
            <DashboardStats />
            <div className={'grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'}>
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Recent transactions from the last 7 days
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chart data={data} />
                    </CardContent>
                </Card>
                <RecentSales />
            </div>
        </>
    );
}
