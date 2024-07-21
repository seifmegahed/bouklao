import { useState } from "react";

import { useAuth } from "@/context/authContext";

import Loading from "@/components/Loading";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { toast } from "sonner";

function Login({ onClose }: { onClose: () => void }) {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = () => {
    setLoading(true);
    login()
      .then((user) => {
        toast("Successfully logged in as " + user.displayName);
        onClose();
      })
      .catch((error) => {
        console.error(error);
        toast("Error signing in");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <>
      <Loading state={loading} />
      <div className="flex flex-col items-center w-full h-full text-wrap text-2xl overflow-y-scroll">
        <div className="flex flex-col text-center max-w-68 sm:pb-10 pt-10 text-gray-500 text-sm">
          <p>
            You can play the game without signing in, but your top score will
            only be stored on your device.
          </p>
          <p>To submit your score, you need to sign in.</p>
          <p>You can sign in with your Google account.</p>
        </div>
        <div className="flex items-center justify-center w-full p-10">
          <GoogleLoginButton onClick={handleLogin} />
        </div>
        <div className="flex flex-col text-center justify-center text-xs max-w-68 text-gray-500">
          <p>
            This app collects and stores your email and name. We do not share
            this information with anyone.
          </p>
          <p>By signing in, you agree to our terms and privacy policy.</p>
          <p>
            Source code is available on{" "}
            <a
              className="underline text-blue-500 hover:text-blue-700"
              href="https://github.com/john-smilga/react-firebase-auth-demo"
            >
              GitHub
            </a>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
