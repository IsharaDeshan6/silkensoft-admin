"use client"
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { useAuth } from "@/context/AuthContext";
import { useOrders } from "@/hooks/useOrders";
import useUpdateOrderStatus from '@/hooks/useUpdateOrderStatus';
import { toast } from 'sonner';
import Image from "next/image";

const statusOrder = ["Order Placed", "Order Success", "Shipped", "Delivered"];

export default function OrdersPage() {
    const { isAuthenticated } = useAuth();
    const { orders, loading, error } = useOrders();
    const { updateOrderStatus } = useUpdateOrderStatus();
    const [localOrders, setLocalOrders] = useState(orders);

    useEffect(() => {
        setLocalOrders(orders);
    }, [orders]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const handleStatusChange = async (orderId: string, status: string) => {
        const order = localOrders.find(order => order.id === orderId);

        if (!order) {
            toast.error('Order not found.');
            return;
        }

        const currentStatusIndex = statusOrder.indexOf(order.orderStatus.name);
        const newStatusIndex = statusOrder.indexOf(status);

        if (newStatusIndex !== currentStatusIndex + 1) {
            toast.error('You cannot skip statuses. Please change the status step by step.');
            return;
        }

        const statusId = newStatusIndex + 1;
        await updateOrderStatus(orderId, statusId.toString());

        setLocalOrders(localOrders.map(order =>
            order.id === orderId ? { ...order, orderStatus: { ...order.orderStatus, name: status } } : order
        ));
    };

    const getNextStatuses = (currentStatus: string) => {
        const currentIndex = statusOrder.indexOf(currentStatus);
        return statusOrder.slice(currentIndex);
    };

    return (
        <>
            <Card>
                <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>Manage Orders from your store!</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Order Id</TableHead>
                                <TableHead>Order Date</TableHead>
                                <TableHead>Products</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Order Total</TableHead>
                                <TableHead className="text-right">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {localOrders.map(order => (
                                <TableRow key={order.id}>
                                    <TableCell>
                                        <p className="font-medium">{order.id}</p>
                                    </TableCell>
                                    <TableCell>{order.orderDate}</TableCell>
                                    <TableCell>
                                        {order.orderItems.map(item => (
                                            <Card key={item.id} className="mb-4">
                                                <CardContent className="flex items-center gap-x-2 justify-start pt-4">
                                                        <Image
                                                            src={`${process.env.NEXT_PUBLIC_API_URL}images/clothes/${item.product.id}/img1.jpg?timestamp=${Date.now()}`}
                                                            alt={item.product.title}
                                                            className="w-16 h-16 object-contain mr-2"
                                                            width={16}
                                                            height={16}
                                                        />
                                                    <div>
                                                        <p className="font-medium">{item.product.title}</p>
                                                        <p>Qty: {item.qty}</p>
                                                        <p>Price: Rs. {item.price.toFixed(2)}</p>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            order.orderStatus.name === 'Order Placed' ? 'info' :
                                                order.orderStatus.name === 'Order Success' ? 'success' :
                                                    order.orderStatus.name === 'Shipped' ? 'warning' :
                                                        order.orderStatus.name === 'Delivered' ? 'danger' :
                                                            'default'
                                        }>
                                            {order.orderStatus.name}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>Rs. {order.totalAmount.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <div>
                                            <select
                                                id="status"
                                                name="status"
                                                defaultValue={order.orderStatus.name}
                                                className="mt-2 block w-full rounded-md border-2 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                                onChange={(e) => handleStatusChange(order.id.toString(), e.target.value)}
                                            >
                                                {getNextStatuses(order.orderStatus.name).map(status => (
                                                    <option key={status} value={status}>{status}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <div className="fixed bottom-0 left-0 right-0 bg-white">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#"/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationEllipsis/>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationNext href="#"/>
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </>
    );
}
