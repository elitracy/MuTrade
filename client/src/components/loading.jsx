import React from "react";
import "../css/tailwind.css";
const loadingImg =
  "https://cdn.auth0.com/blog/auth0-react-sample/assets/loading.svg";

const Loading = () => (
  <div className="spinner" class="w-screen h-screen">
    <img src={loadingImg} alt="Loading..." class="w-36 mx-auto my-72" />
  </div>
);

export default Loading;
