import { Link, Outlet } from "react-router";

function Layout() {
    return (
 <div id="main" className="flex">
      {/** SIDEBAR */}
      <div id="sidebar" className="p-4 bg-blue-300 fixed h-full w-[320px]">
        <div className="navigation-bar flex flex-col gap-4">
          <Link to="/esempi">Esempi</Link>
          <Link to="/">Home</Link>
        </div>
      </div>

      {/** CONTENUTO PRINCIPALE */}
      <div id="content" className="w-[calc(100%-320px)] ml-auto p-[24px]">
        <Outlet />
      </div>
    </div>
    )
}

export default Layout;