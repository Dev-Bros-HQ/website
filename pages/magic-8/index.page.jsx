import { useRef, useState } from "react";
import { debounce } from "../../helpers";
import get8BallResponse from "../../helpers/8ball";

const Page = () => {
  const ballRef = useRef();
  const responseRef = useRef();
  const [response, setResponse] = useState("");

  const getNew8BallResponse = () => {
    ballRef.current.classList.add("animate-shake");
    responseRef.current.classList.remove("animate-fade-in");
    setResponse("");
    debounce(() => {
      const res = get8BallResponse();
      setResponse(res);
      responseRef.current.classList.add("animate-fade-in");
      ballRef.current.classList.remove("animate-shake");
    }, 500)();
  };

  return (
    <section className="flex flex-col items-center">
      <br />
      <br />
      <br />
      <div
        ref={ballRef}
        className="w-[300px] h-[300px] rounded-full bg-gradient-to-br from-gray-900 to-black flex justify-center items-center shadow-2xl overflow-hidden relative"
      >
        <div className="absolute w-[100px] h-[120px] bg-white rounded-[100%] flex items-center justify-center text-black text-8xl top-[25%] left-[-20px] -skew-x-[25deg] -translate-y-[50%] transform-gpu font-bold pb-3">
          8
        </div>
        <div className="w-1/2 h-1/2 bg-gradient-radial from-black to-purple-900 border-2 border-slate-600 border-r-slate-800 border-b-slate-800 rounded-full flex justify-center items-center text-center">
          <p ref={responseRef} className="text-slate-200 w-full px-6 py-3">
            {response}
          </p>
        </div>
      </div>
      <br />
      <br />
      <br />
      <button className="btn btn-primary" onClick={getNew8BallResponse}>
        Shake Ball
      </button>
    </section>
  );
};

export { Page };

export const documentProps = {
  "og:title": "Magic 8 Ball",
  "og:description":
    "Ask a yes or no question, get a yes, no, or maybe response",
  "og:url": "https://devbroshq.com/",
  "og:image": "https://devbroshq.com/square-dev-bros-hq-title.webp",
};
