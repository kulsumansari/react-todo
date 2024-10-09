
'use client';

import { useRef } from 'react';
import { useOptimistic } from 'react';
import { createNewTask, deleteTask } from '@/utils';


const TodoList = ({ todos }) => {
    const formRef = useRef(null);
    const [optimisticTodoList, addNewTasks] = useOptimistic(
        todos,
        (state, newTodo) => {
          return [...state, newTodo];
        }
      );
     
      const action = async(data) => {
        const content = data.get('content');
        const newTodo = {
          content,
          isCompleted: false,
        };
        addNewTasks(newTodo);
        await createNewTask(content);
        formRef.current.reset()
      };

      const handleDeleteTask = async(e) => {
        const id = e.target.parentElement.getAttribute('id');
        await deleteTask(id);
      };
    
  return (
    <div>

        <form action={action} ref={formRef} className="flex items-center w-full h-8 px-2 my-4 mt-2 text-sm font-medium rounded">
            <input
                className="flex-grow h-8 ml-4 bg-transparent focus:outline-none font-medium"
                type="text"
                placeholder="add a new task"
                name="content"
            />

            <button class="flex px-2 mt-2 text-sm font-medium rounded">
                <svg class="w-5 h-5 text-gray-400 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
            </button>
        </form>

        <ul className="space-y-3">
        {optimisticTodoList.length > 0 ? (
        optimisticTodoList.map((todo, index) => (
            <li
            key={index}
            className="flex justify-between text-black items-center bg-gray-100 p-3 rounded-md shadow-sm"
            id={todo.taskId}
            >
            <span>{todo.content}</span>
            <button
                onClick={handleDeleteTask}
                className="text-red-500 hover:text-red-700"
            >
                Delete
            </button>
            </li>
        ))
        ) : (
            <p className="text-gray-500 text-center">No tasks yet.</p>
        )}

    </ul>

  </div>

  )
}

export default TodoList