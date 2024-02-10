import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <main className="App min-h-screen bg-slate-300 flex flex-col items-center px-24">
      <Header />
      <div className="mt-8 w-full md:w-10/12 lg:w-2/3 xl:w-1/2 2xl:w-4/12">
        <Outlet />
      </div>
    </main>
  );
};

export default Layout;
