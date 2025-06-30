"use client";
import SingleSubTask from "./SingleSubTask";

interface subTask {
  subTaskName: string;
  subTaskDone: boolean;
  _id: string;
}

interface props {
  editTask: boolean;
  setSubTaskDone: React.Dispatch<React.SetStateAction<boolean>>;
  setSubTaskValue: React.Dispatch<React.SetStateAction<string>>;
  subTaskList: subTask[];
  handleUpdateSubTask: (id: string) => void;
  handleAddSubTasks: any;
  subTaskValue: string;
  handleDeleteSubTask: (id: string) => void;
  handleEditSubTask: any;
}

const SubTasks = ({
  setSubTaskValue,
  editTask,
  subTaskList,
  handleAddSubTasks,
  handleUpdateSubTask,
  subTaskValue,
  handleDeleteSubTask,
  handleEditSubTask,
}: props) => {
  return (
    <div className="flex flex-col items-start gap-3 max-h-[40vh] h-full border-l-4 rounded border-l-gray-700 ml-3 ">
      <div className="overflow-y-scroll w-full h-full pt-2 pl-3 ">
        {subTaskList?.length !== 0 ? (
          <div className="flex flex-col gap-2 w-full pr-2">
            {subTaskList?.map((sub, index) =>
              !sub.subTaskDone ? (
                <SingleSubTask
                  key={index}
                  sub={sub}
                  editTask={editTask}
                  handleUpdateSubTask={handleUpdateSubTask}
                  handleDeleteSubTask={handleDeleteSubTask}
                  handleEditSubTask={handleEditSubTask}
                />
              ) : null
            )}
          </div>
        ) : (
          <div className="w-full h-full border border-gray-400 rounded flex items-center justify-center">
            <h1 className="font-bold text-xl">Add your SubTasks Below</h1>
          </div>
        )}
      </div>

      <div className="flex gap-2 pl-3 w-full pb-3">
        <input
          className="w-full border border-gray-600 p-2 rounded"
          onChange={(e) => setSubTaskValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddSubTasks();
            }
          }}
          placeholder="+ Add a SubTask"
          disabled={!editTask}
          value={subTaskValue}
        />
        <button
          className="rounded p-1 px-4 text-white bg-gray-600 hover:bg-gray-700"
          onClick={handleAddSubTasks}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default SubTasks;
