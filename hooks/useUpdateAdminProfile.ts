import { useState } from 'react';
import { toast } from 'sonner';

const useUpdateAdminProfile = () => {
    const [isLoading, setIsLoading] = useState(false);

    const updateProfile = async (admin: { firstName: string, lastName: string, email: string, password: string, image: File | null }) => {
        setIsLoading(true);
        try {
            const formData = new FormData();
            formData.append('fname', admin.firstName);
            formData.append('lname', admin.lastName);
            formData.append('email', admin.email);
            formData.append('password', admin.password);
            if (admin.image) {
                formData.append('image', admin.image);
            }

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}AdminUpdateProfile`, {
                method: 'POST',
                body: formData,
            });

            const data = await response.json();
            if (data.message === 'success') {
                toast.success('Profile updated successfully');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error('Update profile error:', error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    return { updateProfile, isLoading };
};

export default useUpdateAdminProfile;
