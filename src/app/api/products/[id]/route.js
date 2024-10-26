
import { connectDB } from "@/lib/connectDB";
import { ObjectId } from "mongodb";

export async function PUT(request, { params }) {
    const { id } = await params;

    try {
        const body = await request.json();
        const { name, price } = body;

        const db = await connectDB();
        // Update the product in the database
        const result = await db.collection('products').updateOne(
            { _id: new ObjectId(id) },
            { $set: { name, price } }
        );

        return new Response(JSON.stringify({ message: 'Product updated successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error updating product:', error);
        return new Response(JSON.stringify({ message: 'Server error while updating product' }), { status: 500 });
    }
}


export async function DELETE(request, { params }) {
    const { id } = params;
    try {
        const db = await connectDB();
        const result = await db.collection('products').deleteOne({ _id: new ObjectId(id) });

        return new Response(JSON.stringify({ message: 'Product deleted successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error deleting product:', error);  // Log the error for debugging
        return new Response(JSON.stringify({ message: 'Server error while deleting product' }), { status: 500 });
    }
}
