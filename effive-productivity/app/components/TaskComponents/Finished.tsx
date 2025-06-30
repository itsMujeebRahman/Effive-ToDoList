"use client";
import useSWR from "swr";
import SingleTask from "./SingleTask";
import { fetcher } from "./Tasks";
import axios from "axios";
import toast from "react-hot-toast";

interface task {
  taskName: string;
  _id: string;
  taskDone: boolean;
}

const Finished = () => {
  const { data: tasks, mutate } = useSWR<task[]>(
    "http://localhost:3001/get",
    fetcher
  );

  const handleUpdateTask = async (_id: string) => {
    try {
      await axios.put(`http://localhost:3001/update/${_id}`);
      toast.success("Task Rstored Successfully");
      mutate();
    } catch {
      toast.error("Error While Restoring Task");
    }
  };

  const handleDeleteTask = async (_id: string) => {
    try {
      await axios.delete(`http://localhost:3001/delete/${_id}`);
      toast.success("task delted successfully");
      mutate();
    } catch {
      toast.error("unable to delete the task");
    }
  };

  return (
    <div className="flex justify-start items-center h-screen border-l border-gray-300 flex-col gap-5 p-5 rounded">
      <div className="w-full text-left">
        <h1 className="font-bold text-2xl ">Finished Tasks...</h1>
      </div>
      {tasks?.length !== 0 ? (
        <div className=" overflow-y-scroll w-full h-full ">
          <div className="flex flex-col gap-1">
            {tasks?.map(
              (task) =>
                task.taskDone && (
                  <SingleTask
                    task={task}
                    key={task._id}
                    handleDeleteTask={handleDeleteTask}
                    handleUpdateTask={handleUpdateTask}
                    className="bg-gray-50"
                    
                  />
                )
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full">
          <h1 className=" font-extrabold text-3xl">Create a Task to Finish</h1>
        </div>
      )}
    </div>
  );
};

export default Finished;
