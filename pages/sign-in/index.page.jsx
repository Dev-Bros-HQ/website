import { useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { useFirebase } from "../../context/firebase";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { auth } = useFirebase();

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const logInWithEmailAndPassword = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      window.location.href = "/";
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <>
      <section className="flex flex-col items-center">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-6xl text-center">Sign In</h1>
        <br />
        <br />
        <div className="card w-full max-w-lg bg-primary-focus shadow-xl">
          <div className="card-body">
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
              <p className="text-primary-content uppercase text-lg font-bold">
                Password
              </p>
              <input
                type="password"
                placeholder=""
                className="input input-bordered w-full"
                onChange={(e) => handleInputChange(e, setPassword)}
              />
              <br />
              <button
                type="submit"
                disabled={!email.length && !password.length}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-secondary-focus text-secondary-content border-none hover:bg-secondary-content hover:text-secondary"
                onClick={() => logInWithEmailAndPassword()}
              >
                Submit
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
                <a
                  href="/forgot-password"
                  className="text-accent-focus underline"
                >
                  Forgot Password
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export { Page };
