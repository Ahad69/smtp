import { Button, Modal, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddUser = ({ setUsers, users }) => {
  const [opened, setOpened] = useState(false);

  const close = () => {
    setOpened(false);
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const id = e.target.id.value;
    const secret = e.target.secret.value;
    const token = e.target.token.value;

    const data = {
      email,
      clientId: id,
      clientSecret: secret,
      refreshToken: token,
      limit: 300,
    };

    setUsers((prevUsers) => {
      const emailExists = prevUsers.some((user) => user.email === email);
      if (emailExists) {
        toast.error("User with this email already exists!");
        return prevUsers;
      } else {
        toast.success("User credential added!");
        return [...prevUsers, data];
      }
    });
    e.target.reset();
  };

  const handleRemoveUser = (emailToRemove) => {
    setUsers((prevUsers) =>
      prevUsers.filter((user) => user.email !== emailToRemove)
    );
  };

  return (
    <div>
      <div>
        <div>
          {users?.length == 0 ? (
            <Button onClick={() => setOpened(true)}>Add User Credential</Button>
          ) : (
            <ul className="flex flex-col gap-2">
              {users.map((a, index) => (
                <li
                  className="flex justify-between  bg-slate-900 p-1"
                  key={index}
                >
                  <p>{a?.email}</p>
                  <span onClick={() => handleRemoveUser(a?.email)}>X</span>
                </li>
              ))}
              <button
                onClick={() => setOpened(true)}
                className="text-sm bg-sky-700 px-2 py-2 rounded text-white disabled:bg-gray-400"
                disabled={users.length >= 10}
              >
                Add Another User
              </button>
            </ul>
          )}
        </div>

        <Modal
          centered
          opened={opened}
          onClose={close}
          title={`Add User Credential (${users?.length})`}
        >
          <form
            onSubmit={handleAddUser}
            className="border p-1 border-slate-800"
          >
            <TextInput
              description="Email"
              required
              name="email"
              type="email"
              placeholder="Email"
            />
            <TextInput
              description="Client Id"
              name="id"
              required
              placeholder="Client Id"
            />
            <TextInput
              required
              name="secret"
              description="Client Secret"
              placeholder="Client Secret"
            />
            <TextInput
              required
              name="token"
              description="Refresh Token"
              placeholder="Refresh Token"
            />
            <div className="mt-5 flex gap-3">
              <button
                type="submit"
                disabled={users.length >= 10}
                className="text-sm bg-sky-700 px-2 rounded text-white disabled:bg-gray-400"
              >
                Add Another User
              </button>
              <button
                type="submit"
                disabled={users.length >= 10}
                onClick={close}
                className="text-sm bg-green-700 px-2 rounded text-white disabled:bg-gray-400"
              >
                Set
              </button>
              <button
                onClick={close}
                className="text-sm bg-red-700 px-2 rounded text-white"
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </div>
  );
};

export default AddUser;
