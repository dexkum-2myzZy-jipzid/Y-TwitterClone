import Wrapper from '../assets/wrappers/Avatar';

const Avatar = ({ src, alt }) => (
  <Wrapper>
    <img className="profile-image" src={src} alt={alt}></img>
  </Wrapper>
);
export default Avatar;
