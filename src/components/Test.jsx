import { useQuery } from "@tanstack/react-query";
import { Instance } from "../utils/Instance";
import Form from "./Form";
import { useState } from "react";

let fetcher = async () => {
  await new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, 500);
  });
  let res = await Instance.get("users");
  return res;
};

const Test = () => {
  let [user, setUser] = useState({});
  let {
    data: { data: users = [] } = {},
    isLoading,
    error = {},
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetcher,
  });

  return (
    <>
      <Form user={user} setUser={setUser} />
      {isLoading ? (
        <div className="fixed inset-0 flex justify-center items-center z-50">
          <div className="flex justify-center items-center h-full">
            <div className="w-16 h-16 border-4 border-red-700 border-t-transparent border-solid rounded-full animate-spin"></div>
          </div>
        </div>
      ) : users.length ? (
        <div className="flex flex-wrap gap-4 items-center">
          {users?.map((user) => (
            <div
              key={user.name}
              className="bg-blue-100/50 rounded-lg p-2 flex flex-col flex-grow min-w-[200px] max-w-f"
            >
              <h2>name: {user.name}</h2>
              <h3>age: {user.age}</h3>
              <div className="flex gap-3 flex-wrap ">
                <button
                  onClick={() => setUser({ ...user, action: "delete" })}
                  className="bg-red-700 outline-none border-none text-white rounded-md capitalize"
                >
                  remove
                </button>
                <button
                  onClick={() => setUser({ ...user, action: "edit" })}
                  className="bg-blue-500 outline-none border-none text-white rounded-md capitalize"
                >
                  edit
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {(error && (
            <h2 className="text-xl text-red-700 font-medium">
              {error?.message}
            </h2>
          )) || <h2 className="text-xl font-medium">List is empty!</h2>}
        </>
      )}
    </>
  );
};

export default Test;
