import { PlusCircle } from "lucide-react";

interface Props {
  setTask: React.Dispatch<React.SetStateAction<string>>;
  [key: string]: any;
  
}

const Create = ({ setTask, task, handleAddTask, ...props }: Props) => {
  return (
    <div {...props}>
      <div className="w-full flex justify-center items-center gap-2 ">
        <input
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
          type="text"
          className="p-4 shadow w-full bg-white rounded border border-gray-400"
          value={task}
        />
        <PlusCircle
          onClick={handleAddTask}
          className="bg-black text-white rounded-4xl h-14 w-16"
        />
      </div>
    </div>
  );
};

export default Create;
