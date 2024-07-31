<template>
    <div :style="{height: `${isHeight}px`}" :class="[isWidth, isRadius, isBackground]"></div>
</template>

<script>
export default {
    props: {
      isHeight: { type: String, default: '150'},
      isWidth: { type: String, default: 'w-100'},
      isRadius: { type: String, default: 'br-8'},
      isBackground: { type: String, default: 'bg-light'}
  }
}
</script>