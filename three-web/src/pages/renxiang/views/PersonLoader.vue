<template>
  <div id="container2">
   
  </div>
</template>

<script>
import PersonLoaderJS from '../js/PersonLoader.js'
import {OBJLoader} from 'three-obj-mtl-loader'
import * as ThreeModule from "three/build/three.module.js"

export default {
  name: 'PersonLoader',
  data: () => ({
    param:{
      "scale": null,
      "arrow":{

      }
    }
  }),
  created () {
    
  },
  mounted(){

    var scene = new THREE.Scene();
            var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
 
   let controls = new OrbitControls(camera);
    controls.addEventListener('change', function () {
        renderer.render(scene, camera);
      });
              var renderer = new THREE.WebGLRenderer();
              renderer.setClearColor(new THREE.Color(0x4e72b8));
              renderer.setSize(window.innerWidth, window.innerHeight);
   
              var axis = new THREE.AxisHelper(20);
              scene.add(axis);
   
              camera.position.x = -30;
              camera.position.y = 40;
              camera.position.z = 30;
              camera.lookAt(scene.position);
              document.getElementById('container2').appendChild(renderer.domElement);



        var loader = new OBJLoader();
        loader.load('../../static/obj/cxfbuilding.obj', function (geometry) {

          console.log(geometry)

          geometry.scale.set(1, 1, 1);

        let mesh = geometry.children[0];

      /*let wireframe = new ThreeModule.WireframeGeometry( mesh.geometry );
      let wireMaterial = new THREE.LineBasicMaterial({
        color: 0xffffff,
        linewidth: 1,
        linecap: 'round', //ignored by WebGLRenderer
        linejoin:  'round' //ignored by WebGLRenderer
      });

      //线段 LineSegments( geometry : 几何体, material : 材质 )
      let line1 = new ThreeModule.LineSegments( wireframe,wireMaterial );
      //深度测试，默认为true，设置为false表示场景中的远处对象不被近处对象遮挡
      line1.material.depthTest = false;
      line1.material.opacity = 0.25;
      line1.material.transparent = true;

          scene.add( line1 );*/
      
        /*var material = new THREE.MeshLambertMaterial({color: 0x5C3A21});
       
        geometry.traverse( function (child) {
          if ( child instanceof THREE.Mesh ) {
            child.material.map = THREE.ImageUtils.loadTexture( '../../static/19.png');
            child.material.needsUpdate = true;
          }
        });
       
        // geometry is a group of children. If a child has one additional child it's probably a mesh
        geometry.children.forEach(function (child) {
          if (child.children.length == 1) {
            if (child.children[0] instanceof THREE.Mesh) {
              child.children[0].material = material;
            }
          }
        });*/

        scene.add(mesh);
      });

      renderer.render(scene, camera)


    //PersonLoaderJS.init(this.param);
    //PersonLoaderJS.animate();
  },
  methods: {
  
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
