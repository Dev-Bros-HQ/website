import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useFirebase } from "../context/firebase";
import Spinner from "../components/Spinner";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const { db, auth } = useFirebase();
  const navigate = useNavigate();

  const handleInputChange = (e, callback) => {
    const { value } = e.target;
    callback(value);
  };

  const registerWithEmailAndPassword = async () => {
    setFormLoading(true);

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
      console.log({ user });
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        authProvider: "local",
        email,
        admin: false,
      });
      navigate("/");
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

export default SignUp;
