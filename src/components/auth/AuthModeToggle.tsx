
interface AuthModeToggleProps {
  isLogin: boolean;
  onModeSwitch: () => void;
}

const AuthModeToggle = ({ isLogin, onModeSwitch }: AuthModeToggleProps) => {
  return (
    <div className="mt-6 text-center">
      <p className="text-sm text-gray-600">
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <button 
          onClick={onModeSwitch}
          className="text-green-600 hover:text-green-700 font-medium"
        >
          {isLogin ? "Sign up here" : "Sign in here"}
        </button>
      </p>
    </div>
  );
};

export default AuthModeToggle;
