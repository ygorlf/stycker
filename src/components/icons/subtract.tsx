interface IconProps {
  fill: string;
}

const Subtract = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="-0.5 -0.5 24 24"
    {...props}
  >
    <path d="M2.875 10.822h17.25v1.917H2.875z" fill={props.fill} />
  </svg>
)
export default Subtract;