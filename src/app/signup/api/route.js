import { connectDB } from "@/lib/connectDB";

export const POST = async (request) => {
    // get the data in json 
    const newUser = await request.json();
    // make db connect
    try {
        const db = await connectDB()
        const userCollection = db.collection('users')
        const exist = await userCollection.findOne({ email: newUser.email })
        if (exist) {
            return Response.json({ message: "User Exists" }, { status: 304 })
        }
        await userCollection.insertOne(newUser)
        return new Response(JSON.stringify({ message: "User Created" }), { status: 200 });
    } catch (error) {
        return new Response(JSON.stringify({ message: "Something went wrong" }), { status: 500 });

    }
}