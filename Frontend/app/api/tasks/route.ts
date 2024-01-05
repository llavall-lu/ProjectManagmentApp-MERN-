
import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";


export async function POST(req: Request){
    try{

        const { userId } =auth();

    if(!userId){
        return NextResponse.json({error: "Not Authorized"}, {status: 401, statusText: "Not Authorized"})
    }

    const { title, description, date, completed, important } = await req.json();

    if(!title || !description || !date) {
        return NextResponse.json({error: "Missing Required Fields"}, {status: 400, statusText: "Missing Required Fields"})
    }

    if(title.length > 50) {
        return NextResponse.json({error: "Title Too Long"}, {status: 400, statusText: "Title Too Long"})
    }

    if(title.length < 3) {
        return NextResponse.json({error: "Title Too Short"}, {status: 400, statusText: "Title Too Short"})
    }

    const tasks = await prisma.tasks.create({
        data: { title, description, date, isCompleted:completed, isImportant:important, userId },
    });

    console.log("Created Task: ", tasks);


    return NextResponse.json(tasks, {status: 201, statusText: "Created"})

    } catch (error) {
        console.log("Error Creating Task: ", error);
        return NextResponse.json({error: "Error Creating Task"}, {status: 500, statusText: "Server Error"})
    }
}

export async function GET(req: Request){
    try{

        const { userId } =auth();

        if (!userId) {
            return NextResponse.json({error: "Not Authorized"}, {status: 401, statusText: "Not Authorized"})
        }

        const tasks = await prisma.tasks.findMany({
            where: { userId, },
        })
        
        return NextResponse.json(tasks); 
        
    } catch (error) {
        console.log("Error Getting Task: ", error);
        return NextResponse.json({error: "Error Getting Task"}, {status: 500, statusText: "Server Error"})
    }
}

export async function PUT(req: Request){
    try{
    const { userId } =auth();
    const { isCompleted, id } = await req.json();
    if(!userId){
        return NextResponse.json({error: "Not Authorized"}, {status: 401, statusText: "Not Authorized"})
    }

    const tasks = await prisma.tasks.update({
        where: {
            id,
        },
        data: {
            isCompleted,
        },
        });
    return NextResponse.json(tasks, {status: 200, statusText: "Updated"})
    } catch (error) {
        console.log("Error Updating Task: ", error);
        return NextResponse.json({error: "Error Updating Task"}, {status: 500, statusText: "Server Error"})
    }
}
