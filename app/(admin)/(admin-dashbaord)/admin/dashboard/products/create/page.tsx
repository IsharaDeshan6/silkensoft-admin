"use client"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ChevronLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useCategories } from "@/hooks/useCategories";
import { useModels } from "@/hooks/useModels";
import { useColors } from "@/hooks/useColors";
import useAddProduct from "@/hooks/useAddProduct";
import Image from "next/image";

export default function ProductCreateRoute() {
    const [images, setImages] = useState<(File | null)[]>([null, null]);
    const [product, setProduct] = useState({
        title: "",
        description: "",
        price: "",
        quantity: "",
        categoryId: "",
        colorId: "",
        modelId: "",
        sizeId: "",
        adminEmail: ""
    });
    const { isAuthenticated } = useAuth();
    const { addProduct, isLoading } = useAddProduct();
    const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
    const { models, loading: modelsLoading, error: modelsError } = useModels();
    const { colors, loading: colorsLoading, error: colorsError } = useColors();

    useEffect(() => {
        const email = sessionStorage.getItem('email');
        if (email) {
            setProduct((prevProduct) => ({ ...prevProduct, adminEmail: email }));
        }
    }, []);

    if (!isAuthenticated) {
        return null; // or a loading spinner
    }

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const files = e.target.files;
        if (files && files[0]) {
            const newImages = [...images];
            newImages[index] = files[0];
            setImages(newImages);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setProduct((prevProduct) => ({ ...prevProduct, [name]: value }));
    };

    const handleSave = () => {
        addProduct({ ...product, image1: images[0], image2: images[1] });
    };

    return (
        <>
            <div>
                <div className="flex items-center gap-4">
                    <Button variant="outline" size="icon" asChild>
                        <Link href="/admin/dashboard/products">
                            <ChevronLeft className="w-4 h-4" />
                        </Link>
                    </Button>
                    <h1 className="text-xl font-semibold tracking-tight">New Product</h1>
                </div>

                <Card className="mt-5">
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                        <CardDescription>
                            In this form you can create your product
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-6">
                            <div className="flex gap-3">
                                <div className='w-full'>
                                    <Label>Category</Label>
                                    <Select name="categoryId" onValueChange={(value) => handleInputChange({ target: { name: "categoryId", value } } as React.ChangeEvent<HTMLInputElement>)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Category" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {categoriesLoading ? (
                                                <SelectItem value="loading">Loading...</SelectItem>
                                            ) : categoriesError ? (
                                                <SelectItem value="error">Error loading categories</SelectItem>
                                            ) : (
                                                categories.map(category => (
                                                    <SelectItem key={category.id} value={category.id.toString()}>{category.name}</SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='w-full'>
                                    <Label>Model</Label>
                                    <Select name="modelId" onValueChange={(value) => handleInputChange({ target: { name: "modelId", value } } as React.ChangeEvent<HTMLInputElement>)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Model" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {modelsLoading ? (
                                                <SelectItem value="loading">Loading...</SelectItem>
                                            ) : modelsError ? (
                                                <SelectItem value="error">Error loading models</SelectItem>
                                            ) : (
                                                models.map(model => (
                                                    <SelectItem key={model.id} value={model.id.toString()}>{model.name}</SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label>Title</Label>
                                <Input
                                    type="text"
                                    name="title"
                                    className="w-full"
                                    placeholder="Product Title"
                                    value={product.title}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="flex flex-col gap-3">
                                <Label>Description</Label>
                                <Textarea
                                    name="description"
                                    className="w-full h-[170px]"
                                    placeholder="Write your description right here..."
                                    value={product.description}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <div className="flex gap-3">
                                <div className='w-full'>
                                    <Label>Size</Label>
                                    <Select name="sizeId" onValueChange={(value) => handleInputChange({ target: { name: "sizeId", value } } as React.ChangeEvent<HTMLInputElement>)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Size" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="1">S</SelectItem>
                                            <SelectItem value="2">M</SelectItem>
                                            <SelectItem value="3">L</SelectItem>
                                            <SelectItem value="4">XL</SelectItem>
                                            <SelectItem value="5">XXL</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className='w-full'>
                                    <Label>Color</Label>
                                    <Select name="colorId" onValueChange={(value) => handleInputChange({ target: { name: "colorId", value } } as React.ChangeEvent<HTMLInputElement>)}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select Color" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {colorsLoading ? (
                                                <SelectItem value="loading">Loading...</SelectItem>
                                            ) : colorsError ? (
                                                <SelectItem value="error">Error loading colors</SelectItem>
                                            ) : (
                                                colors.map(color => (
                                                    <SelectItem key={color.id} value={color.id.toString()}>{color.name}</SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                <div className="flex flex-col gap-2 ">
                                    <Label>Price</Label>
                                    <Input
                                        type="number"
                                        name="price"
                                        placeholder="$55"
                                        value={product.price}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                <div className="flex flex-col gap-2 ">
                                    <Label>Quantity</Label>
                                    <Input
                                        type="number"
                                        name="quantity"
                                        placeholder="5"
                                        value={product.quantity}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <Label className="text-sm font-medium text-gray-700">Images</Label>
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {Array.from({ length: 2 }).map((_, index) => (
                                    <div key={index} className="flex flex-col gap-2">
                                        <div className="grid w-full max-w-sm items-center gap-1.5">
                                            <Label htmlFor={`picture-${index}`}>Image {index + 1}</Label>
                                            <Input
                                                id={`picture-${index}`}
                                                type="file"
                                                onChange={(e) => handleImageChange(e, index)}
                                            />
                                            {images[index] && (
                                                <Image
                                                    width={200}
                                                    height={200}
                                                    src={URL.createObjectURL(images[index]!)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="mt-2 w-full border border-gray-300"
                                                    style={{ maxWidth: "200px" }}
                                                />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button
                            type="button"
                            onClick={handleSave}
                            disabled={isLoading}
                        >
                            {isLoading && (<Loader2 className='mr-2 h-4 w-4 animate-spin inline-block' />)}
                            Create Product
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </>
    );
}
