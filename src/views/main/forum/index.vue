<template>
  <div class="container">
    <div class="whole-box">
      <div class="left-box">
        <div class="info-box"></div>
      </div>
      <div class="mid-box">
        <div class="publish-box"></div>
      </div>
      <div class="right-box">
        <div class="news-box"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  data(){
    return {
      emojis: [
        '😀', '😄', '😅', '🤣', '😂', '😉', '😊', '😍', '😘', '😜',
        '😝', '😏', '😒', '🙄', '😔', '😴', '😷', '🤮', '🥵', '😎',
        '😮', '😰', '😭', '😱', '😩', '😡', '💀', '👽', '🤓', '🥳',
        '😺', '😹', '😻', '🤚', '💩', '👍', '👎', '👏', '🙏', '💪'
      ]
    };
  },
  methods: {
    handleEmoji(emoji){
      console.log(emoji);
    }
  }
};
</script>

<style scoped lang="scss">
@import "index";
</style>
