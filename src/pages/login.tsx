import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import dogImage from "../assets/images/dogs/dog_gray_bg.jpeg";
import logo_google_icon from "../assets/images/logo_google_icon.ico";
import { ToastContainer, toast } from "react-toastify";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/router";
import "react-toastify/dist/ReactToastify.css";
import { getCookie } from "cookies-next";
import Image from "next/image";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/login`,
        {
          username,
          password,
        },
        { withCredentials: true }
      );

      router.push("/dashboard");
      console.log("Login successful", response);
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(
          error.response?.data?.message || "Invalid username or password"
        );
      } else {
        toast.error("An unexpected error occurred");
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
                      <Image
                        className="flex-grow-1"
                        src={dogImage.src}
                        alt=""
                        width={300}
                        height={400}
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
                                checked={rememberMe}
                                onChange={() => setRememberMe(!rememberMe)}
                              />
                              <label
                                className="form-check-label"
                                htmlFor="formCheck-1"
                                aria-checked={rememberMe}
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
                          href="/auth/google"
                          role="button"
                        >
                          <Image 
                            className="flex-grow-1"
                            src={logo_google_icon}
                            alt=""
                            width={30}
                            height={40}
                            style={{
                              objectFit: "cover",
                              objectPosition: "center",
                            }}
                          ></Image> 
                          Login with Google
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
      <ToastContainer />
    </div>
  );
};

export async function getServerSideProps(context: { req: any }) {
  const cookieValue = getCookie("Authorization", { req: context.req });

  if (cookieValue) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Login;
