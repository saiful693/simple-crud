"use client";
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Modal from '../Modal';
import { useRouter } from 'next/navigation';

const Products = () => {
    const { data: session, status } = useSession();
    const router = useRouter();
    const [products, setProducts] = useState([]);
    const [editProduct, setEditProduct] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (status === "loading") return;
        if (!session) {
            router.push('/login');
        } else {
            fetchProducts();
        }
    }, [session, status, router]);

    // Fetch products from API
    const fetchProducts = async () => {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
        setLoading(false);
    };

    // Add a new product
    const handleAddProduct = async (e) => {
        e.preventDefault();
        const newProduct = { name: e.target.name.value, price: e.target.price.value };

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newProduct),
        });
        e.target.reset();
        fetchProducts();
    };

    // Delete a product
    const handleDeleteProduct = async (id) => {
        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${id}`, { method: 'DELETE' });
        fetchProducts();
    };

    // Update a product
    const handleUpdateProduct = async (e) => {
        e.preventDefault();
        const updatedProduct = { name: e.target.name.value, price: e.target.price.value };

        await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${editProduct._id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedProduct),
        });
        closeModal();
        fetchProducts();
    };

    // Open edit modal with product data
    const openEditModal = (product) => {
        setEditProduct(product);
        setIsModalOpen(true);
    };


    const closeModal = () => {
        setIsModalOpen(false);
        setEditProduct(null);
    };


    return (
        <div className="flex flex-col items-center justify-center h-screen p-4">
            <h2 className="text-2xl font-bold mb-6">Product Management</h2>

            {session && (
                <form onSubmit={handleAddProduct} className="bg-white shadow-md rounded px-8 py-6 mb-4 w-full max-w-md">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Product Price"
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200 w-full"
                    >
                        Add Product
                    </button>
                </form>
            )}

            {loading ? (
                <p>Loading products...</p>
            ) : (
                <ul className="shadow-md rounded w-full max-w-md">
                    {products.map((product) => (
                        <li key={product._id} className="flex justify-between items-center border-b border-gray-200 p-4">
                            <span className="text-lg">{product.name} - ${product.price}</span>
                            <div>
                                <button
                                    onClick={() => openEditModal(product)}
                                    className="text-blue-500 hover:underline mx-2"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDeleteProduct(product._id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}

            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleUpdateProduct} product={editProduct} />
            )}
        </div>
    );
};

export default Products;
