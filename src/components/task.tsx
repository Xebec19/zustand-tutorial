import useBoundedStore, { Task } from "../store";

export default function Task({ title }: { title: string }) {
  const taskBody = useBoundedStore((state) =>
    state.tasks.find((task) => task.title === title)
  )!;

  const setDragTask = useBoundedStore((state) => state.setDraggedTask);

  const removeTask = useBoundedStore((state) => state.removeTask);

  function handleDragStart(task: Task) {
    setDragTask(task);
  }

  function handleRemove(task: Task) {
    if (!confirm("Are you sure ?")) {
      return;
    }
    removeTask(task);
  }

  return (
    <div
      className="relative h-[8rem] rounded-md bg-cyan-200 p-2 text-black flex flex-col"
      draggable
      onDragStart={() => handleDragStart(taskBody)}
    >
      <div className="flex w-full justify-between items-center">
        <span>{title}</span>
        <span
          className="rounded-md p-2 cursor-pointer"
          onClick={() => handleRemove(taskBody)}
        >
          x
        </span>
      </div>
      <span className="absolute bottom-2 right-2 bg-cyan-400 rounded-md p-2">
        {taskBody?.state}
      </span>
    </div>
  );
}
