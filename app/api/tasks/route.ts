import prisma from "@/app/utils/connect";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      // This is the line that checks if there is a userId
      return NextResponse.json(
        // This is the line that returns an error if there is no userId
        { error: "Not Authorized" },
        { status: 401, statusText: "Not Authorized" }
      );
    }

    const { title, description, date, completed, important } = await req.json(); // This is the line that gets the title, description, date, completed, and important from the request

    if (!title || !description || !date) {
      // This is the line that checks if the title, description, or date is missing
      return NextResponse.json(
        { error: "Missing Required Fields" },
        { status: 400, statusText: "Missing Required Fields" }
      );
    }

    if (title.length > 32) {
      // This is the line that checks if the title is too long
      return NextResponse.json(
        { error: "Title Too Long" },
        { status: 400, statusText: "Title Too Long" }
      );
    }

    if (title.length < 3) {
      // This is the line that checks if the title is too short
      return NextResponse.json(
        { error: "Title Too Short" },
        { status: 400, statusText: "Title Too Short" }
      );
    }

    const tasks = await prisma.tasks.create({
      // This is the line that creates the task
      data: {
        title,
        description,
        date,
        isCompleted: completed,
        isImportant: important,
        userId,
      },
    });

    console.log("Created Task: ", tasks);

    return NextResponse.json(tasks, { status: 201, statusText: "Created" }); // This is the return once the task is created
  } catch (error) {
    console.log("Error Creating Task: ", error);
    return NextResponse.json(
      // This is the return if there is an error
      { error: "Error Creating Task" },
      { status: 500, statusText: "Server Error" }
    );
  }
}

export async function GET(req: Request) {
  // This is the line that gets the tasks
  try {
    const { userId } = auth(); // This is the line that gets the userId

    if (!userId) {
      // This is the line that checks if there is a userId
      return NextResponse.json(
        // This is the line that returns an error if there is no userId
        { error: "Not Authorized" },
        { status: 401, statusText: "Not Authorized" }
      );
    }

    const tasks = await prisma.tasks.findMany({
      // This is the line that gets the tasks
      where: { userId },
    });

    return NextResponse.json(tasks); // This is the return once the tasks are gotten
  } catch (error) {
    console.log("Error Getting Task: ", error);
    return NextResponse.json(
      // This is the return if there is an error
      { error: "Error Getting Task" },
      { status: 500, statusText: "Server Error" }
    );
  }
}

export async function PUT(req: Request) {
  // This is the line that updates the task
  try {
    const { userId } = auth(); // This is the line that gets the userId
    const { isCompleted, id } = await req.json(); // This is the line that gets the isCompleted and id from the request
    if (!userId) {
      // This is the line that checks if there is a userId
      return NextResponse.json(
        // This is the line that returns an error if there is no userId
        { error: "Not Authorized" },
        { status: 401, statusText: "Not Authorized" }
      );
    }

    const tasks = await prisma.tasks.update({
      // This is the line that updates the task
      where: {
        id, // This is the id of the task to update
      },
      data: {
        isCompleted,
      },
    });
    return NextResponse.json(tasks, { status: 200, statusText: "Updated" }); // This is the return once the task is updated
  } catch (error) {
    console.log("Error Updating Task: ", error);
    return NextResponse.json(
      // This is the return if there is an error
      { error: "Error Updating Task" },
      { status: 500, statusText: "Server Error" }
    );
  }
}
