import { useEffect, useState } from "react";
import FileInput from "./FileInput";
import Test from "./Test";

const tabs = [
  {
    header: "home",
    comp: <h2>Home</h2>,
    id: 1,
  },
  {
    header: "about",
    comp: <h2>About</h2>,
    id: 2,
  },
  {
    header: "files",
    comp: <FileInput />,
    id: 3,
  },
  {
    header: "crud",
    comp: <Test />,
    id: 4,
  },
];

const Tabs = () => {
  const storedIndex = localStorage.getItem("index");
  const [index, setIndex] = useState(() =>
    storedIndex ? JSON.parse(localStorage.getItem("index")) : 1
  );

  useEffect(() => {
    localStorage.setItem("index", JSON.stringify(index));
  }, [index]);

  return (
    <div className="flex flex-col">
      <div className="flex gap-4 cursor-pointer mb-4">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`p-2 cursor-pointer relative capitalize ${
              index === tab.id ? "text-blue-500 border-b-2 border-blue-500" : ""
            }`}
            onClick={() => setIndex(tab.id)}
          >
            <h3>{tab.header}</h3>
          </div>
        ))}
      </div>
      <div className="p-4 border border-gray-200 rounded-md">
        {tabs.find((tab) => tab.id === index)?.comp}
      </div>
    </div>
  );
};

export default Tabs;
