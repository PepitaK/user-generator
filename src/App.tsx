import React, { useState, ChangeEvent } from "react";
import "./App.css";
import {
  getAge,
  getBirthday,
  getCountry,
  getEmail,
  getFirstName,
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
function App() {
  const [data, setData] = useState("[]");
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
    ],
    []
  );
  const [values, setValues] = React.useState(allValues);

  const autocompleteItems = React.useMemo(
    () => allValues.filter((i) => !values.includes(i)),
    [allValues, values]
  );

  const getUsers = () => {
    let x = [];

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
      };

      x.push(l);
    }

    setData(JSON.stringify(x, null, 2));
  };

  const copyJson = () => {
    navigator.clipboard.writeText(data);
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
            if (newValues.some((val) => !values.includes(val))) {
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
        <Button onClick={() => getUsers()}>Generate random userdata</Button>
        <Button marginX={16} onClick={() => copyJson()}>
          Copy
        </Button>
      </Pane>
      <Highlight className="json">{data}</Highlight>
    </div>
  );
}

export default App;
