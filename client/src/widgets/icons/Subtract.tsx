
const Subtract = ({width, height, color}) => {
  return (
    <svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    stroke={color}
  >
    <path
      d="M4 12H20" // This is the horizontal line for subtraction
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
  );
};

export default Subtract;
