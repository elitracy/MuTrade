import "../css/tailwind.css";

function Login() {
  return (
    <div
      className="login"
      class="flex flex-col text-center h-screen bg-blue-800 m-auto"
    >
      <h1 class="text-white font-bold text-7xl mt-48">Login</h1>

      <div
        className="inputs"
        class="flex flex-col items-start w-1/4 mx-auto mt-10"
      >
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          class="
                    bg-transparent text-white text-xl border-2 border-white w-9/12 p-3 rounded-3xl my-0 focus:border-green-500 hover:w-10/12 focus:w-10/12
                    placeholder-gray-300 outline-none transition-transform
                "
        />
        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          class="
                    bg-transparent text-white text-xl border-2 border-white w-full p-3 rounded-3xl mt-3 focus:border-green-500
                    placeholder-gray-300 outline-none hover:w-10/12 focus:w-10/12 transition-transform
                "
        />
      </div>

      <a href="/signup" class=" w-1/6 mx-auto">
        <p class="text-gray-400 mt-4 cursor-pointer w-full ">
          Don't have an account?
        </p>
      </a>
      <a href="/forgotPassword" class=" w-1/6 mx-auto">
        <p class="text-gray-400 mt-4 cursor-pointer  w-full">
          Forgot my password...
        </p>
      </a>
      <input
        type="submit"
        class="text-green-500 bg-transparent text-xl font-bold cursor-pointer border-2 w-40 mx-auto mt-6 rounded-3xl p-3 border-green-500 hover:bg-green-500 hover:text-blue-800 transition-colors"
      />
    </div>
  );
}

export default Login;
