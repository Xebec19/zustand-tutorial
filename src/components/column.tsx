import { shallow } from "zustand/shallow";
import useBoundedStore from "../store";
import Task from "./task";
import { useState } from "react";
import { createPortal } from "react-dom";

const CreateTask = ({
  status,
  setOpen,
}: {
  status: "planned" | "ongoing" | "done";
  setOpen: (val: boolean) => void;
}) => {
  const [text, setText] = useState<string>("");

  const addTask = useBoundedStore((store) => store.addTask);

  return (
    <div className="h-[100%] w-full absolute top-0 left-0 flex justify-center items-center">
      <div className="bg-gray-500 opacity-30 h-[100%] w-full absolute top-0 left-0 flex justify-center items-center"></div>
      <div className="rounded-md p-4 bg-white flex flex-col space-y-2 z-20">
        <p>Add a new task</p>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-gray-300 p-2 rounded-md"
        />
        <button
          onClick={() => {
            addTask({ title: text, state: status });
            setOpen(false);
            setText("");
          }}
          className="bg-cyan-600 rounded-md p-2"
        >
          Add
        </button>
        <button
          onClick={() => setOpen(false)}
          className="bg-cyan-600 rounded-md p-2"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            setText("");
            setOpen(false);
          }}
          className="bg-cyan-600 rounded-md p-2"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default function Column({
  status,
}: {
  status: "planned" | "ongoing" | "done";
}) {
  const [open, setOpen] = useState<boolean>(false);

  const tasks = useBoundedStore(
    (store) => store.tasks.filter((task) => task.state === status),
    shallow
  );

  const draggedTask = useBoundedStore((store) => store.draggedTask);

  const moveTask = useBoundedStore((store) => store.moveTask);

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    if (!draggedTask) {
      return;
    }
    moveTask(draggedTask!, status);
  }

  return (
    <>
      {open &&
        createPortal(
          <CreateTask
            status={status}
            setOpen={(val: boolean) => setOpen(val)}
          />,
          document.body
        )}
      <div
        className="min-h-[20rem] p-2 rounded-md bg-cyan-600 max-w-[32vw] text-white space-y-2"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        <div className="flex justify-between items-center border-b">
          <p className="px-2">{status}</p>
          <button onClick={() => setOpen(true)} className="cursor-pointer p-2">
            Add
          </button>
        </div>
        {tasks.map((task) => (
          <Task key={task.title} title={task.title} />
        ))}
      </div>
    </>
  );
}
