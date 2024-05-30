import Wrapper from '../assets/wrappers/LandingPage';
import main from '../assets/images/main.svg';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Logo from '../components/Logo';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
        <Logo />
      </nav>
      <div className="container page">
        <div className="info">
          <h1>Quick Posts</h1>
          <p>
            <span>Y</span> is a microblogging platform where users share short
            messages called tweets. It is renowned for its real-time
            communication and global reach, making it vital for news,
            discussions, and networking.
          </p>
          <div className="links">
            <Link to="/register" className="register-link">
              <Button variant="contained">Register</Button>
            </Link>
            <Link to="/login">
              <Button variant="contained">Login / Demo User</Button>
            </Link>
          </div>
        </div>
        <img src={main} alt="job hunt" className="img main-img" />
      </div>
    </Wrapper>
  );
};

export default Landing;
