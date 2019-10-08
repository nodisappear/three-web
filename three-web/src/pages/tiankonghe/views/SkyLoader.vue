<template>
	<div id="container">
   
  </div>
</template>

<script>

import SkyLoaderJs from '../js/SkyLoader.js'

export default {
	name: 'SkyLoader',
  data: () => ({
  	
  }),
  created () {
    this.$nextTick(() => {
    	SkyLoaderJs.init()    
    })
  },
  mounted(){
    
  },
  methods: {
    
  }
}
</script>

<style lang="scss" scoped>
  button{
    color: $theme-color;
    width: 100%;
  }
  #container canvas{
    vertical-align: top; /*canvas铺满屏幕时不出现滚动条*/
  }
</style>
