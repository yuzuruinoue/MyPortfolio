var uniforms;
var plane;
var banMesh;

function init() {
  var clock = new THREE.Clock();
  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.x = 0;
  camera.position.y = 0;
  camera.position.z = 20;
  camera.lookAt(scene.position);

  //var trackballControls=new THREE.TrackballControls(camera);
// console.log("aaaaaa");
  var renderer = new THREE.WebGLRenderer();
  // renderer.setClearColor(new THREE.Color(0x888888));
  renderer.setClearColor(new THREE.Color(0x000000));
  // renderer.setClearColor(new THREE.Color(0x2222ff));
  renderer.setSize(window.innerWidth, window.innerHeight);

  var ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  var directionalLight=new THREE.DirectionalLight(0xffffff,1);
  directionalLight.position.z=5;
  scene.add(directionalLight);

//lightテストキューブ
  // var bgeo=new THREE.BoxGeometry(1,1,1);
  // var bmat=new THREE.MeshStandardMaterial({
  //   side:THREE.DoubleSide
  // });
  // var bmesh=new THREE.Mesh(bgeo,bmat);
  // bmesh.rotation.x=0.6;
  // bmesh.rotation.y=0.6;
  // bmesh.position.z=5;
  // scene.add(bmesh);

//main WB
  var loader = new THREE.TextureLoader();
  var texture = THREE.ImageUtils.loadTexture('./img/WB0.jpg',null,function(){renderer.render(scene,camera);});
  uniforms = {
    u_time: {
      type: "f",
      value: 1.0
    },
    u_resolution: {
      type: "v2",
      value: new THREE.Vector2(window.innerWidth,window.innerHeight)
    },
    u_mouse: {
      type: "v2",
      value: new THREE.Vector2()
    },
    u_count: {
      type: "f",
      value: 0.0
    },
    uTex:{
      type:"t",
      value:texture
    }

  };
  // var geom = new THREE.PlaneGeometry(5, 5, 10, 10);
  // var geom = new THREE.BoxGeometry(32.3, 1, 16.4);
  var geom = new THREE.BoxGeometry(32.3, 0.5, 15);
  //texture
  var material = new THREE.ShaderMaterial({
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent,
    uniforms: uniforms,
    side: THREE.DoubleSide
  });
  plane = new THREE.Mesh(geom, material);
  plane.rotation.x = 1.0 / 2.0 * Math.PI;
  plane.position.x = 0;
  plane.position.y = 0.64;
  plane.position.z = 0;
  scene.add(plane);

  //penoki上
  var tex1=THREE.ImageUtils.loadTexture('./img/penoki4.jpg');
  var penokiGeom=new THREE.PlaneGeometry(32,32*28/1886,1,1);
  var uv1=[
    new THREE.Vector2(0,0.026),
    new THREE.Vector2(0,0),
    new THREE.Vector2(1.0,0.026)
  ]
  var uv2=[
    new THREE.Vector2(0,0),
    new THREE.Vector2(1.0,0),
    new THREE.Vector2(1.0,0.026)
  ]
  penokiGeom.faceVertexUvs[0][0]=uv1;
  penokiGeom.faceVertexUvs[0][1]=uv2;

  // penokiGeom.uvsNeedUpdate=true;
  var penokiPlane1=new THREE.Mesh(
    penokiGeom,
    new THREE.MeshStandardMaterial({
      map:tex1
      // side:THREE.DoubleSide
      // wireframe:true
    })
  );
  penokiPlane1.position.x=0;
  penokiPlane1.position.y=-6.4;
  penokiPlane1.position.z=3;
  // penokiPlane1.rotation.x=-1.0/4.0*Math.PI;
  scene.add(penokiPlane1);

  //penokiPlane2下
  var tex2=THREE.ImageUtils.loadTexture('./img/penoki5.jpg');
  var penokiGeom2=new THREE.PlaneGeometry(32,32*28/1886,1,1);
  var uv3=[
    new THREE.Vector2(0,0.026),
    new THREE.Vector2(0,0),
    new THREE.Vector2(1.0,0.026)
  ]
  var uv4=[
    new THREE.Vector2(0,0),
    new THREE.Vector2(1.0,0),
    new THREE.Vector2(1.0,0.026)
  ]
  penokiGeom2.faceVertexUvs[0][0]=uv1;
  penokiGeom2.faceVertexUvs[0][1]=uv2;

  // penokiGeom.uvsNeedUpdate=true;
  var penokiPlane2=new THREE.Mesh(
    penokiGeom2,
    new THREE.MeshStandardMaterial({
      map:tex2
      // side:THREE.DoubleSide
      // wireframe:true
    })
  );
  penokiPlane2.position.x=0;
  penokiPlane2.position.y=-6.65;
  penokiPlane2.position.z=3;
  penokiPlane2.scale.y=0.9;
  // penokiPlane1.rotation.x=-1.0/4.0*Math.PI;
  scene.add(penokiPlane2);

  //赤ペン
  var redPenHandle=new THREE.Mesh(
    new THREE.PlaneGeometry(1,0.2,1,1),
    new THREE.MeshStandardMaterial({
    })
  );

  var redPenCap=new THREE.Mesh(
    new THREE.PlaneGeometry(0.2,0.2,1,1),
    new THREE.MeshStandardMaterial({color:0xff0000})
  );
  redPenCap.position.x=-0.4;

  var redPen=new THREE.Group();
  redPen.add(redPenHandle);
  redPen.add(redPenCap);
  scene.add(redPen);
  redPen.position.x=3;
  redPen.position.y=-6.3;
  redPen.position.z=3;
  redPen.scale.x=1.3;

  //青ペン
  var bluePenHandle=new THREE.Mesh(
    new THREE.PlaneGeometry(1,0.2,1,1),
    new THREE.MeshStandardMaterial({
    })
  );

  var bluePenCap=new THREE.Mesh(
    new THREE.PlaneGeometry(0.2,0.2,1,1),
    new THREE.MeshStandardMaterial({color:0x0000ff})
  );
  bluePenCap.position.x=-0.4;

  var bluePen=new THREE.Group();
  bluePen.add(bluePenHandle);
  bluePen.add(bluePenCap);
  scene.add(bluePen);
  bluePen.position.x=5;
  bluePen.position.y=-6.3;
  bluePen.position.z=3;
  bluePen.scale.x=1.3;


  //イレーザー
  var eraserMain=new THREE.Mesh(
    new THREE.BoxGeometry(1,0.2,0.4),
    new THREE.MeshStandardMaterial({
    })
  );

  var eraserHandle=new THREE.Mesh(
    new THREE.BoxGeometry(1,0.2,0.4),
    new THREE.MeshStandardMaterial({color:0x0044ff})
  );
  eraserHandle.position.y=0.2;

  var eraser=new THREE.Group();
  eraser.add(eraserHandle);
  eraser.add(eraserMain);
  scene.add(eraser);
  eraser.position.x=7;
  eraser.position.y=-6.1;
  eraser.position.z=3.4;
  eraser.scale.x=1.3;


  //擬音
  var banTex=THREE.ImageUtils.loadTexture('./img/ban01.png');
  banMesh=new THREE.Mesh(
    new THREE.PlaneGeometry(1,1,1,1),
    new THREE.MeshBasicMaterial({
      map:banTex,
      transparent:true,
      opacity:0
    })
  );
  banMesh.position.z=4;
  banMesh.position.x=4;
  banMesh.rotation.z=-1.0/10.0*Math.PI;

  banMesh.scale.x=3;
  banMesh.scale.y=3;

  scene.add(banMesh);




  document.getElementById("WebGL-output").appendChild(renderer.domElement);
  document.onmousemove = function(e) {
    uniforms.u_mouse.value.x = e.pageX
    uniforms.u_mouse.value.y = e.pageY
  }
  onWindowResize();
  window.addEventListener('resize', onWindowResize, false);

  render();

  var step = 0;

  function onWindowResize(event) {
    renderer.setSize(window.innerWidth, window.innerHeight);
    uniforms.u_resolution.value.x = renderer.domElement.width;
    uniforms.u_resolution.value.y = renderer.domElement.height;
  }

  function render() {
    // plane.rotation.x+=0.01;
    // uniforms.step.value=step;
    //var delta=clock.getDelta();
    uniforms.u_time.value += 0.05;
    //trackballControls.update(delta);
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }
}
window.onload = init;

var PatternChange = function() {
  uniforms.u_count.value++;
}

// barba
var rotateSpeed=-0.06;
var overRotateSpeed=1.0 / 100.0 * 2.0 * Math.PI*8.0;
//本回転
function PlaneRotate() {
  return new Promise(resolve => {
    setTimeout(() => {
      // rotateSpeed+=0.001;
      plane.rotation.x += 1.0 / 100.0 * 2.0 * Math.PI*9.0;
      resolve();
    }, 20);
  })
}

//助走
function InversePlaneRotate() {
  return new Promise(resolve => {
    setTimeout(() => {
      rotateSpeed+=0.002;
      plane.rotation.x += rotateSpeed;
      resolve();
    }, 20);
  })
}

//オーバーシュート
function StopPlaneRotate() {
  return new Promise(resolve => {
    setTimeout(() => {
      overRotateSpeed-=0.03;
      plane.rotation.x += overRotateSpeed;
      resolve();
    }, 20);
  })
}


//擬音表示
function BanDisplay() {
  return new Promise(resolve => {
    setTimeout(() => {
      banMesh.material.opacity-=0.1;
      resolve();
    }, 60);
  })
}


barba.init({
  transitions: [{
    async leave() {
      //逆回転
      for (var i = 0.0; i < 30.0; i += 1.0) {
        //planerotateが終わるまで待機
        await InversePlaneRotate();
      }

      //回転
      for (var i = 0.0; i < 30.0; i += 1.0) {
        //plenerotateが終わるまで待機
        await PlaneRotate();
      }

      //逆回転
      for (var i = 0.0; i < 25.0; i += 1.0) {
        //planerotateが終わるまで待機
        await StopPlaneRotate();
      }


      //擬音
      banMesh.material.opacity=1;
      for (var i = 0.0; i < 10.0; i += 1.0) {
        //planerotateが終わるまで待機
        await BanDisplay();
      }


      //アニメーション前の処理
      await new Promise((resolve) => {
        //1000ミリ秒後にresolveを返して次に進む
        plane.rotation.x=1.0 / 2.0 * Math.PI;
        return setTimeout(resolve, 1000);
      });
    },
    afterEnter() {
      //遷移後の処理
      rotateSpeed=-0.06;
      overRotateSpeed=1.0 / 100.0 * 2.0 * Math.PI*8.0;

    }
  }]
});
