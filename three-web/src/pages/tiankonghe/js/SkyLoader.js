import Dat from 'dat.gui'

let WebLoaderJS = {
  domElement: null,
  gui: null,
	controls: {
		scene: null,
  	camera: null,
  	renderer: null,
  	rotationSpeed: 0.03
	},
	init: function() {
	  this.domElement = document.getElementById("container");
	  
	  /*window.addEventListener('onmousewheel', function(event){
	  	alert(event)
	  });*/

		/*//初始加载gui监测器
		this.gui = new Dat.GUI()
		this.gui.add(this.controls, 'rotationSpeed', 0, 0.5)*/

	  this.initMesh()
	},
	initMesh: function(){
	  this.scene = new THREE.Scene() // 场景

	  this.initCubeGeometry()
	  //this.initSkyBox() //立方体天空盒
	  //this.initSphereGeometry() //球体
	  //this.initSphereBox() //球体天空盒

	  this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000) // 相机.视场，长宽比，近面，远面
	  /*this.camera.position.x = -20
	  this.camera.position.y = 40
	  this.camera.position.z = 30
	  this.camera.lookAt(this.scene.position)*/
	  this.camera.position.set(5, 0, 0);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));

      let controls = new OrbitControls(this.camera);

	  this.renderer = new THREE.WebGLRenderer({ antialias: true })// 渲染器
	  this.renderer.setSize(window.innerWidth, window.innerHeight)
	  this.renderer.shadowMapEnabled = true // 开启阴影

	  let axes = new THREE.AxisHelper(20) // 坐标轴

	  /*let planeGeometry = new THREE.PlaneGeometry(60, 20, 10, 10) // 生成平面
	  let planeMaterial = new THREE.MeshLambertMaterial({color: 0xffffff}) // 材质
	  let plane = new THREE.Mesh(planeGeometry, planeMaterial)
	  plane.rotation.x = -0.5 * Math.PI
	  plane.position.x = 0
	  plane.position.y = 0
	  plane.position.z = 0
	  plane.receiveShadow = true

	  let cubeGeometry = new THREE.CubeGeometry(10, 10, 10)
	  let cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000})
	  this.cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
	  this.cube.position.x = -4
	  this.cube.position.y = 3
	  this.cube.position.z = 0
	  this.cube.castShadow = true

	  let spotLight = new THREE.SpotLight(0xffffff)
	  spotLight.position.set(-40, 60, -10)
	  spotLight.castShadow = true
	  
	  this.scene.add(plane) // 向该场景中添加物体
	  this.scene.add(this.cube)
	  this.scene.add(spotLight)*/
	  this.scene.add(axes) // 场景添加坐标轴
	  
	  this.domElement.append(this.renderer.domElement)

	  this.renderScene()
	},
	renderScene: function(){
	  let {controls, cube, scene, camera, renderer} = this
	  /*cube.rotation.x += controls.rotationSpeed
	  cube.rotation.y += controls.rotationSpeed
	  cube.rotation.z += controls.rotationSpeed*/
	  requestAnimationFrame(this.renderScene.bind(this))
	  renderer.render(scene, camera)
	},
	initCubeGeometry: function(){
		//创建并设置大小
		var cubeGeometry = new THREE.BoxGeometry(20,20,20);
		 
		//设置颜色线框显示否
		//var cubeMaterial = new THREE.MeshBasicMaterial({color:0xffffff,wireframe:true});

    //设置盒子材质
    var materialArray = [];
    for (var i = 1; i < 7; i++){
    	materialArray.push( 
	    	new THREE.MeshBasicMaterial({
	        map: THREE.ImageUtils.loadTexture(require('@/images/cube-'+i+'.jpg')),//外部贴图
	        //side: THREE.BackSide,/*内部贴图，镜像翻转*/
	        side: THREE.DoubleSide 
	      })
	    )
    }

    var cubeMaterial = new THREE.MeshFaceMaterial( materialArray );
		var cube = new THREE.Mesh(cubeGeometry,cubeMaterial);
		 
		//设置cube的位置 
		cube.position.x = 0;
		cube.position.y = 0;
		cube.position.z = 0;
		 
		//cube添加到场景中
		this.scene.add(cube);
	},
	initSkyBox: function(){
	    let path = "http://ae01.alicdn.com/kf/";       //设置路径
	    let format = '.jpg';                        //设定格式
	    let urls = [
	       path + 'HTB1GBRUhpooBKNjSZFPq6xa2XXa5'+ format,     
	       path + 'HTB1nqDXm98YBeNkSnb4q6yevFXa0'+ format,
	       path + 'HTB13tL9vkOWBuNjSsppq6xPgpXay' + format,
	       path + 'HTB1VELXvgaTBuNjSszfq6xgfpXac' + format,
	       path + 'HTB1PLbTvf9TBuNjy1zbq6xpepXao' + format,
	       path + 'HTB1bxWzmZuYBuNkSmRyq6AA3pXa8' + format
	    ];
	    let textureCube = new THREE.CubeTextureLoader().load( urls );

	    this.scene.background = textureCube; //作为背景贴图
	},
	initSphereGeometry: function(){
 		let sphereGeometry = new THREE.SphereGeometry(10, 20, 20);
		let sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x7777ff,
      wireframe: true
    });
    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    sphere.position.x = 10;
		sphere.position.y = 5;
		sphere.position.z = 5;
		this.scene.add(sphere);
	},
	initSphereBox: function(){
		let dir = new THREE.Vector3( 0, 2, 0 );

    dir.normalize();

    let origin = new THREE.Vector3( 0, 0, 0 );
    let length = 5;
    let hex = 0xff0000;

    let texture = new THREE.TextureLoader().load(require('@/images/scenery.jpg'));

    let sphereGeometry = new THREE.SphereGeometry(10, 50, 50);
    sphereGeometry.scale(-1, 1, 1);

    let sphereMaterial = new THREE.MeshBasicMaterial({map: texture});

    let sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

    this.scene.add(sphere);
	},
	onResize: function() {		
    // 设置透视摄像机的长宽比
    this.camera.aspect = window.innerWidth / window.innerHeight
    // 摄像机的 position 和 target 是自动更新的，而 fov、aspect、near、far 的修改则需要重新计算投影矩阵（projection matrix）
    this.camera.updateProjectionMatrix()
    // 设置渲染器输出的 canvas 的大小
    this.renderer.setSize(window.innerWidth, window.innerHeight)
	}
}


export default WebLoaderJS





