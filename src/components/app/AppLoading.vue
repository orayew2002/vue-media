<template>
  <div>
    <svg width="200" height="200">
      <g class="rotate">
        <circle cx="50" cy="90" r="20" fill="#00C0F2"></circle>
        <circle cx="110" cy="90" r="20" fill="#EF4B85"></circle>
        <circle cx="50" cy="150" r="20" fill="#FBB917"></circle>
        <circle cx="110" cy="150" r="20" fill="#ffff"></circle>
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

svg {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Apply animation to the group */
.rotate {
  transform-origin: 80px 120px; /* Center of the SVG canvas */
  animation: rotateAnimation 4s linear infinite; /* Duration and infinite loop */
}
</style>
