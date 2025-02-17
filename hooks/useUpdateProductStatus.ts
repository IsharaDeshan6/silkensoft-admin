import { useState } from 'react';
import { toast } from 'sonner';

const useUpdateProductStatus = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateProductStatus = async (productId: string, status: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}ChangeProductStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ productId, status }),
            });

            const data = await response.json();
            if (data.message === 'Product status updated successfully') {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Update product status error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProductStatus, isLoading };
};

export default useUpdateProductStatus;
