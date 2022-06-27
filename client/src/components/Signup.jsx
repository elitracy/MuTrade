import "../css/tailwind.css";

function Signup() {
  return (
    <div
      className="signup"
      class="flex flex-col text-center h-screen bg-blue-800 m-auto"
    >
      <h1 class="text-white font-bold text-7xl mt-48">Sign Up</h1>

      <div
        className="inputs"
        class="flex flex-col items-start w-2/5 mx-auto mt-10 "
      >
        <input
          type="text"
          id="username"
          name="username"
          placeholder="username"
          class="
                    bg-transparent text-white text-xl border-2 border-white w-9/12 p-3 rounded-3xl mb-3 focus:border-green-500
                    placeholder-gray-300 outline-none
                "
        />
        <div className="emails" class="w-11/12 flex flex-row justify-evenly">
          <input
            type="text"
            id="email"
            name="email"
            placeholder="email"
            class="
                        bg-transparent text-white text-xl border-2 border-white w-full p-3 rounded-3xl mr-2 my-1 focus:border-green-500
                        placeholder-gray-300 outline-none
                    "
          />
          {/* <input type="text" id="confirm-email" name="confirm-email" placeholder="confirm email" class="
                        bg-transparent text-white text-xl border-2 border-white w-5/12 p-3 rounded-3xl my-1 focus:border-green-500
                        placeholder-gray-300
                    "/> */}
        </div>

        <input
          type="password"
          id="password"
          placeholder="password"
          name="password"
          class="
                    bg-transparent text-white text-xl border-2 border-white w-4/5 p-3 rounded-3xl mt-3 focus:border-green-500
                    placeholder-gray-300 outline-none
                "
        />
        <input
          type="password"
          id="confirm-password"
          placeholder="confirm password"
          name="password"
          class="
                    bg-transparent text-white text-xl border-2 border-white w-full p-3 rounded-3xl mt-3 focus:border-green-500
                    placeholder-gray-300 outline-none
                "
        />
      </div>

      {/* <input type="checkbox" class="text-gray-400 mt-4 cursor-pointer form-checkbox"/> */}
      <input
        type="submit"
        class="text-green-500 text-xl bg-transparent font-bold cursor-pointer border-2 w-60 mx-auto mt-6 rounded-3xl p-3 border-green-500 hover:bg-green-500 hover:text-blue-800 transition-colors"
      />
    </div>
  );
}

export default Signup;
