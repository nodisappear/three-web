<template>
  <div id="app">
    <el-row>
      <el-button @click="getPath('renxiang')" type="primary">人像</el-button>
      <el-button @click="getPath('tiankonghe')" type="primary">天空盒</el-button>
    </el-row>
  </div>
</template>

<script>
    export default {
        name: 'app',
        methods:{
            getPath(path){
                location.href += path + '.html';
            } 
        }
    }
</script>

<style>
    html, body {
        height: 100%;
    }

    * {
        box-sizing: border-box;
    }

    #app {
        height: 100%;
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    button{
        display:inline-block;
    }
</style>
