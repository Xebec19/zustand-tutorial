import { createWithEqualityFn } from "zustand/traditional";
import { createJSONStorage, devtools, persist } from "zustand/middleware";

export type Task = {
  title: string;
  state: "planned" | "ongoing" | "done";
};

type State = {
  tasks: Task[];
  draggedTask: Task | null;
  moveTask: (task: Task, toState: "ongoing" | "planned" | "done") => void;
  addTask: (task: Task) => void;
  removeTask: (task: Task) => void;
  setDraggedTask: (task: Task) => void;
};

const useBoundedStore = createWithEqualityFn<State>()(
  devtools(
    persist(
      (set) => ({
        tasks: [{ title: "TestTask", state: "ongoing" }],
        draggedTask: null,
        setDraggedTask: (task: Task) => set({ draggedTask: task }, false),
        moveTask: (task: Task, toState: "ongoing" | "planned" | "done") => {
          set(
            (state) => ({
              tasks: state.tasks.map((t) =>
                t.title === task.title && t.state === task.state
                  ? { title: t.title, state: toState }
                  : t
              ),
            }),
            false // false tells zustand to replace the whole state with this, instead merge this property with remaining state
          );
        },
        addTask: (task: Task) =>
          set((state) => ({ tasks: [...state.tasks, task] })),
        removeTask: (task: Task) =>
          set(
            (state) => ({
              tasks: state.tasks.filter(
                (t) => t.title !== task.title || t.state !== task.state
              ),
            }),
            false
          ),
      }),
      {
        name: "zustand-storage",
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);

export default useBoundedStore;
