
interface IconProps {
  fill: string;
}

const Drag = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="-0.25 -0.25 24 24"
    {...props}
  >
    <path
      fill={props.fill}
      d="M16.954 11.995V7.589a1.469 1.469 0 0 1 2.938 0v9.792a4.896 4.896 0 0 1-4.896 4.896H11.73a4.903 4.903 0 0 1-4.135-2.273c-1.686-2.656-3.776-7.03-3.776-7.03a1.175 1.175 0 0 1 1.724-1.567l2.601 3.035V4.65a1.469 1.469 0 0 1 2.938 0V2.692a1.469 1.469 0 0 1 2.938 0V4.65a1.469 1.469 0 1 1 2.938 0v7.344Z"
    />
    <path
      fill={props.fill}
      d="M11.079 10.246V4.651a1.469 1.469 0 0 0-2.938 0v6.472a12.791 12.791 0 0 1 2.938-.877Z"
    />
    <path
      fill={props.fill}
      d="M13.527 10.036a13.033 13.033 0 0 1 6.365 1.576V7.589a1.469 1.469 0 0 0-2.938-.01V4.651a1.469 1.469 0 1 0-2.938 0V2.693a1.469 1.469 0 0 0-2.938 0v7.553a14.341 14.341 0 0 1 2.448-.21Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M11.08 4.651V2.693a1.469 1.469 0 0 1 2.938 0v1.958"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M14.018 10.526V4.651a1.469 1.469 0 1 1 2.938 0v2.938"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M16.954 11.995V7.589a1.469 1.469 0 0 1 2.938 0v9.792a4.896 4.896 0 0 1-4.896 4.896H11.73a4.903 4.903 0 0 1-4.135-2.273c-1.686-2.656-3.776-7.03-3.776-7.03a1.175 1.175 0 0 1 1.724-1.567l2.601 3.035V4.65a1.469 1.469 0 0 1 2.938 0v5.875"
    />
  </svg>
)
export default Drag;
