import { sellerCenterIconProp } from "../../models/IconType"

const SellerCenterIcon:React.FC<sellerCenterIconProp> = ({width, height}) => {
  return (

    <svg
    // className="h-8 w-8 text-orange-500"
    width={width}
    height={height}
    fill="none"
    viewBox="0 0 24 24"
    stroke="#3B82F6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    />
  </svg>
  )
}

export default SellerCenterIcon