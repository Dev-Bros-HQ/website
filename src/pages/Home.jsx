import { useEffect } from "react";
import logo from "../assets/circle-dev-bros-hq.webp";
import { useFirebase } from "../context/firebase";

const Home = () => {
  const { builds } = useFirebase();

  useEffect(() => {
    console.log(builds);
  }, [builds]);

  return (
    <section className="text-neutral-content body-font">
      <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
        <img
          className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
          alt="dev bros hq logo"
          src={logo}
        />
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium">
            Microdosing synth tattooed vexillologist
          </h1>
          <p className="mb-8 leading-relaxed">
            Meggings kinfolk echo park stumptown DIY, kale chips beard jianbing
            tousled. Chambray dreamcatcher trust fund, kitsch vice godard
            disrupt ramps hexagon mustache umami snackwave tilde chillwave ugh.
            Pour-over meditation PBR&amp;B pickled ennui celiac mlkshk freegan
            photo booth af fingerstache pitchfork.
          </p>
        </div>
      </div>
      <div>{JSON.stringify(builds)}</div>
    </section>
  );
};

export default Home;
