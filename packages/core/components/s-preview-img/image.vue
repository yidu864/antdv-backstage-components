<template>
  <b-image mode="slot" :imagesData="imagesData" way="contain" @close="onDestory">
    <template v-slot:showContent>
      <div ref="preview-image"></div>
    </template>
  </b-image>
</template>
<script lang="js">
import BImage from '@idev0/bee-ui/src/components/images/images.vue'
export default {
  name: 'image-preview',
  components: { BImage },
  // computed: {
  //   imagesData() {
  //     return this.$options.attrs.imagesData
  //   }
  // },
  props: {
    imagesData: Array
  },
  mounted() {
    this.triggerBtn()
  },
  methods: {
    triggerBtn() {
      this.$refs['preview-image'] && this.$refs['preview-image'].click()
    },
    onDestory() {
      this.$destroy()
      this.$el.parentElement.removeChild(this.$el)
    }
  }
}
</script>
<style scoped></style>
