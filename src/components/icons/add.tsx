interface IconProps {
  fill: string;
}

const Add = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={18}
    height={18}
    viewBox="-0.5 -0.5 24 24"
    {...props}
  >
    <path d="M20.125 10.822h-7.667V3.155h-1.917v7.667H2.875v1.917h7.667v7.667h1.917v-7.667h7.667v-1.917z" fill={props.fill} />
  </svg>
)
export default Add;