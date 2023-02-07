import React, { useState, ChangeEvent } from "react";
import "./App.css";
import {
  getAge,
  getBirthday,
  getCountry,
  getEmail,
  getFirstName,
  getIsOnline,
  getLastName,
  getPassword,
  getRandomFromArray,
  getRandomHexColor,
  getTel,
  getUsername,
} from "./utils";
import Highlight from "react-highlight";
import {
  Button,
  Pane,
  TextInputField,
  Heading,
  TagInput,
  Strong,
  toaster,
  Text,
} from "evergreen-ui";

import { Userdata } from "./types";

function App() {
  const [data, setData] = useState<Userdata[]>([]);
  const [num, setNum] = useState(1);
  const [roles, setRoles] = useState(["subscriber", "admin", "editor"]);
  const [email, setEmail] = useState("placeholder.com");

  const allValues = React.useMemo(
    () => [
      "age",
      "firstName",
      "lastName",
      "email",
      "telephone",
      "country",
      "birthday",
      "color",
      "role",
      "password",
      "username",
      "isOnline",
    ],
    []
  );
  const [values, setValues] = React.useState(allValues);

  const autocompleteItems = React.useMemo(
    () => allValues.filter((i) => !values.includes(i)),
    [allValues, values]
  );

  const getUsers = () => {
    let x = Array(0);

    for (let i = 0; i < num; i++) {
      let firstName = getFirstName();
      let lastName = getLastName();
      let birthday = getBirthday();
      const l = {
        id: i,
        ...(values.includes("firstName") && { firstName: firstName }),
        ...(values.includes("lastName") && { lastName: lastName }),
        ...(values.includes("email") && {
          email: getEmail(firstName, lastName, email),
        }),
        ...(values.includes("telephone") && { telephone: getTel() }),
        ...(values.includes("country") && { country: getCountry() }),
        ...(values.includes("birthday") && { birthday: birthday }),
        ...(values.includes("age") && { age: getAge(birthday) }),
        ...(values.includes("color") && { color: getRandomHexColor() }),
        ...(values.includes("role") && { role: getRandomFromArray(roles) }),
        ...(values.includes("username") && {
          username: getUsername(firstName, lastName),
        }),
        ...(values.includes("password") && { password: getPassword() }),
        ...(values.includes("isOnline") && { isOnline: getIsOnline() }),
      };

      x.push(l);
    }

    setData(x);
  };
  console.log(data);

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(data));
    toaster.notify("Generated JSON copied to your clipboard! 👍");
  };

  return (
    <div className="App">
      <Pane marginY={24}>
        <Heading marginBottom={8} size={800}>
          Generate user data
        </Heading>
        <Text>
          Generate user data to act as an placeholder to your next project!
        </Text>
      </Pane>
      <TextInputField
        name="amountOfObjects"
        marginY={16}
        label="How many objects?"
        placeholder="Text input placeholder..."
        defaultValue={num}
        type="number"
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setNum(parseInt(e.target.value))
        }
      />
      <Strong marginY={16}>Included data</Strong>
      <Pane display="flex" marginY={16} alignItems="center">
        <TagInput
          inputProps={{ placeholder: "Enter something..." }}
          values={values}
          autocompleteItems={autocompleteItems}
          onRemove={(_value, index) => {
            setValues(values.filter((_, i) => i !== index));
          }}
          onAdd={(newValues) => {
            if (newValues.some((val) => !allValues.includes(val))) {
              toaster.danger("Oops, you added an unsupported value!");
              return;
            }
            setValues([...values, ...newValues]);
          }}
        />{" "}
      </Pane>
      {values.includes("email") && (
        <TextInputField
          label="Email address domain"
          name="email"
          placeholder="Text input placeholder..."
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
      )}
      {values.includes("role") && (
        <Pane marginY={16}>
          <Strong marginRight={8}>Edit Roles:</Strong>
          <TagInput
            inputProps={{ placeholder: "Enter roles..." }}
            values={roles}
            onChange={setRoles}
          />
        </Pane>
      )}
      <Pane marginTop={24}>
        <Button onClick={() => getUsers()} appearance="primary">
          Generate random user data
        </Button>
        <Button marginX={16} onClick={() => copyJson()}>
          Copy
        </Button>
      </Pane>
      <Highlight className="json">{JSON.stringify(data, null, 2)}</Highlight>
    </div>
  );
}

export default App;
