import { Link } from "@reach/router";

const Header = ({ user }) => {
	return (
		<div className="header">
			<Link to="/">
				<h1>A Spot of Pottery Chat</h1>
			</Link>
			<p>Welcome {user}</p>
		</div>
	);
};

export default Header;
