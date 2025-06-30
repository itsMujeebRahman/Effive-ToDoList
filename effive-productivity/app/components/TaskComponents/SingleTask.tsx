import { CheckCircle, Circle, Trash } from "lucide-react";
import React, { useState } from "react";
import TaskDetails from "./TaskDetails";

interface task {
  _id: string;
  taskName: string;
  taskDone: boolean;
}

interface Props {
  handleDeleteTask: any;
  handleUpdateTask: any;
  task: task;
  className: string;
}

const SingleTask = ({
  task,
  handleDeleteTask,
  handleUpdateTask,
  className,
}: Props) => {
  const [tasksDetails, setTasksDetails] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<string>("");

  const fetchTaskDetails = (_id: string) => {
    setTasksDetails(true);
    setCurrentTask(_id);
  };

  return (
    <>
      <div
        key={task._id}
        className={`flex justify-between p-2 shadow border border-gray-300 items-center gap-2 mr-3 rounded ${className}`}
      >
        <div className="flex gap-2 items-center w-full">
          {task.taskDone ? (
            <CheckCircle
              onClick={() => handleUpdateTask(task._id)}
              className="shrink-0"
              size={20}
            />
          ) : (
            <Circle
              onClick={() => handleUpdateTask(task._id)}
              className="shrink-0"
              size={20}
            />
          )}
          <div onClick={() => fetchTaskDetails(task._id)} className="w-full ">
            {task.taskDone ? (
              <p className="line-through break-all w-full">{task.taskName}</p>
            ) : (
              <p className="break-all w-full">{task.taskName}</p>
            )}
          </div>
        </div>
        <Trash
          onClick={() => handleDeleteTask(task._id)}
          className="shrink-0"
          size={20}
        />
      </div>
      <div>
        {tasksDetails ? (
          <TaskDetails
            currentTask={currentTask}
            setTaskDetails={setTasksDetails}
          />
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default SingleTask;
