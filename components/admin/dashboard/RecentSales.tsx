import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useOrders } from "@/hooks/useOrders";
import { ScrollArea } from "@/components/ui/scroll-area";

export function RecentSales() {
    const { orders, loading, error } = useOrders();

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent orders</CardTitle>
            </CardHeader>
            <ScrollArea className="h-96"> {/* Adjust the height as needed */}
                <CardContent className="flex flex-col gap-8">
                    {orders.map((order) => (
                        <div key={order.id} className="flex items-center gap-4">
                            <Avatar className="hidden sm:flex h-9 w-9">
                                <AvatarImage src={`http://localhost:8080/SilkenSoft/images/users/${order.user.id}/avatar.jpg?timestamp=${Date.now()}`}  alt="Avatar Image" />
                                <AvatarFallback>{order.user.fname[0]}{order.user.lname[0]}</AvatarFallback>
                            </Avatar>
                            <div className="grid gap-1">
                                <p className="text-sm font-medium">{order.user.fname} {order.user.lname}</p>
                            </div>
                            <p className="text-sm text-muted-foreground">
                                {order.user.email}
                            </p>
                            <p className="ml-auto font-medium">+${order.totalAmount.toFixed(2)}</p>
                        </div>
                    ))}
                </CardContent>
            </ScrollArea>
        </Card>
    );
}
