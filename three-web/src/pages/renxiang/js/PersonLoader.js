import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader.js"
import * as ThreeModule from "three/build/three.module.js"

let PersonLoaderJS = {
	controls: {
		scene: null,
  	camera: null,
  	renderer: null,
  	light: null,
		vnh: null
	}, 
  param: null,
  mesh: null,
  group: null,
	init: function (param) {
    let self = this;
    this.param = param;
    this.scale = this.param.scale ? this.param.scale : 50;

    this.controls.renderer = new ThreeModule.WebGLRenderer();
    //设置像素比
    this.controls.renderer.setPixelRatio( window.devicePixelRatio );
    this.controls.renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("container2").appendChild( this.controls.renderer.domElement );
    
    //透视摄像机
    this.controls.camera = new ThreeModule.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    this.controls.camera.position.z = 400;
    let controls = new OrbitControls(this.controls.camera);    
    controls.addEventListener('change', function () {
      self.controls.renderer.render(self.controls.scene, self.controls.camera);
    });

    this.controls.scene = new ThreeModule.Scene();

    //点光源
    this.controls.light = new ThreeModule.PointLight();
    this.controls.light.position.set( 200, 100, 150 );
    this.controls.scene.add( this.controls.light );   
    //点光助手 PointLightHelper( light：点光, sphereSize:点光对象的大小, color：颜色 )
    this.controls.scene.add( new ThreeModule.PointLightHelper( this.controls.light, 10 ) );

    /*//网格辅助线 GridHelper( size：网格宽度, divisions：等分数, colorCenterLine：中心线颜色, colorGrid：网格线颜色 )
    let gridHelper = new ThreeModule.GridHelper( 400, 40, 0x0000ff, 0x808080 );
    gridHelper.position.y = - 150;
    gridHelper.position.x = - 150;
    this.controls.scene.add( gridHelper );

    //极坐标格辅助 PolarGridHelper( radius：网格半径, radials：径向线的数量, circles：圆圈数, 
    //divisions：每个圆圈使用的线段数, color1：用于网格元素的第一种颜色, color2：用于网格元素的第二种颜色 )
    let polarGridHelper = new ThreeModule.PolarGridHelper( 200, 16, 8, 64, 0x0000ff, 0x808080 );
    polarGridHelper.position.y = - 150;
    polarGridHelper.position.x = 200;
    this.controls.scene.add( polarGridHelper );*/

    let loader = new GLTFLoader();   
    loader.load( '../../static/gltf/LeePerrySmith.glb', function ( gltf ) {      
      self.mesh = gltf.scene.children[0];

      /*//立方体
      var cubeGeometry = new THREE.BoxGeometry(200,200,200);       
      var cubeMaterial = new THREE.MeshBasicMaterial({color:0xff0000,wireframe:true});
      var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
      cube.position.x = -4;
      cube.position.y = 3;
      cube.position.z = 0;
      self.controls.scene.add(cube);
      self.controls.vnh = new ThreeModule.VertexNormalsHelper( cube, 5, 0x0000ff );
      self.controls.scene.add( self.controls.vnh );      

      //球体
      var sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
      var sphereMaterial = new THREE.MeshBasicMaterial({
        color: 0x7777ff,
        wireframe: true
      });
      var sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);       
      sphere.position.x = 25;
      sphere.position.y = 3;
      sphere.position.z = 0;
      self.controls.scene.add(sphere);
      self.controls.vnh = new ThreeModule.VertexNormalsHelper( sphere, 5, 0x0000ff );
      self.controls.scene.add( self.controls.vnh );*/

      /*self.group = new ThreeModule.Group();      
      //放大模型
      self.group.scale.multiplyScalar( self.scale );
      self.controls.scene.add( self.group );
      self.group.updateMatrixWorld( true );
      self.group.add( self.mesh );*/

      //self.vertexGeometry();
      //self.gridGeometry();
      //self.edgeGeometry();
    });

    window.addEventListener( 'resize', this.onWindowResize, false );
  },
  //网格顶点法线 
  vertexGeometry: function () {
    //VertexNormalsHelper( object : 3d对象, size : 箭头长度, color : 箭头颜色, linewidth : 箭头宽度 )
    this.controls.vnh = new ThreeModule.VertexNormalsHelper( this.mesh, 5 );
    this.controls.scene.add( this.controls.vnh );
    //包围盒辅助工具
    this.controls.scene.add( new ThreeModule.BoxHelper( this.mesh ) );
  },
  //网格几何体
  gridGeometry: function () {    
    let wireframe = new ThreeModule.WireframeGeometry( this.mesh.geometry ); 
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
    line1.position.x = 4;
    //this.group.add( line1 );
    this.controls.scene.add(line1)
    this.controls.scene.add( new ThreeModule.BoxHelper( line1 ) );
  },
  //边缘几何体 
  edgeGeometry: function () {
    //EdgesGeometry( geometry : 几何体, thresholdAngle : 相邻面的法线角度阈值 )
    let edges = new ThreeModule.EdgesGeometry( this.mesh.geometry);
    let edgeMaterial = new THREE.LineBasicMaterial({
      color: 0x0ff000,
      linewidth: 1,
      linecap: 'round', //ignored by WebGLRenderer
      linejoin:  'round' //ignored by WebGLRenderer
    });

    let line2 = new ThreeModule.LineSegments( edges, edgeMaterial);
    line2.material.depthTest = false;
    line2.material.opacity = 0.25;
    line2.material.transparent = true;
    line2.position.x = - 4;
    this.group.add( line2 );
    this.controls.scene.add( new ThreeModule.BoxHelper( line2 ) );

    this.controls.scene.add( new ThreeModule.BoxHelper( this.group ) );
    this.controls.scene.add( new ThreeModule.BoxHelper( this.controls.scene ) );
  },
  onWindowResize: function () {
    this.controls.camera.aspect = window.innerWidth / window.innerHeight;
    //更新摄像机投影矩阵
    this.controls.camera.updateProjectionMatrix();
    this.controls.renderer.setSize( window.innerWidth, window.innerHeight );
  },
  animate: function () {
    requestAnimationFrame( this.animate.bind(this) );

    let time = - performance.now() * 0.0003;
    this.controls.camera.position.x = 400 * Math.cos( time );
    this.controls.camera.position.z = 400 * Math.sin( time );
    this.controls.camera.lookAt( this.controls.scene.position );
    this.controls.light.position.x = Math.sin( time * 1.7 ) * 300;
    this.controls.light.position.y = Math.cos( time * 1.5 ) * 400;
    this.controls.light.position.z = Math.cos( time * 1.3 ) * 300;

    if ( this.controls.vnh ) {
    	this.controls.vnh.update();
    }
    
    this.controls.renderer.render( this.controls.scene, this.controls.camera );
  }
}

export default PersonLoaderJS





