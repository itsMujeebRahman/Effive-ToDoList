"use client";
import { useState } from "react";

import SingleTask from "./SingleTask";
import axios from "axios";
import useSWR from "swr";
import toast from "react-hot-toast";
import Create from "./Create";

interface task {
  taskName: string;
  _id: string;
  taskDone: boolean;
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const Tasks = () => {
  const [task, setTask] = useState<string>("");

  const { data: tasks, mutate } = useSWR<task[]>(
    "http://localhost:3001/get",
    fetcher
  );

  const handleAddTask = async () => {
    if (!task.trim()) {
      toast.error("Taks cannot be empty");
      return;
    }
    await axios.post("http://localhost:3001/add", {
      taskName: task,
      taskDone: false,
    });
    setTask("");
    mutate();
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${_id}`);
      toast.success("Task Deleted Successfully");
      mutate();
    } catch {
      toast.error("Unable to Delete task");
    }
  };

  const handleUpdateTask = async (_id: string) => {
    await axios.put(`http://localhost:3001/update/${_id}`);
    mutate();
  };

  return (
    <div className="flex justify-between items-center h-screen flex-col gap-5 p-5 relative bg-gray-50">
      <div className=" w-full text-left ">
        <h1 className="text-2xl font-bold">Tasks Todo...</h1>
      </div>

      {tasks?.length !== 0 ? (
        <div className="w-full overflow-y-scroll h-full ">
          <div className="flex flex-col gap-1">
            {tasks?.map(
              (task) =>
                !task.taskDone && (
                  <SingleTask
                    task={task}
                    key={task._id}
                    handleDeleteTask={handleDeleteTask}
                    handleUpdateTask={handleUpdateTask}
                    className="bg-white"
                    
                  />
                )
            )}
          </div>
          <div className="h-[10vh] w-full"></div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className=" font-extrabold text-3xl">
            Add a Task and go Finish it
          </h1>
        </div>
      )}

      <Create
        task={task}
        setTask={setTask}
        handleAddTask={handleAddTask}
        className="bottom-0 mb-4 px-5 w-full absolute"
      />
    </div>
  );
};

export default Tasks;
