"use server";

import { revalidateTag } from "next/cache";
export const getTodos = async() => {
    const response = await fetch(`${process.env.API_URL}/tasks`, {
        cache: "no-cache",
        next: {
            tags: ["todos"],
        },
    })
    const tasks = await response.json()
    return [...tasks.data]
};

export const createNewTask = async(task) => {
    if (!task) return
    const response = await fetch( `${process.env.API_URL}/tasks`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            content: task,
            isCompleted: false,
            createdAt: new Date(),
        }),
    })

    revalidateTag('todos');

    const newTask = await response.json()
    return newTask.data
};

export const deleteTask = async(id) => {
    const response = await fetch(`${process.env.API_URL}/tasks/${id}`, {
        method: 'DELETE',
    })
    console.log("🚀 ~ deleteTask ~ response:", response)
    revalidateTag('todos');
};