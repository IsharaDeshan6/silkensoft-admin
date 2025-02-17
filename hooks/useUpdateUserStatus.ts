import { useState } from 'react';
import { toast } from 'sonner';

const useUpdateUserStatus = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateUserStatus = async (email: string, status: string) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}ChangeUserStatus`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, status }),
            });

            const data = await response.json();
            if (data.message === 'User status updated successfully') {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Update user status error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { updateUserStatus, isLoading };
};

export default useUpdateUserStatus;
