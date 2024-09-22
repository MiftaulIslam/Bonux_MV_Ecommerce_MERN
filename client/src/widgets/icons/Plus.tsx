const Plus = ({width, height, color}) => {
  return (
    <svg
      width={width} 
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke={color}
      transform="rotate(0)matrix(-1, 0, 0, 1, 0, 0)"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g
        id="SVGRepo_tracerCarrier"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="#CCCCCC"
        strokeWidth="2.7359999999999998"
      ></g>
      <g id="SVGRepo_iconCarrier">
        {" "}
        <path
          d="M6 12H18M12 6V18"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>{" "}
      </g>
    </svg>
  );
};

export default Plus;
