"use client"
import {useEffect, useState} from "react";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Avatar, AvatarImage} from "@/components/ui/avatar";
import {Eye, EyeOff} from "lucide-react";
import {useAuth} from "@/context/AuthContext";
import {useAdminDetails} from "@/hooks/useAdminDetails";
import useUpdateAdminProfile from "@/hooks/useUpdateAdminProfile";

export default function AdminSettingsPage() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const {adminDetails, loading, error} = useAdminDetails();
    const {isAuthenticated} = useAuth();
    const {updateProfile, isLoading} = useUpdateAdminProfile();
    const [avatar, setAvatar] = useState("https://github.com/shadcn.png");
    const [admin, setAdmin] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        image: null as File | null
    });

    useEffect(() => {
        if (adminDetails) {
            setAvatar(adminDetails.admin_has_avatar ? `${process.env.NEXT_PUBLIC_API_URL}images/admin/admin.jpg?timestamp=${Date.now()}` : "https://github.com/shadcn.png");
            setAdmin({
                firstName: adminDetails.fname,
                lastName: adminDetails.lname,
                email: adminDetails.email,
                password: adminDetails.password,
                image: null
            });
        }
    }, [adminDetails]);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!adminDetails) {
        return <div>No admin details found</div>;
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setAvatar(event.target?.result as string);
            };
            reader.readAsDataURL(files[0]);
            setAdmin((prevAdmin) => ({...prevAdmin, image: files[0]}));
        }
    };

    const handleRemoveImage = () => {
        setAvatar("https://github.com/shadcn.png");
        setAdmin((prevAdmin) => ({...prevAdmin, image: null}));
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setAdmin((prevAdmin) => ({...prevAdmin, [name]: value}));
    };

    const handleSave = () => {
        updateProfile(admin);
    };

    return (
        <Card className="max-w-lg mx-auto mt-10">
            <CardHeader>
                <CardTitle>Admin Settings</CardTitle>
                <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-col items-center gap-4">
                    <Avatar className="w-24 h-24">
                        <AvatarImage src={avatar} alt="Admin Avatar"/>
                    </Avatar>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <label>
                                Change Image
                                <input type="file" accept="image/*" className="hidden" onChange={handleChangeImage}/>
                            </label>
                        </Button>
                        <Button variant="destructive" onClick={handleRemoveImage}>Remove Image</Button>
                    </div>
                </div>
                <div className="mt-6 space-y-4">
                    <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                            id="firstName"
                            name="firstName"
                            value={admin.firstName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                            id="lastName"
                            name="lastName"
                            value={admin.lastName}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="email"
                            type="email"
                            value={admin.email}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <Label htmlFor="password">Password</Label>
                        <div className="relative">
                            <Input
                                id="password"
                                name="password"
                                type={isPasswordVisible ? "text" : "password"}
                                value={admin.password}
                                onChange={handleInputChange}
                            />
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="absolute right-2 bottom-0"
                                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                            >
                                {isPasswordVisible ? <Eye className="w-4 h-4"/> : <EyeOff className="w-4 h-4"/>}
                            </Button>
                        </div>
                    </div>
                </div>
            </CardContent>
            <div className="p-4">
                <Button className="w-full" onClick={handleSave} disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save'}
                </Button>
            </div>
        </Card>
    );
}
