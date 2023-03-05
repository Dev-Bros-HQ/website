const Spinner = ({ size = "sm", color = "secondary" }) => {
  const sizes = {
    sm: "w-6 h-6 border-4",
    md: "w-10 h-10 border-[5px]",
    lg: "w-16 h-16 border-[7px]",
  };

  const colors = {
    primary: "border-primary-content border-t-primary",
    secondary: "border-secondary-content border-t-secondary",
  };
  const baseStyle = `${sizes[size]} ${colors[color]} animate-spin rounded-full cursor-wait`;
  return <span className={baseStyle}></span>;
};

export default Spinner;
