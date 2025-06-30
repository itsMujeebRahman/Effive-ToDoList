"use client";
import { CheckCircle, Circle, Trash } from "lucide-react";

interface subTask {
  subTaskName: string;
  subTaskDone: boolean;
  _id: string;
}

interface props {
  editTask: boolean;
  sub: subTask;
  handleUpdateSubTask: (id: string) => void;
  handleDeleteSubTask: (id: string) => void;
  handleEditSubTask: any;
}

const SingleSubTask = ({
  editTask,
  sub,
  handleUpdateSubTask,
  handleDeleteSubTask,
  handleEditSubTask,
}: props) => {
  return (
    <div>
      <div className="border flex items-center justify-between p-1.5 px-2 gap-2 border-gray-300 rounded">
        <div className="flex gap-2 items-center w-full">
          {sub.subTaskDone ? (
            <div>
              <CheckCircle
                className="shrink-0"
                size={20}
                onClick={() => handleUpdateSubTask(sub._id)}
              />
            </div>
          ) : (
            <div>
              <Circle
                className="shrink-0"
                size={20}
                onClick={() => handleUpdateSubTask(sub._id)}
              />
            </div>
          )}
          {sub.subTaskDone ? (
            <input
              className="text-m w-full focus:outline-none border-none line-through break-all"
              defaultValue={sub.subTaskName}
              disabled={!editTask}
            />
          ) : (
            <input
              className="text-m w-full focus:outline-none border-non brak-all"
              defaultValue={sub.subTaskName}
              disabled={!editTask}
              onChange={(e) => handleEditSubTask(sub._id, e.target.value)}
            />
          )}
        </div>
        <Trash
          className="shrink-0"
          size={20}
          onClick={() => handleDeleteSubTask(sub._id)}
        />
      </div>
    </div>
  );
};

export default SingleSubTask;
