import { Comment } from "react-loader-spinner";

const LoadingUI = () => {
  return (
    <div className="flex flex-col w-full flex-grow justify-center items-center">
      <Comment
        visible={true}
        height="80"
        width="80"
        ariaLabel="comment-loading"
        wrapperStyle={{}}
        wrapperClass="comment-wrapper"
        color="#fff"
        backgroundColor="#F4442E"
      />
    </div>
  );
};

export default LoadingUI;
