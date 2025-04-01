import React, { useState } from 'react';
import { useTasks } from '../contexts/TaskContext';
import TaskItem from '../components/TaskItem';
import PomodoroTimer from '../components/PomodoroTimer';
import { PlusIcon } from '@radix-ui/react-icons';
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from '@radix-ui/react-dialog';

const HomePage = () => {
  const { tasks, addTask } = useTasks();
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Personal',
    priority: 'Medium',
    dueDate: ''
  });

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask(newTask);
      setNewTask({
        title: '',
        description: '',
        category: 'Personal',
        priority: 'Medium',
        dueDate: ''
      });
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">My Tasks</h1>
            <Dialog>
              <DialogTrigger asChild>
                <button className="btn btn-primary">
                  <PlusIcon className="w-4 h-4 mr-2" />
                  Add Task
                </button>
              </DialogTrigger>
              <DialogContent className="bg-base-100 p-6 rounded-lg shadow-xl max-w-md">
                <DialogTitle className="text-xl font-bold mb-4">Add New Task</DialogTitle>
                <form onSubmit={handleAddTask}>
                  <div className="space-y-4">
                    <div>
                      <label className="label">
                        <span className="label-text">Title</span>
                      </label>
                      <input
                        type="text"
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        className="input input-bordered w-full"
                        required
                      />
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Description</span>
                      </label>
                      <textarea
                        value={newTask.description}
                        onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                        className="textarea textarea-bordered w-full"
                        rows="3"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="label">
                          <span className="label-text">Priority</span>
                        </label>
                        <select
                          value={newTask.priority}
                          onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
                          className="select select-bordered w-full"
                        >
                          <option value="High">High</option>
                          <option value="Medium">Medium</option>
                          <option value="Low">Low</option>
                        </select>
                      </div>
                      <div>
                        <label className="label">
                          <span className="label-text">Category</span>
                        </label>
                        <select
                          value={newTask.category}
                          onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                          className="select select-bordered w-full"
                        >
                          <option value="Work">Work</option>
                          <option value="Personal">Personal</option>
                          <option value="Study">Study</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="label">
                        <span className="label-text">Due Date</span>
                      </label>
                      <input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                        className="input input-bordered w-full"
                      />
                    </div>
                    <div className="flex justify-end gap-2 pt-4">
                      <DialogTrigger asChild>
                        <button type="button" className="btn btn-ghost">
                          Cancel
                        </button>
                      </DialogTrigger>
                      <button type="submit" className="btn btn-primary">
                        Add Task
                      </button>
                    </div>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {tasks.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-lg">No tasks yet. Add one to get started!</p>
              </div>
            ) : (
              tasks.map(task => (
                <TaskItem key={task.id} task={task} />
              ))
            )}
          </div>
        </div>
        <div>
          <PomodoroTimer />
        </div>
      </div>
    </div>
  );
};

export default HomePage;