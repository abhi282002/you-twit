import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import UserContext from "../Store/UserContext";

export default function Header() {
  const data = React.useContext(UserContext);
  console.log(data);

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt="Remy Sharp" src={data.loggedInUser.avatar} />
    </Stack>
  );
}
