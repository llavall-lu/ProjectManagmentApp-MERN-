import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function DELETE( 
  req: Request,
  { params }: { params: { id: string } } 
) {
  try {
    const { userId } = auth(); 
    const { id } = params;  

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 }); // This text will appear if there is no userId
    }

    const task = await prisma.tasks.delete({  // This is the line that deletes the task
      where: { 
        id, // This is the id of the task that we want to delete
      },
    });

    return NextResponse.json(task); 
  } catch (error) {
    console.log("ERROR DELETING TASK: ", error); // This text will appear in the terminal in the event of an error
    return NextResponse.json({ error: "Error deleting task", status: 500 }); 
  }
}
