"use client";

const Modal = ({ isOpen, onClose, onSubmit, product }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
                <h2 className="text-lg font-bold mb-4">Edit Product</h2>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        defaultValue={product.name}
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Product Price"
                        defaultValue={product.price}
                        required
                        className="border border-gray-300 p-2 w-full mb-4 rounded"
                    />
                    <div className="flex justify-between">
                        <button type="button" onClick={onClose} className="text-gray-500 hover:underline">
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
                        >
                            Update Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;
