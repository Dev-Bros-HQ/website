const Header = ({ children, ...props }) => {
  return (
    <h1
      className="text-3xl md:text-6xl font-bold text-secondary text-left md:text-center mb-5 md:mb-10"
      {...props}
    >
      {children}
    </h1>
  );
};

export default Header;
