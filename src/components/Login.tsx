import GoogleLoginButton from "./GoogleLoginButton";
import Loading from "./Loading";

function Login() {
  return (
    <>
      <Loading state={true} />
      <div className="flex flex-col items-center w-full h-full text-wrap text-2xl">
        <div className="flex flex-col text-center max-w-68 sm:pb-10 pt-10 text-gray-500 text-sm">
          <p>
            You can play the game without signing in, but your top score will
            only be stored on your device.
          </p>
          <p>To submit your score, you need to sign in.</p>
          <p>You can sign in with your Google account.</p>
        </div>
        <div className="flex items-center justify-center w-full p-10">
          <GoogleLoginButton />
        </div>
        <div className="flex flex-col text-center justify-center text-xs max-w-68 text-gray-500">
          <p>
            This app collects and stores your email and name. We do not share
            this information with anyone.
          </p>
          <p>By signing in, you agree to our terms and privacy policy.</p>
        </div>
      </div>
    </>
  );
}

export default Login;
