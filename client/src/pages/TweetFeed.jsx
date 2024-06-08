import { ImageTweet, PlainTextTweet, QuoteTweet } from '../components';

const TweetFeed = () => {
  return (
    <div>
      <PlainTextTweet
        id="1"
        profileImage="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        name="Elon Musk"
        username="elonmusk"
        date="Jun 6"
        content="Today was a great day for humanity’s future as a spacefaring civilization! Nothing unites us more than working together towards inspiring objectives."
        replies={8400}
        retweets={17000}
        likes={188000}
        views={37}
      />
      <PlainTextTweet
        id="2"
        profileImage="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        name="Elon Musk"
        username="elonmusk"
        date="Jun 6"
        content="Today was a great day for humanity’s future as a spacefaring civilization! Nothing unites us more than working together towards inspiring objectives."
        replies={8400}
        retweets={17000}
        likes={188000}
        views={37}
      />
      <PlainTextTweet
        id="3"
        profileImage="https://pbs.twimg.com/profile_images/1590968738358079488/IY9Gx6Ok_400x400.jpg"
        name="Elon Musk"
        username="elonmusk"
        date="Jun 6"
        content="Today was a great day for humanity’s future as a spacefaring civilization! Nothing unites us more than working together towards inspiring objectives."
        replies={8400}
        retweets={17000}
        likes={188000}
        views={37}
      />
      <ImageTweet />
      <QuoteTweet />
    </div>
  );
};
export default TweetFeed;
