/* eslint-disable react/prop-types */
import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { Instance } from "../utils/Instance";
import { queryClient } from "../main";

const fetcher_post = async ({ name, age, id, action }) => {
  if (action === "delete") {
    return await Instance.delete(`users/${id}`);
  } else if (action === "edit") {
    return await Instance.put(`users/${id}`, { name, age });
  } else {
    return await Instance.post("users", { name, age });
  }
};

const Form = ({ user, setUser }) => {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const formRef = useRef(null);
  const action = (user?.action === "edit" && user?.action) || "create";
  const mutation = useMutation({
    mutationFn: fetcher_post,
    onSuccess: () => {
      queryClient.invalidateQueries("users");
      setName("");
      setAge("");
      if (user?.action !== "delete") {
        setUser(null);
      }
    },
    onError: (error) => {
      console.error("Error:", error);
    },
  });

  useEffect(() => {
    if (user && user?.action !== "delete") {
      setName(user.name || "");
      setAge(user.age || "");
    } else {
      setName("");
      setAge("");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ((!name || !age) && user?.action !== "delete") {
      return;
    }

    if (user?.action === "delete") {
      mutation.mutate({ id: user.id, action: user?.action });
    } else if (user?.action === "edit") {
      mutation.mutate({ name, age, id: user.id, action: user?.action });
    } else {
      mutation.mutate({ name, age });
    }
  };

  useEffect(() => {
    if (user?.action === "delete" && formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
      //   formRef.current.requestSubmit();
    }
  }, [user]);

  return (
    <div>
      <form
        className="flex gap-2 mb-4 items-center flex-wrap"
        autoComplete="off"
        onSubmit={handleSubmit}
        ref={formRef}
      >
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="name" className="capitalize font-medium text-lg">
            Enter your name
          </label>
          <input
            type="text"
            id="name"
            placeholder="Username"
            className="rounded-lg shadow-sm p-2 m-0"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col flex-1 gap-2">
          <label htmlFor="age" className="capitalize font-medium text-lg">
            Enter your age
          </label>
          <input
            type="number"
            id="age"
            placeholder="Age"
            className="rounded-lg shadow-sm p-2 m-0"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="p-3 outline-none border-none py-2 text-white rounded-md bg-green-700 m-0 self-end"
          onClick={handleSubmit}
        >
          {action}
        </button>
      </form>
    </div>
  );
};

export default Form;
