import Header from "../../components/Header";

const Page = () => {
  const textSections = [
    "We're a team of developers dedicated to creating tools that make it easier for you, the end user, to get things done.",
    "At Dev Bros HQ, we believe that technology should be accessible and user-friendly, which is why we're constantly working on new and innovative ways to help you streamline your tasks and accomplish more with less effort. Our tools are designed with you in mind, and we strive to make them as intuitive and easy to use as possible.",
    "But that's not all - we also started Dev Bros HQ to help new developers gain experience by working on real projects and tools. We believe that the best way to learn is by doing, and we're committed to providing opportunities for new developers to build their skills and knowledge.",
    "Whether you're a developer, a business owner, or just someone who wants to get more out of your technology, we're here to help. We offer a variety of tools and resources designed to make your life easier, including software, apps, and online resources.",
    "Thank you for choosing Dev Bros HQ. We hope our tools can help you accomplish your goals and make your daily tasks a little bit easier.",
  ];

  return (
    <>
      <div className="font-sans">
        <div className="container mx-auto px-4 py-8 flex flex-col items-center">
          <Header>Welcome to Dev Bros HQ!</Header>
          {textSections.map((copy, copyIndex) => (
            <p
              className={
                copyIndex === 0
                  ? "mb-4 max-w-lg text-xl text-accent"
                  : "mb-4 max-w-lg"
              }
            >
              {copy}
            </p>
          ))}
          <br />
          <br />
          <br />
          <br />
          <br />
        </div>
      </div>
    </>
  );
};

export { Page };

export const documentProps = {
  "og:title": "About Dev Bros HQ",
  "og:description":
    "We build tools for you to help us become better developers.",
  "og:url": "https://devbroshq.com/",
  "og:image": "https://devbroshq.com/square-dev-bros-hq-title.webp",
};
