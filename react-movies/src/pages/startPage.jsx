import { Link } from "react-router";

const StartPage = () => {
  
    return(
        <>
            <p>
                Welcome to Tasky! View your <Link to="/upcoming">Upcoming Movies</Link> or your <Link to="/profile">Profile</Link>.
            </p>
            <p>
                <Link to="/login">Login</Link> or <Link to="/signup">Signup</Link> to create tasks!
            </p>
        </>
    );
  };

export default StartPage;
