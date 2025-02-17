import { useState, useEffect } from 'react';

interface User {
    id: number;
    fname: string;
    lname: string;
    email: string;
}

interface Address {
    id: number;
    line1: string;
    line2: string;
    mobile: string;
    postal_code: string;
    city: {
        id: number;
        name: string;
    };
}

interface OrderStatus {
    id: number;
    name: string;
}

interface Product {
    id: number;
    title: string;
    description: string;
    price: number;
    qty: number;
    registerDate: string;
    category: {
        id: number;
        name: string;
    };
    size: {
        id: number;
        name: string;
    };
    color: {
        id: number;
        name: string;
        colorHex: string;
    };
    user: {
        id: number;
        fname: string;
        lname: string;
        email: string;
    };
    model: {
        id: number;
        name: string;
    };
    productStatus: {
        id: number;
        status: string;
    };
}

interface OrderItem {
    id: number;
    qty: number;
    price: number;
    product: Product;
}

interface Order {
    id: string;
    orderDate: string;
    totalAmount: number;
    user: User;
    address: Address;
    orderStatus: OrderStatus;
    orderItems: OrderItem[];
}

export const useOrders = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadOrders = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}LoadAllOrders`);
            const data = await response.json();
            if (data.message === 'success') {
                setOrders(data.orders);
            } else {
                setError('Failed to load orders');
            }
        } catch (err) {
            setError('Failed to load orders');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadOrders();
    }, []);

    return { orders, loading, error, loadOrders };
};
