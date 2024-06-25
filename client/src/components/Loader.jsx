import styled from 'styled-components';

const StyledLoader = styled.h4`
  text-align: center;
  color: var(--primary-500);
  margin: 20px 0;
`;

const Loader = () => {
  return <StyledLoader>Loading...</StyledLoader>;
};

export default Loader;
