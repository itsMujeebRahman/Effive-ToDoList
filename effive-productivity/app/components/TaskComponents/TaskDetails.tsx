import axios from "axios";
import { Edit, Loader2, X } from "lucide-react";
import React, { SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";
import SubTasks from "./SubTasks";
import SingleSubTask from "./SingleSubTask";

interface subTask {
  subTaskName: string;
  subTaskDone: boolean;
}

interface task {
  _id: string;
  taskName: string;
  taskDone: Boolean;
  taskComment: string;
  createdAt: string;
  finishedAt: string;
  subTasks: subTask[];
}

interface props {
  setTaskDetails: React.Dispatch<React.SetStateAction<boolean>>;
  currentTask: string;
}

export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const TaskDetails = ({ setTaskDetails, currentTask }: props) => {
  const [editTask, setEditTask] = useState<boolean>(false);
  const [editName, setEditName] = useState<string>();
  const [editComment, setEditComment] = useState<string>();
  const [subTaskValue, setSubTaskValue] = useState<string>("");
  const [subTaskList, setSubTaskList] = useState<subTask[]>();

  const {
    data: task,
    mutate,
    isLoading,
  } = useSWR<task>(`http://localhost:3001/get/${currentTask}`, fetcher);

  const handleTaskEdit = async () => {
    await axios.put(`http://localhost:3001/add/${currentTask}`, {
      taskName: editName,
      taskComment: editComment,
    });
    toast.success("Task Updated Succssfully");
    setTaskDetails(false);
    setEditComment(""), setEditName("");
    mutate();
  };

  const handleAddSubTasks = async () => {
    const newSubTask: subTask = {
      subTaskName: subTaskValue,
      subTaskDone: false,
    };

    if (newSubTask.subTaskName.trim() === "") {
      toast.error("please add a Task");
      return;
    }
    await axios.post(`http://localhost:3001/add/${currentTask}`, {
      newSubTask,
    });
    mutate();
    setSubTaskValue("");
  };

  const handleUpdateSubTask = async (id: string) => {
    await axios.post(`http://localhost:3001/add/${currentTask}/${id}`);
    mutate();
  };

  const handleDeleteSubTask = async (id: string) => {
    await axios.delete(`http://localhost:3001/delete/${currentTask}/${id}`);
    mutate();
    toast.error("SubTask Deleted Successfully");
  };

  const handleEditSubTask = async (id: string, value: string) => {
    const newSubTask = value;

    await axios.put(`http://localhost:3001/update/${currentTask}/${id}`, {
      newSubTask,
    });
    mutate();
  };

  useEffect(() => {
    setEditName(task?.taskName);
    setEditComment(task?.taskComment);
    setSubTaskList(task?.subTasks);
  }, [task]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2 size={30} />
      </div>
    );
  }

  const finishedSubTaskCount = subTaskList?.filter(
    (sub) => sub.subTaskDone
  ).length;

  return (
    <div className=" fixed w-screen h-screen bg-black/5 top-0 left-0 flex justify-center items-center z-50 ">
      <div className="flex gap-2">
        <div className="shadow-2xl h-[80vh] w-fit p-5 flex flex-col gap-2 rounded bg-white">
          <div className="w-full flex items-center justify-between  ">
            <h1 className="font-bold text-xl">Enter Task Details</h1>
            <div className=" flex items-center gap-2">
              <button
                className="flex items-center gap-2  rounded p-1 px-2 text-white bg-gray-600 hover:bg-gray-700"
                onClick={() => setEditTask(!editTask)}
              >
                Edit
                <Edit size={18} />
              </button>
              <X
                onClick={() => setTaskDetails(false)}
                size={28}
                className="text-gray-400 hover:text-gray-600"
              />
            </div>
          </div>
          <div className=" flex items-center gap-2 justify-between">
            {!editTask ? (
              <input
                value={task?.taskName}
                className="p-2 border border-gray-300 w-full focus:outline-none text-gray-300 font-bold text-xl rounded"
                readOnly
              />
            ) : (
              <input
                className="p-2 w-full border border-gray-600 font-bold text-xl rounded"
                onChange={(e) => setEditName(e.target.value)}
              />
            )}
          </div>

          <SubTasks
            editTask={editTask}
            subTaskList={subTaskList}
            setSubTaskValue={setSubTaskValue}
            handleAddSubTasks={handleAddSubTasks}
            handleUpdateSubTask={handleUpdateSubTask}
            handleDeleteSubTask={handleDeleteSubTask}
            handleEditSubTask={handleEditSubTask}
            subTaskValue={subTaskValue}
          />

          <div>
            {!editTask ? (
              <textarea
                className="w-xl h-[10vh] border border-gray-300 p-2 focus:outline-none rounded resize-none"
                onChange={(e) => setEditComment(e.target.value)}
                value={task?.taskComment ?? ""}
                placeholder="Add a Comment"
                readOnly
              />
            ) : (
              <textarea
                className="w-xl h-[10vh] border border-gray-600 p-2 rounded resize-none"
                onChange={(e) => setEditComment(e.target.value)}
                placeholder="Add a Comment"
              />
            )}
          </div>
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm">Created : {task?.createdAt}</p>
              <p className="text-sm">Completed : {task?.finishedAt}</p>
              <p className="text-sm">Last Updated : {task?.finishedAt}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setTaskDetails(false)}
                className="px-3 py-2 hover:bg-black/20 rounded border border-gray-400"
              >
                cancel
              </button>
              {editTask ? (
                <button
                  onClick={() => {
                    handleTaskEdit();
                  }}
                  className="px-3 py-2 hover:bg-black/20 rounded border border-gray-400"
                >
                  Save
                </button>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
        {subTaskList?.length !== 0 ? (
          <div className="p-5 w-xl h-[80vh] bg-white rounded">
            <p className="font-bold text-xl pb-3">Finished SubTasks</p>
            <div className="pl-3 h-full pb-14">
              <div className="flex flex-col gap-2 overflow-y-scroll pl-3 border-l-4 rounded border-l-gray-700  h-full">
                {finishedSubTaskCount !== 0 ? (
                  <>
                    {subTaskList?.map((sub, index) =>
                      sub.subTaskDone ? (
                        <SingleSubTask
                          key={index}
                          sub={sub}
                          editTask={editTask}
                          handleUpdateSubTask={handleUpdateSubTask}
                          handleDeleteSubTask={handleDeleteSubTask}
                        />
                      ) : null
                    )}
                  </>
                ) : (
                  <div className="w-full h-full border border-gray-400 rounded flex items-center justify-center">
                    <h1 className="font-bold text-xl">
                      {" "}
                      No Finished Sub Tasks
                    </h1>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default TaskDetails;
