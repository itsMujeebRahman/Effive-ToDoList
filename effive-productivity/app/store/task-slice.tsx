
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface singleTask {
  taskName: string;
  taskDone: boolean;
  createdAt: string;
  finishedAt: string[];
}

interface taskState {
  tasks: singleTask[];
}

const initialState: taskState = {
  tasks: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (
      state,
      action: PayloadAction<{ taskName: string; taskDone: boolean }>
    ) => {
      const newTask: singleTask = {
        taskName: action.payload.taskName,
        taskDone: action.payload.taskDone,
        createdAt: new Date().toISOString(),
        finishedAt: [],
      };
      state.tasks.push(newTask);
    },
  },
});
export const { addTask } = taskSlice.actions;
export default taskSlice.reducer;
