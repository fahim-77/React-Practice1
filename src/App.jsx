import React, { useState, Suspense } from "react";
import { links } from "./libs/constants";
import "./App.css";

function App() {
  const [ActiveComponent, setActiveComponent] = useState(null);

  const loadComponent = (componentPath) => {
    return React.lazy(() => import(`${componentPath}`));
  };
  const clickHandler = (componentPath) => {
    setActiveComponent(loadComponent(componentPath));
  };
  console.log(ActiveComponent);
  return (
    <>
      <div className="flex flex-col gap-16 items-center">
        <nav className="flex gap-8 bg-pink-700 w-screen h-[100px] items-center px-6">
          {links.map((item) => (
            <button
              className="text-2xl text-white bg-transparent border-none"
              key={item.id}
              onClick={() => clickHandler(item.link)}
            >
              {item.title}
            </button>
          ))}
        </nav>

        <main className="border-8 border-dashed border-yellow-500 bg-black text-pink-700  w-1/2 h-[200px] flex justify-center items-center text-4xl font-bold">
          {ActiveComponent ? (
            <Suspense fallback={<div>Loading...</div>}>
              <ActiveComponent />
            </Suspense>
          ) : (
            <div>Select a menu item</div>
          )}
        </main>
      </div>
    </>
  );
}

export default App;
