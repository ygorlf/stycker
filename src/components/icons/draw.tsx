interface IconProps {
  mainColor: string;
  sencondColor: string;
}

const Draw = (props: IconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={32}
    height={32}
    viewBox="-0.25 -0.25 24 24"
    {...props}
  >
    <path
      fill={props.mainColor}
      d="m22.189 5.513-4.152 4.152-4.152-4.152 4.152-4.152a2.938 2.938 0 0 1 4.152 4.152Z"
    />
    <path
      fill={props.mainColor}
      d="m2.957 16.44 10.93-10.927 4.152 4.152L7.111 20.593Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="m18.009 1.381-.319-.319a1.958 1.958 0 0 0-2.769 0L11.113 4.87"
    />
    <path
      fill={props.sencondColor}
      d="M7.11 20.592.53 23.01l2.428-6.57 4.152 4.152zM22.168 1.42 15.98 7.608l-2.095-2.095 4.152-4.152a2.938 2.938 0 0 1 4.112.029c.01.01.02.02.02.029Z"
    />
    <path
      fill={props.sencondColor}
      d="M2.957 16.44 13.885 5.513l2.095 2.095L5.053 18.536Z"
    />
    <path
      fill="#fff"
      d="M5.053 18.536.607 22.981l-.078.029 2.428-6.57 2.095 2.095z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="m22.189 5.513-4.152 4.152-4.152-4.152 4.152-4.152a2.938 2.938 0 0 1 4.152 4.152Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="m2.957 16.44 10.93-10.927 4.152 4.152L7.111 20.593Z"
    />
    <path
      fill="none"
      stroke="#00303e"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={0.5}
      d="M7.11 20.592.53 23.01l2.428-6.57 4.152 4.152z"
    />
  </svg>
);

export default Draw;
