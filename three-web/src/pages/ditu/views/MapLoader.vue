<template>
  <div id="container1">
    <div id="tan" style="" v-if="bool" :style="{left:x+'px',top:y+'px'}">
      <div>省份&nbsp;:&nbsp;&nbsp;&nbsp;{{ name }}</div>
      <br>
      <div>GDP&nbsp;:&nbsp;&nbsp;&nbsp;{{ gdp }}</div>
    </div>
  </div>
</template>

<script>
import MapLoaderJS from '../js/MapLoader.js'

export default {
  name: 'PersonLoader',
  data: () => ({
    lastMesh: null,
    x: 500,
    y: 500,
    bool: false,
    chooseMesh: null,
    name: '',
    gdp: null,
    obj: null
  }),
  created () {
    
  },
  mounted (){
    this.obj = MapLoaderJS.init();
    document.addEventListener('mousemove', this.choose);
  },
  methods: {
    choose(e) {
      if (this.lastMesh) {
          this.lastMesh.material.color.set(0x111111);
          this.bool = false
      }
      var Sx = e.clientX;
      var Sy = e.clientY;
      this.x = Sx + 20;
      this.y = Sy + 20;
      var x = (Sx / window.innerWidth) * 2 - 1;
      var y = -(Sy / window.innerHeight) * 2 + 1;
      var raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(x, y), this.obj.camera);
      var intersects = raycaster.intersectObjects(this.obj.rayMesh);
      if (intersects.length > 0) {
          this.bool = true;
          this.lastMesh = intersects[0].object;
          intersects[0].object.material.color.set(0x000000);
          this.name = intersects[0].object.name;
          this.gdp = intersects[0].object.gdp
      }
    }
  }
}
</script>

<style lang="scss">
#tan {
    position: absolute;
    z-index: 102;
    color: #00aeef;
    background: rgba(45, 45, 45, 0.6);
    padding: 20px;
    border-radius: 5px;
}

  a {
    color: #ff0;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }

  button {
    cursor: pointer;
    text-transform: uppercase;
  }

  canvas {
    display: block;
  }

  #info {
    position: absolute;
    top: 0px;
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    text-align: center;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    pointer-events: none;
    z-index: 1; /* TODO Solve this in HTML */
  }

  a, button, input, select {
    pointer-events: auto;
  }

  .dg.ac {
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
    z-index: 2 !important; /* TODO Solve this in HTML */
  }
</style>
