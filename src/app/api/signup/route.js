import mongoose from "mongoose";
import User from "@/models/User";
import { connectDB } from "@/lib/mongodb";

// Connect to the database
connectDB();

// Dummy Tasks List
const dummyTasks = [
  "Buy groceries",
  "Walk the dog",
  "Read a book",
  "Write code",
  "Exercise",
  "Call a friend",
  "Clean the house",
  "Pay bills",
  "Plan a trip",
  "Cook dinner",
  "Attend meeting",
  "Watch a movie",
  "Meditate",
  "Learn a new skill",
  "Organize workspace",
  "Water the plants",
  "Check emails",
];

//function to generate random tasks from the task array we defined above
const generateTaskList = () => {
  const today = new Date();
  const yesterday = new Date();
  const dayBeforeYesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  dayBeforeYesterday.setDate(today.getDate() - 2);

  //Giving Dummy Tasks Random Dates and Completion Status
  const tasks = [];
  dummyTasks.forEach((taskTitle, index) => {
    let taskDate;
    let completed;
    const rand = Math.random();
    if (rand < 0.2) {
      taskDate = today;
      completed = Math.random() < 0.5;
    } else if (rand < 0.5) {
      taskDate = yesterday;
      completed = Math.random() < 0.5;
    } else {
      taskDate = dayBeforeYesterday;
      completed = Math.random() < 0.5;
    }

    tasks.push({
      id: new mongoose.Types.ObjectId().toString(),
      title: taskTitle,
      completed: completed,
      date: taskDate.toISOString().split("T")[0],
    });
  });

  return tasks; /* return an array of tasks */
};

export async function POST(request) {
  try {
    const { name } = await request.json();
    // Generate tasks for the new user
    const tasks = generateTaskList();

    // Add User to the Database
    const userId = `user_${Math.floor(100000 + Math.random() * 900000)}`;
    const newUser = new User({ userId, name, tasks });
    await newUser.save();

    return new Response(
      JSON.stringify({
        message: "User created successfully",
        userId: newUser.userId,
        name: newUser.name,
      }),
      { status: 201 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to parse request body" }),
      { status: 400 }
    );
  }
}
