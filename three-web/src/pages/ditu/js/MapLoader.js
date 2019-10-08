let MapLoaderJS = {
    scene: null,
    group: null,
    camera: null,
    renderer: null,
    s: 20,

    init: function(){
        let self = this;
        this.scene = new THREE.Scene();
        this.group = new THREE.Group();

        var rayMesh = [];
        var loader = new THREE.FileLoader();
        loader.setResponseType('json');
        var mixer = null;
        loader.load('../../static/1.json',function(dataGDP) {
            loader.load('../../static/0.json',function(data) {
                data.features.forEach(country => {
                    if (country.geometry.type === "Polygon") {
                        let shapesArr = [];
                        let vector3Arr = [];
                        let vector2Arr = [];
                        country.geometry.coordinates[0].forEach(elem =>{
                            vector3Arr.push(new THREE.Vector3(elem[0], elem[1], 0));
                            vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
                        });
                        let geometry = new THREE.Geometry();
                        geometry.vertices = vector3Arr;
                        geometry.verticesNeedUpdate = true;
                        let material = new THREE.LineBasicMaterial({
                            color: 0x666666,
                        });
                        let line = new THREE.LineLoop(geometry, material);
                        line.position.z = 0.01;
                        self.group.add(line);
                        self.group.add(line.clone().translateZ( - 0.8));
                        shapesArr.push(new THREE.Shape(vector2Arr));
                        var meshGeometory = new THREE.ExtrudeGeometry(shapesArr, {
                            amount: -0.8,
                            curveSegments: 2,
                            bevelEnabled: false
                        });
                        let meshMaterial = new THREE.MeshPhongMaterial({
                            color: 0x111111,
                        });
                        let mesh = new THREE.Mesh(meshGeometory, meshMaterial);
                        mesh.name = country.properties.name;
                        dataGDP.forEach((elem, index) => {
                            if (elem.name === mesh.name) {
                                mesh.gdp = elem.gdp[0]
                            }
                        });
                        self.group.add(mesh);
                        rayMesh.push(mesh)
                    }
                    if (country.geometry.type === "MultiPolygon") {
                        let shapesArr = [];
                        country.geometry.coordinates.forEach(area =>{
                            let vector3Arr = [];
                            let vector2Arr = [];
                            area[0].forEach(elem =>{
                                vector3Arr.push(new THREE.Vector3(elem[0], elem[1], 0));
                                vector2Arr.push(new THREE.Vector2(elem[0], elem[1]))
                            });
                            let geometry = new THREE.Geometry();
                            geometry.vertices = vector3Arr;
                            geometry.verticesNeedUpdate = true;
                            let material = new THREE.LineBasicMaterial({
                                color: 0x666666,
                            });
                            let line = new THREE.LineLoop(geometry, material);
                            line.position.z = 0.01;
                            self.group.add(line);
                            self.group.add(line.clone().translateZ( - 0.8));
                            shapesArr.push(new THREE.Shape(vector2Arr))
                        });
                        var meshGeometory = new THREE.ExtrudeGeometry(shapesArr, {
                            amount: -0.8,
                            curveSegments: 2,
                            bevelEnabled: false
                        });
                        let meshMaterial = new THREE.MeshPhongMaterial({
                            color: 0x111111,
                        });
                        let mesh = new THREE.Mesh(meshGeometory, meshMaterial);
                        self.group.add(mesh);
                        rayMesh.push(mesh)
                    }
                });
                self.scene.add(self.group);
                self.group.position.set( - 105, -30, 0);
                var textureLoader = new THREE.TextureLoader();
                var texture = textureLoader.load('../../static/4.png');
                var texture2 = textureLoader.load('../../static/sprite2.png');
                loader.load('../../static/1.json', function(dataGDP) {
                    var clip = new THREE.AnimationClip("default", 20, []);
                    dataGDP.forEach((elem, index) =>{
                        if (index % 1 === 0) {
                            var h = elem.gdp[0] / 300 / 2 + 4;
                            var geometry = new THREE.PlaneGeometry(0.6, h);
                            var material = new THREE.MeshBasicMaterial({
                                map: texture,
                                transparent: true,
                                side: THREE.DoubleSide,
                            });
                            var mesh = new THREE.Mesh(geometry, material);
                            mesh.rotateX( - Math.PI / 2);
                            mesh.position.z = h / 2;
                            var groupMesh = new THREE.Group();
                            groupMesh.add(mesh, mesh.clone().rotateY(Math.PI / 2));
                            var material2 = new THREE.MeshBasicMaterial({
                                map: texture2,
                                transparent: true,
                            });
                            var geometry2 = new THREE.PlaneGeometry(1, 1);
                            var cirMesh = new THREE.Mesh(geometry2, material2);
                            cirMesh.position.z = 0.01;
                            groupMesh.add(cirMesh);
                            groupMesh.name = mesh.uuid;
                            self.group.add(groupMesh);
                            var timeArr = [];
                            for (let i = 0; i < 20; i++) {
                                timeArr.push(i)
                            }
                            var scaleArr = [];
                            for (let i = 0; i < elem.gdp.length; i++) {
                                scaleArr.push(1, 1, elem.gdp[i] / 1000)
                            }
                            var scaleTrack = new THREE.KeyframeTrack(groupMesh.name + '.scale', timeArr, scaleArr);
                            clip.tracks.push(scaleTrack);
                            data.features.forEach(province =>{
                                if (province.properties.name === elem.name) {
                                    groupMesh.position.x = province.properties.cp[0];
                                    groupMesh.position.y = province.properties.cp[1]
                                }
                            })
                        }
                    })
                })
            })
        });
        var point = new THREE.PointLight(0xffffff);
        point.position.set(400, 200, 300);
        this.scene.add(point);
        var ambient = new THREE.AmbientLight(0xffffff, 0.9);
        this.scene.add(ambient);
        var width = window.innerWidth;
        var height = window.innerHeight;
        var k = width / height;
        var s = this.s;
        this.camera = new THREE.OrthographicCamera( - s * k, s * k, s, -s, 1, 1000);
        this.camera.position.set( - 0.81, -58, 84);
        this.camera.lookAt(this.scene.position);
        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        this.renderer.setSize(width, height);
        document.getElementById("container1").appendChild(this.renderer.domElement);
        var clock = new THREE.Clock();
        
        this.render();
        var controls = new THREE.OrbitControls(this.camera);

        window.onresize = function() {
            this.renderer.setSize(window.innerWidth, window.innerHeight);
            k = (window.innerWidth) / (window.innerHeight);
            s = this.s;
            this.camera.left = -s * k;
            this.camera.right = s * k;
            this.camera.top = s;
            this.camera.bottom = -s;
            this.camera.updateProjectionMatrix();
            this.render();
        }

        return {camera:this.camera,rayMesh:rayMesh}
        
    },
    render: function(){
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(this.render.bind(this));
    }
}

export default MapLoaderJS
