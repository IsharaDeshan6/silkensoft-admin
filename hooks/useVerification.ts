import { useState } from 'react';
import { toast } from 'sonner';
import {useRouter} from "next/navigation";


const useVerification = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const verification = async (email: string, verificationCode: string, setOpenVerifyDialog: (open: boolean) => void) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}Verification`, {
                method: 'POST',
                body: JSON.stringify({ email, verificationCode }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await response.json();
            if (data.message === "Account verified successfully") {
                setOpenVerifyDialog(false);
                router.push('/admin/dashboard');

            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error("Verification error:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return { verification, isLoading };
};

export default useVerification;
