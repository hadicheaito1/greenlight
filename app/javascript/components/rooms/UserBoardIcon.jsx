import React from 'react';

export default function UserBoardIcon({ ...props }) {
  return (
    <svg
      aria-hidden="true"
      data-icon="chalkboard-teacher"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 512"
      strokeWidth="1.5"
      /* eslint-disable-next-line react/jsx-props-no-spreading */
      {...props}
    >
      <path
        fill="currentColor"
        /* eslint-disable-next-line max-len */
        d="M160 320c53.02 0 96-42.98 96-96c0-53.02-42.98-96-96-96C106.1 128 64 170.1 64 224C64 277 106.1 320 160 320zM160 160c35.29 0 64 28.71 64 64S195.3 288 160 288S96 259.3 96 224S124.7 160 160 160zM192 352H128c-70.69 0-128 57.31-128 128c0 17.67 14.33 32 32 32h256c17.67 0 32-14.33 32-32C320 409.3 262.7 352 192 352zM32 480c0-52.94 43.07-96 96-96h64c52.94 0 96 43.06 96 96H32zM592 0h-384C181.5 0 160 21.53 160 48v32C160 88.84 167.2 96 176 96S192 88.84 192 80v-32C192 39.19 199.2 32 208 32h384C600.8 32 608 39.19 608 48v320c0 8.812-7.172 16-16 16H576v-48C576 309.5 554.5 288 528 288h-96C405.5 288 384 309.5 384 336V384h-32c-8.844 0-16 7.156-16 16S343.2 416 352 416h240C618.5 416 640 394.5 640 368v-320C640 21.53 618.5 0 592 0zM544 384h-128v-48c0-8.812 7.172-16 16-16h96c8.828 0 16 7.188 16 16V384z"
      />
    </svg>
  );
}
