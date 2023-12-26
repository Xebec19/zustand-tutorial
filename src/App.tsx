import Column from "./components/column";

export default function App() {
  return (
    <div className="bg-cyan-200 p-2 flex justify-center items-start gap-4 h-[100vh]">
      <div className="grid grid-cols-3 gap-4 container">
        <Column status="planned" />
        <Column status="ongoing" />
        <Column status="done" />
      </div>
    </div>
  );
}
