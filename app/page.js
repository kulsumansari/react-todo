import { getTodos } from '@/utils';
import TodoList from '@/components/TodoList';

const Todo = async () => {
  const todos = await getTodos(); // fetches todos from the server
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-4">Todo List</h1>

        <TodoList todos={todos} />
      </div>
    </div>
  );
}

export default Todo;