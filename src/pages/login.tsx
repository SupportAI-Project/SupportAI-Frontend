import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dogImage from "../assets/images/dogs/dog_gray_bg.jpeg";
import axios, { AxiosError } from "axios";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");

    try {
      const response = await axios.post("http://localhost:8080/auth/login", {
        username,
        password,
      });

      // Handle successful login, e.g., save token, redirect, etc.
      console.log("Login successful", response.data);
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(
          error.response?.data?.message || "Invalid username or password"
        );
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div
      className="bg-gradient-primary"
      style={{
        height: "100vh",
        minHeight: "inherit",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-9 col-lg-12 col-xl-10">
            <div className="card shadow-lg o-hidden border-0 my-5">
              <div className="card-body p-0">
                <div className="row">
                  <div className="col-lg-6 d-none d-lg-flex">
                    <div className="flex-grow-1 bg-login-image">
                      <img
                        className="flex-grow-1 bg-login-image"
                        src={dogImage.src}
                        alt=""
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          objectPosition: "center",
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="p-5">
                      <div className="text-center">
                        <h4 className="text-dark mb-4">Welcome Back!</h4>
                      </div>
                      <form className="user" onSubmit={handleLogin}>
                        <div className="mb-3">
                          <input
                            id="exampleInputUsername"
                            className="form-control form-control-user"
                            type="text"
                            placeholder="Enter Username..."
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            id="exampleInputPassword"
                            className="form-control form-control-user"
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>
                        <div className="mb-3">
                          <div className="custom-checkbox small">
                            <div className="form-check">
                              <input
                                id="formCheck-1"
                                className="form-check-input"
                                type="checkbox"
                              />
                              <label
                                className="form-check-label"
                                htmlFor="formCheck-1"
                              >
                                Remember Me
                              </label>
                            </div>
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Login
                        </button>
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <i className="fab fa-google"></i> Login with Google
                        </a>
                        <hr />
                        {error && (
                          <div className="alert alert-danger" role="alert">
                            {error}
                          </div>
                        )}
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <a className="small" href="register">
                          Create an Account!
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
