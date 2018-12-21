import React from 'react';

const Handle = props => (
  <svg
    {...props}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    viewBox="0 0 95.7 95.8"
  >
    <defs>
      <linearGradient
        id="hextech-handle-idle"
        gradientUnits="userSpaceOnUse"
        x1="47.8707"
        y1="0"
        x2="47.8707"
        y2="95.7529"
      >
        <stop offset="0" stopColor="#A07B2E" />
        <stop offset="0.8" stopColor="#6F5325" />
      </linearGradient>
      <linearGradient
        id="hextech-handle-hover"
        gradientUnits="userSpaceOnUse"
        x1="47.8707"
        y1="0"
        x2="47.8707"
        y2="95.7529"
      >
        <stop stopColor="#ecdfc6" />
        <stop offset="0.8" stopColor="#c89d3e" />
      </linearGradient>
      <linearGradient
        id="hextech-handle-active"
        gradientUnits="userSpaceOnUse"
        x1="47.8707"
        y1="0"
        x2="47.8707"
        y2="95.7529"
      >
        <stop stopColor="#493915" />
        <stop offset="0.8" stopColor="#684e22" />
      </linearGradient>
    </defs>
    <polygon
      fill="url(#hextech-handle-idle)"
      points="47.7,95.8 0,48.1 47.6,0 95.7,47.8 47.7,95.8 "
    />
    <g>
      <polygon
        fill="#1E2328"
        points="15.9,47.8 36.2,27.4 41,32.2 25.5,47.8 40.9,63.5 36.3,68.1"
      />
      <path
        fill="#0E151D"
        d="M36.2,29.6l2.7,2.7L25.5,45.7l-2.1,2.1l2.1,2.1l13.3,13.5L36.3,66L18,47.8L36.2,29.6 M36.2,25.3L13.8,47.8
        l22.5,22.5l6.8-6.8L27.6,47.8l15.6-15.6L36.2,25.3L36.2,25.3z"
      />
    </g>
    <g>
      <polygon
        fill="#1E2328"
        points="54.7,63.9 70.4,48.1 54.8,32.8 60.1,27.4 80.4,47.7 59.5,68.6"
      />
      <path
        fill="#0E151D"
        d="M60.1,29.5l18.2,18.2L59.5,66.5l-2.7-2.6l13.6-13.7l2.1-2.1L70.4,46L56.9,32.8L60.1,29.5 M60.1,25.3l-7,7.1
          l-0.4,0.4l15.7,15.3L52.5,64l7.1,6.7l23-23L60.1,25.3L60.1,25.3z"
      />
    </g>
    <g>
      <polygon fill="#1E2328" points="43.2,75.4 48,70.6 53.4,75.9 48.5,80.8" />
      <path
        fill="#0E151D"
        d="M48,72.7l3.2,3.3l-2.7,2.7l-3.2-3.3L48,72.7 M48,68.4l-6.9,6.9l7.4,7.6l0,0l7-7l-0.2-0.2L48,68.4L48,68.4z"
      />
    </g>
    <g>
      <polygon fill="#1E2328" points="42.7,20.6 48,15.3 53.4,20.7 48,26.1" />
      <path
        fill="#0E151D"
        d="M48,17.4l3.2,3.3L48,23.9l-3.2-3.3L48,17.4 M48,13.2l-7.4,7.4l7.4,7.6l0,0l7.5-7.5l-0.2-0.2L48,13.2L48,13.2z"
      />
    </g>
    <g>
      <rect
        x="41.5"
        y="41.8"
        transform="matrix(-0.7071 0.7071 -0.7071 -0.7071 116.2931 47.964)"
        fill="#1E2328"
        width="13.4"
        height="12.5"
      />
      <path
        fill="#0E151D"
        d="M48.5,41l6.7,6.7l-7.4,7.4l-6.7-6.7L48.5,41 M48.5,36.8L36.9,48.4l10.9,10.9l11.6-11.6L48.5,36.8L48.5,36.8z"
      />
    </g>
  </svg>
);

export default Handle;
