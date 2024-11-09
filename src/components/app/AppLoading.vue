<template>
  <div class="svg_container">
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g class="rotate">
        <ellipse cx="30" cy="30" rx="11" ry="11.1058" fill="#00C0F2" />
        <ellipse cx="50" cy="50" rx="11" ry="11.1058" fill="white" />
        <ellipse cx="30" cy="50" rx="11" ry="11.1058" fill="#FBB917" />
        <ellipse cx="50" cy="30" rx="11" ry="11.1058" fill="#EF4B85" />
      </g>
    </svg>
  </div>
</template>

<style scoped>
@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.svg_container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

svg {
  width: 100%;
  height: 100%;
}

/* Apply animation to the group */
.rotate {
  transform-origin: 40px 40px; /* Center of the SVG canvas */
  animation: rotateAnimation 4s linear infinite; /* Duration and infinite loop */
}
</style>
