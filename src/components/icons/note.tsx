interface IconProps {
  fill: string;
}

const Note = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="-0.25 -0.25 24 24"
    {...props}
  >
    <path
      fill={props.fill}
      d="M23.01 1.469v14.688h-5.875a.979.979 0 0 0-.979.979v5.875H1.468a.979.979 0 0 1-.979-.979V1.469A.979.979 0 0 1 1.468.49h20.563a.979.979 0 0 1 .979.979Z"
    />
    <path
      fill={props.fill}
      d="m23.01 16.156-6.854 6.854v-5.875a.979.979 0 0 1 .979-.979Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M23.01 1.469v14.688h-5.875a.979.979 0 0 0-.979.979v5.875H1.468a.979.979 0 0 1-.979-.979V1.469A.979.979 0 0 1 1.468.49h20.563a.979.979 0 0 1 .979.979Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="m23.01 16.156-6.854 6.854v-5.875a.979.979 0 0 1 .979-.979Z"
    />
  </svg>
)
export default Note;
