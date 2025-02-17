import { useState } from 'react';
import { toast } from 'sonner';

const useUpdateOrderStatus = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateOrderStatus = async (orderId: string, statusId: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}ChangeOrderStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId, statusId }),
            });

            const data = await response.json();
            if (data.message === 'Order status updated successfully') {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Update order status error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { updateOrderStatus, isLoading };
};

export default useUpdateOrderStatus;
