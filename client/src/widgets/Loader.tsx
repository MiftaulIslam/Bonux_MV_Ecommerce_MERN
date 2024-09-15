const Loader = ({status}) => {
    return (
      <div className={` ${status ==='partial' ? 'w-full h-full':"fixed bg-opacity-50 backdrop-blur-sm bg-gray-300"} inset-0 flex items-center justify-center  z-50`}>
        <span className="relative inline-block w-12 h-12 rounded-full animate-rotate">
          {/* Outer ring */}
          <span
            className="absolute inset-0 rounded-full border-4 border-[#189be7] animate-prixClipFix"
            style={{ clipPath: 'polygon(50% 50%,0 0,0 0,0 0,0 0,0 0)' }}
          />
          {/* Inner ring with different animation */}
          <span
            className="absolute inset-1 rounded-full border-4 border-[#FF3D00] animate-prixClipFix animate-reverseRotate"
            style={{ clipPath: 'polygon(50% 50%,0 0,100% 0,100% 0,100% 0,100% 0)' }}
          />
        </span>
      </div>
    );
  };
  
  export default Loader;
  