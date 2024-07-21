import GoogleIcon from "@/icons/GoogleIcon";

function GoogleLoginButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="p-4 rounded-lg shadow-lg text-gray-400 border hover:bg-blue-50 transition-all duration-300 ease-in-out cursor-pointer"
    >
      <div className="flex items-center gap-2 justify-between">
        <GoogleIcon />
        <p className="sm:text-2xl text-xl font-semibold text-nowrap">
          Sign in with Google
        </p>
      </div>
    </button>
  );
}

export default GoogleLoginButton;
