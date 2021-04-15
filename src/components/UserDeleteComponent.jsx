import React, { useState } from "react";
import { Button, Form, Input } from "semantic-ui-react";
import { useStore } from "../store/store";

export default function UserDeleteComponent() {
  const [isClicked, setIsClicked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const storeDeleteUser = useStore((state) => state.storeDeleteUser);

  const handleDelete = (e) => {
    e.preventDefault();
    storeDeleteUser(username, password);
  };
  return (
    <div id="deleteuser">
      {!isClicked && (
        <Button onClick={() => setIsClicked(true)} negative>
          DELETE USER
        </Button>
      )}
      {isClicked && (
        <Form onSubmit>
          <Input
            placeholder="Username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            onClick={(e) => {
              e.preventDefault();
              setIsClicked(false);
            }}
            negative
          >
            CANCEL
          </Button>
          <Button onClick={handleDelete} positive>
            DELETE USER
          </Button>
        </Form>
      )}
    </div>
  );
}
