import Wrapper from '../assets/wrappers/TweetBody';

const TweetBody = ({ tweet }) => {
  return (
    <Wrapper>
      {tweet.content && (
        <div className="tweet-body">
          <p>{tweet.content}</p>
        </div>
      )}
      {tweet.media && <img className="tweet-media" src={tweet.media} />}
    </Wrapper>
  );
};

export default TweetBody;
