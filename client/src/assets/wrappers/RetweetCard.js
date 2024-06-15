import styled from 'styled-components';

const Wrapper = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 1rem;
  max-width: 100%;
  margin-top: 8px;
  padding: 8px;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  cursor: pointer;

  .retweet-header {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 4px;
  }

  .retweet-content {
    margin-top: 8px;

    text-align: left;
    line-height: 1.5;
    max-height: 74px;

    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: var(--grey-200);
  }
`;

export default Wrapper;
