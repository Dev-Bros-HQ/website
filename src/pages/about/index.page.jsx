import Header from "../../components/Header";

const Page = () => {
  const textSections = [
    "At Dev Bros HQ, we believe that hands-on experience is the most effective way to learn and grow. As Confucius famously said, 'I hear and I forget. I see and I remember. I do and I understand.' In other words, simply hearing information or seeing something is not enough to truly internalize and understand it. It is only through actively participating and putting what we have learned into practice that we can fully grasp and comprehend new ideas. This emphasis on learning through doing is a core belief at Dev Bros HQ, and we strive to cultivate a culture of continuous learning and growth through practical experience and hands-on learning opportunities.",
    "We believe that learning through doing is the most effective way for developers to truly understand and internalize new concepts in coding. To support this philosophy, our developers are encouraged to come up with their own ideas for projects, resources, and tools that they can build and work on to help them grasp complex coding concepts. These ideas are not provided by the company, but rather come directly from the developers themselves, reflecting their own interests and passions. By building these projects and tools, our developers are able to actively engage with the material and put their new knowledge into practice, while also creating resources that are useful and valuable for our end users. This hands-on approach to learning is at the heart of our company culture and is a key part of what sets Dev Bros HQ apart as a place for developers to learn and grow, while also making a meaningful contribution to our users.",
    "We are dedicated to continuous learning and growth, and that means that we are always looking for ways to improve and refine our resources. However, as we are learning every day, it is possible that some of our resources may have issues or could be improved upon. If you come across any issues while using our resources, we encourage you to let us know. Your feedback is valuable to us and helps us to constantly improve and evolve our offerings. We take all feedback seriously and strive to use it to make our resources as helpful and useful as possible. Thank you for your support and for helping us to learn and grow!",
    // "We believe that technology should be accessible and user-friendly, which is why we're constantly working on new and innovative ways to help you streamline your tasks and accomplish more with less effort. Our tools are designed with you in mind, and we strive to make them as intuitive and easy to use as possible.",
    // "But that's not all - we also started Dev Bros HQ to help new developers gain experience by working on real projects and tools. We believe that the best way to learn is by doing, and we're committed to providing opportunities for new developers to build their skills and knowledge.",
    // "Whether you're a developer, a business owner, or just someone who wants to get more out of your technology, we're here to help. We offer a variety of tools and resources designed to make your life easier, including software, apps, and online resources.",
    // "Thank you for choosing Dev Bros HQ. We hope our tools can help you accomplish your goals and make your daily tasks a little bit easier.",
  ];

  return (
    <>
      <div className="font-sans">
        <div className="container mx-auto flex flex-col items-center px-4 py-8">
          <Header>Welcome to Dev Bros HQ!</Header>
          {textSections.map((copy, copyIndex) => (
            <p
              key={copyIndex}
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
