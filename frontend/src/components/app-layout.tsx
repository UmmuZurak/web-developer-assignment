import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="min-h-screen min-w-screen h-full w-full">
      <div className="mx-auto max-w-4xl w-full h-full my-[10vh]">
        <Outlet />
      </div>
    </div>
  );
}
