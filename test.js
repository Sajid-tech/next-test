import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Image from 'next/image';

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const ProductPage = () => {
    const [product, setProduct] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get('/api/products'); // Assuming your API endpoint for fetching products is `/api/products`
                const data = response.data;
                const productById = data.product.find(item => item._id === `${id}`);
                setProduct(productById);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        };

        fetchProduct();
    }, [id]);

    const nextSlide = () => {
        const newIndex = (currentImageIndex + 1) % (product.images.length);
        setCurrentImageIndex(newIndex);
    };

    const prevSlide = () => {
        const newIndex = (currentImageIndex - 1 + product.images.length) % (product.images.length);
        setCurrentImageIndex(newIndex);
    };

    if (product) {
        return (
            <section className="mt-20 md:mt-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="relative w-full h-96 mx-auto overflow-hidden">
                        <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l z-10">
                            Prev
                        </button>
                        <div className="flex h-full transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentImageIndex * 100}%)` }}>
                            {product.images.map((image, index) => (
                                <div key={index} className="w-full h-full flex-shrink-0">
                                    <Image src={image} alt={`Slide ${index + 1}`} layout="fill" objectFit="contain" />
                                </div>
                            ))}
                        </div>
                        <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r z-10">
                            Next
                        </button>
                    </div>

                    <div className="p-4 lg:p-8 border col-span-2">
                        <h1 className="text-3xl font-semibold text-gray-900">{product.title}</h1>
                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Description</h2>
                            <p className="mt-2 text-gray-700">{product.description}</p>
                        </div>

                        <div className="mt-6">
                            <h2 className="text-xl font-semibold text-gray-900">Details</h2>
                            <p className="mt-2 text-gray-700 list-disc list-inside">Details</p>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
                            <div>
                                <label className="text-text font-semibold">Brand</label>
                                <p className="mt-2 text-accent list-disc list-inside">Brand</p>
                            </div>
                            <div>
                                <label className="text-text font-semibold">Gender</label>
                                <p className="mt-2 text-accent list-disc list-inside">Gender</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 my-3">
                            <div>
                                <label className="text-text font-semibold">Sizes</label>
                                <p className="mt-2 text-accent list-disc list-inside">Sizes</p>
                            </div>
                            <div>
                                <label className="text-text font-semibold">Colors</label>
                                <p className="mt-2 text-accent list-disc list-inside">Colors</p>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <h2 className="text-xl font-semibold text-gray-900">Price</h2>
                            <p className="mt-2 text-primary font-semibold text-lg">
                                Inr {formatPrice(product.price)}
                            </p>
                        </div>
                        <div className="w-full">
                            <button
                                onClick={() => {
                                    addProduct(product._id);
                                    toast.success("Item added to cart");
                                }}
                                className="bg-primary text-white py-2 px-4 mt-4 rounded-md hover:bg-primary-dark w-full"
                            >
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return <p>Product not found.</p>;
}

export default ProductPage;
