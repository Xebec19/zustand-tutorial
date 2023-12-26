export default function Column({
  status,
}: {
  status: "planned" | "ongoing" | "done";
}) {
  return (
    <div className="min-h-[20rem] p-2 rounded-md bg-cyan-600 max-w-[32vw] text-white">
      {status}
    </div>
  );
}
