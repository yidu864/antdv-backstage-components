<template>
  <div class="float-block" :style="{ height }">
    <input type="checkbox" class="float-block-cbx" :id="cbxid" />
    <div class="float-block-text" :style="lineHeight ? `--lh: ${lineHeight}px;` : ''">
      <label
        class="float-block-btn"
        :for="cbxid"
        :style="tuning ? `transform: translateY(${tuning})` : ''"
      ></label>
      {{ text }}
    </div>
  </div>
</template>
<script>
export default {
  name: 'float-text-block',
  props: {
    /** 文字 */
    text: String,
    /**
     * 整体容器高度
     */
    height: {
      type: String,
      default: '85'
    },
    // 样式行高
    lineHeight: [String, Number],
    /**
     * 调整展开按钮上下位置
     */
    tuning: String
  },
  computed: {
    cbxid() {
      return this.guid()
    }
  },
  methods: {
    guid() {
      const S4 = () => (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
      return S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4()
    }
  }
}
</script>
<style lang="scss" scoped>
@mixin expand {
  position: absolute;
  left: 0;
  top: 0;
  max-height: 1000px;
  box-shadow: 3px 10px 10px #00000070;
  z-index: 1;
  background-color: #fff;
  padding-right: 5px;
  &:after {
    content: '';
    display: inline-block;
    position: relative;
    width: 0;
    height: 0;
    // 36 36是收缩按钮的长度
    margin-right: 41px;
  }
  .float-block-btn {
    position: absolute;
    bottom: 3px;
    right: 0;
    transform: none !important;
    // padding-right: 0;
    // display: inline-block;
    // margin-top: 15%;
    z-index: 1;
    &:before {
      display: none;
    }
    &:after {
      content: '收缩';
    }
  }
}

.float-block {
  display: flex;
  // overflow: hidden;
  overflow: visible;
  position: relative;
  &-cbx {
    display: none;
    &:checked + .float-block-text {
      @include expand;
    }
  }
  .float-block-btn {
    font-size: 12px;
    float: right;
    clear: both;
    position: relative;
    padding: 0 6px;
    line-height: inherit;
    border-radius: 4px;
    color: #2978ff;
    cursor: pointer;
    margin-left: 14px;
    &:before {
      content: '...';
      position: absolute;
      left: 0;
      padding: 0 2px;
      transform: translate(-100%, 0);
      background-color: #fff;
      color: #00000070;
    }
    &:after {
      content: '展开';
    }
  }
  .float-block-text {
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: justify;
    position: relative;
    width: 100%;
    // line-height: 1.5;
    max-height: 100%;
    transition: 0.6s all cubic-bezier(0.075, 0.82, 0.165, 1);
    &:before {
      content: '';
      float: right;
      width: 0;
      height: calc(100% - var(--lh, 25px));
    }
    &:after {
      content: '';
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: white;
      // box-shadow: inset calc(100px - 999vw) calc(30px - 999vw) 0 0 #fff;
      // margin-left: -100px;
    }
  }
}
</style>
