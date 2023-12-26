import Task from "./task";

export default function Column({
  status,
}: {
  status: "planned" | "ongoing" | "done";
}) {
  return (
    <div className="min-h-[20rem] p-2 rounded-md bg-cyan-600 max-w-[32vw] text-white space-y-2">
      <p className="px-2 border-b">{status}</p>
      <Task title="dummy title" />
    </div>
  );
}
