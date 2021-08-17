import { Link } from "@reach/router";
import { useContext } from "react";
import GlobalContext from "../GlobalContext";

const Header = () => {
  const { user, setUser } = useContext(GlobalContext);

  return (
    <div className="header">
      <Link to="/">
        <h1>A Spot of Pottery Chat</h1>
      </Link>
      <p>
        Username:&nbsp;
        <input
          value={user}
          onChange={(event) => setUser(event.target.value)}
          placeholder="Dave"
        />
      </p>
    </div>
  );
};

export default Header;
