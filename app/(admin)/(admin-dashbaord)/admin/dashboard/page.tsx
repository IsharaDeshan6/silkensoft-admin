'use client';
import {Card, CardContent, CardDescription, CardHeader, CardTitle,} from "@/components/ui/card";
import {RecentSales} from "@/components/admin/dashboard/RecentSales";
import {DashboardStats} from "@/components/admin/dashboard/DashboardStats";
import {Chart} from "@/components/admin/dashboard/Chart";
import {useAuth} from '@/context/AuthContext';

const dummyData = [
    {date: "2024-09-01", revenue: 1200},
    {date: "2024-09-02", revenue: 1500},
    {date: "2024-09-03", revenue: 1700},
    {date: "2024-09-04", revenue: 1400},
    {date: "2024-09-05", revenue: 1800},
    {date: "2024-09-06", revenue: 1600},
    {date: "2024-09-07", revenue: 1900},
];

export default function Dashboard() {

    const {isAuthenticated} = useAuth();

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    return (
        <>

            <DashboardStats/>
            <div className={'grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3 mt-10'}>
                <Card className="xl:col-span-2">
                    <CardHeader>
                        <CardTitle>Transactions</CardTitle>
                        <CardDescription>
                            Recent transactions from the last 7 days
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Chart data={dummyData}/>
                    </CardContent>
                </Card>
                <RecentSales/>
            </div>
        </>
    );
}
