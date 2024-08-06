import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles
import { ToastContainer, toast } from "react-toastify";
import { useRouter } from "next/router";
import axios from "axios";
import dogImage from "../assets/images/dogs/dog_orange_bg.jpeg";
import Link from "next/link";

const Register: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    password_repeat: "",
    roles: [], // Assuming roles are not handled in this form, or use this field if needed
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Basic validation
    if (formData.password !== formData.password_repeat) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/register`,
        {
          username: formData.username,
          email: formData.email,
          password: formData.password,
          roles: formData.roles.length > 0 ? formData.roles : undefined, // Include roles if they exist
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        toast.success("Registration successful!");
        router.push("/login");
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="bg-gradient-primary"
      style={{
        height: "100vh",
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
                        <h4 className="text-dark mb-4">Create an Account!</h4>
                      </div>
                      <form className="user" onSubmit={handleSubmit}>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="text"
                            id="username"
                            placeholder="Username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="mb-3">
                          <input
                            className="form-control form-control-user"
                            type="email"
                            id="email"
                            aria-describedby="emailHelp"
                            placeholder="Email Address"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                          />
                        </div>
                        <div className="row mb-3">
                          <div className="col-sm-6 mb-3 mb-sm-0">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="password"
                              placeholder="Password"
                              name="password"
                              value={formData.password}
                              onChange={handleChange}
                              required
                            />
                          </div>
                          <div className="col-sm-6">
                            <input
                              className="form-control form-control-user"
                              type="password"
                              id="password_repeat"
                              placeholder="Repeat Password"
                              name="password_repeat"
                              value={formData.password_repeat}
                              onChange={handleChange}
                              required
                            />
                          </div>
                        </div>
                        <button
                          className="btn btn-primary d-block btn-user w-100"
                          type="submit"
                        >
                          Register Account
                        </button>
                        <hr />
                        <a
                          className="btn btn-primary d-block btn-google btn-user w-100 mb-2"
                          role="button"
                        >
                          <i className="fab fa-google"></i> Register with Google
                        </a>
                        <hr />
                      </form>
                      <div className="text-center">
                        <a className="small" href="forgot-password.html">
                          Forgot Password?
                        </a>
                      </div>
                      <div className="text-center">
                        <Link href="/login" className="small">
                          Already have an account? Login!
                        </Link>
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

export default Register;
