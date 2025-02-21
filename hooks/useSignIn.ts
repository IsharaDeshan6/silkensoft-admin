import { useState } from 'react';
import { toast } from 'sonner';
import Cookies from "js-cookie";


const useSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);

    const signIn = async (email: string, password: string, rememberMe: boolean, setOpenVerifyDialog: (open: boolean) => void) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}SignIn`, {
                method: 'POST',
                body: JSON.stringify({ email, password }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                const data = await response.json();
                if (data.message === "success") {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('userType', data.userType);
                    localStorage.setItem('email', email);
                    setOpenVerifyDialog(true);

                    if (rememberMe) {
                        Cookies.set('email', email, { expires: 7 });
                    }
                } else {
                    toast.error(data.message);
                }
            } else {
                const errorText = await response.text();
                console.error("Response error:", errorText);
                toast.warning("Please try again later");
            }
        } catch (error) {
            console.error("Sign-in error:", error);
            toast.error("An error occurred. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    return { signIn, isLoading };
};

export default useSignIn;
