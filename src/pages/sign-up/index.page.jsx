import { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import Spinner from "../../components/Spinner";
import { isValidEmail } from "../../helpers";
import { toast } from "react-hot-toast";
import { getApp } from "firebase/app";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const registerWithEmailAndPassword = async () => {
    setFormLoading(true);
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
      setFormLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setErrors((curr) => ({
        ...curr,
        confirmPassword: "Passwords don't match",
      }));
      setFormLoading(false);
      return;
    } else {
      setErrors((curr) => ({ ...curr, confirmPassword: null }));
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        authProvider: "local",
        email,
        admin: false,
      });
      //navigate to home page
    } catch (err) {
      setFormLoading(false);
      console.error(err);
      alert(err.message);
    }
    setFormLoading(false);
  };

  return (
    <>
      <section className="flex flex-col items-center pb-32">
        <br />
        <br />
        <br />
        <br />
        <h1 className="text-6xl text-center">Sign Up</h1>
        <br />
        <br />
        <div className="card w-full max-w-lg bg-primary-focus shadow-xl">
          <div className="card-body">
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
            <p className="text-primary-content uppercase text-lg font-bold">
              Confirm Password
            </p>
            <input
              type="password"
              placeholder=""
              className="input input-bordered w-full"
              onChange={(e) => handleInputChange(e, setConfirmPassword)}
            />
            {errors.confirmPassword ? (
              <p className="bg-error text-error-content px-5 py-2 rounded-lg">
                {errors.confirmPassword}
              </p>
            ) : (
              ""
            )}
            <br />
            <button
              className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg bg-secondary-focus text-secondary-content border-none hover:bg-secondary-content hover:text-secondary"
              onClick={() => registerWithEmailAndPassword()}
            >
              {formLoading ? <Spinner /> : "Submit"}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export { Page };
