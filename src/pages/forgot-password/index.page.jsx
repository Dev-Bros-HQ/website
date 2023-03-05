import { useState } from "react";
import { sendPasswordResetEmail, getAuth } from "firebase/auth";
import { toast } from "react-hot-toast";
import { isValidEmail } from "../../helpers";
import Spinner from "../../components/Spinner";
import { getApp } from "firebase/app";

const Page = () => {
  const [email, setEmail] = useState("");
  const [linkSent, setLinkSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const app = getApp();
  const auth = getAuth(app);

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const sendPasswordReset = async () => {
    setLoading(true);
    if (!isValidEmail(email)) {
      toast.custom(
        <div className="alert alert-error shadow-lg max-w-[400px]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Please enter a valid email address</span>
          </div>
        </div>
      );
      setLoading(false);
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      setLinkSent(true);
    } catch (err) {
      toast.custom(
        <div className="alert alert-error shadow-lg max-w-[400px]">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>There was an error sending the reset link.</span>
          </div>
        </div>
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-6xl text-center">
          {linkSent ? "Link Sent!" : "Forgot Password"}
        </h1>
        <br />
        <br />
        {linkSent ? (
          <div className="card w-full max-w-lg bg-primary-focus shadow-xl">
            <div className="card-body">
              <p className="text-primary-content">
                Please check your email for the link.
              </p>
              <p className="text-primary-content">
                Need to{" "}
                <a href="/sign-in" className="text-accent-focus underline">
                  sign in?
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div className="card w-full max-w-lg bg-primary-focus shadow-xl">
            <div className="card-body">
              <p className="text-primary-content">
                Enter your email and we'll send you a password reset link.
              </p>
              <div className="form-control w-full">
                <p className="text-primary-content uppercase text-lg font-bold">
                  Email
                </p>
                <input
                  type="text"
                  placeholder=""
                  className="input input-bordered w-full"
                  onChange={(e) => handleInputChange(e, setEmail)}
                />
                <br />
                <button
                  type="submit"
                  disabled={email.length < 4}
                  className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-secondary-focus text-secondary-content border-none hover:bg-secondary-content hover:text-secondary"
                  onClick={() => sendPasswordReset()}
                >
                  {loading ? <Spinner /> : "Submit"}
                </button>
                <br />
                <p className="text-primary-content">
                  Don't have an account?{" "}
                  <a href="/sign-up" className="text-accent-focus underline">
                    Sign up!
                  </a>
                </p>
                <br />
                <p className="text-primary-content">
                  Need to{" "}
                  <a href="/sign-in" className="text-accent-focus underline">
                    sign in?
                  </a>
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export { Page };
