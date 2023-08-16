interface IconProps {
  mainColor: string;
  sencondColor: string;
}

const Picture = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="-0.25 -0.25 24 24"
    {...props}
  >
    <path
      fill={props.mainColor}
      d="M23.01 1.469v15.667H.49V1.469A.979.979 0 0 1 1.469.49h20.563a.979.979 0 0 1 .979.979Z"
    />
    <path
      fill={props.sencondColor}
      d="M22.784.868a.963.963 0 0 0-.753-.378H1.468a.979.979 0 0 0-.979.979v15.667h6.026Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M23.01 1.469v15.667H.49V1.469A.979.979 0 0 1 1.469.49h20.563a.979.979 0 0 1 .979.979Z"
    />
    <path
      fill={props.mainColor}
      d="M3.427 17.135s1.958-4.896 4.406-4.896 4.406 2.938 4.406 2.938l2.952-5.06a1.642 1.642 0 0 1 2.887.098l3.464 6.92"
    />
    <path
      fill="#fff"
      d="M23.01 17.135v4.896a.979.979 0 0 1-.979.979H1.468a.979.979 0 0 1-.979-.979v-4.896ZM9.302 3.427a2.448 2.448 0 0 0-2.409 2.056 1.469 1.469 0 1 0-.529 2.84h2.938a2.448 2.448 0 0 0 0-4.896Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M3.427 17.135s1.958-4.896 4.406-4.896 4.406 2.938 4.406 2.938l2.952-5.06a1.642 1.642 0 0 1 2.887.098l3.464 6.92M23.01 17.135v4.896a.979.979 0 0 1-.979.979H1.468a.979.979 0 0 1-.979-.979v-4.896ZM9.302 3.427a2.448 2.448 0 0 0-2.409 2.056 1.469 1.469 0 1 0-.529 2.84h2.938a2.448 2.448 0 0 0 0-4.896Z"
    />
  </svg>
)
export default Picture;
