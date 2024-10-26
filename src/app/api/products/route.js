import { connectDB } from "@/lib/connectDB";

export const GET = async () => {
    const db = await connectDB();
    const products = await db.collection('products').find().toArray();
    return new Response(JSON.stringify(products), { status: 200 });
};

export const POST = async (request) => {
    const newProduct = await request.json();
    const db = await connectDB();
    await db.collection('products').insertOne(newProduct);
    return new Response(JSON.stringify({ message: 'Product created' }), { status: 201 });
};

