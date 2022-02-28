<template>
  <div class="camera_outer">
    <video id="videoCamera"
           :width="videoWidth"
           :height="videoHeight"
           autoplay></video>
    <canvas id="canvasCamera"
            style="display:none;"
            :width="videoWidth"
            :height="videoHeight"></canvas>
    <el-dialog title="预览照片"
               :visible.sync="dialogVisible">
      <div v-if="imgSrc"
           class="img_bg_camera">
        <img :src="imgSrc"
             alt
             class="tx_img" />
      </div>
      <el-button @click="uploadFaceInfo()">上传人脸信息</el-button>
    </el-dialog>
    <div class="vButton">
      <span v-if="camera">
        <el-button @click="stopNavigator()">关闭摄像头</el-button>
        <el-button @click="setImage()">拍照</el-button>
      </span>
      <span v-else>
        <el-button @click="getCompetence()">打开摄像头</el-button>
      </span>
    </div>
  </div>
</template>
<script>
import { detectFaceInfo, createFaceSet } from '@/api/face/face.js';
export default {
  data () {
    return {
      videoWidth: 540,
      videoHeight: 540,
      imgSrc: "",
      thisCancas: null,
      thisContext: null,
      thisVideo: null,
      openVideo: false,
      camera: false,
      dialogVisible: false
    };
  },
  methods: {
    // 调用权限（打开摄像头功能）
    getCompetence () {
      var _this = this;
      _this.thisCancas = document.getElementById("canvasCamera");
      _this.thisContext = this.thisCancas.getContext("2d");
      _this.thisVideo = document.getElementById("videoCamera");
      _this.thisVideo.style.display = 'block';
      // 获取媒体属性，旧版本浏览器可能不支持mediaDevices，我们首先设置一个空对象
      if (navigator.mediaDevices === undefined) {
        navigator.mediaDevices = {};
      }
      // 一些浏览器实现了部分mediaDevices，我们不能只分配一个对象
      // 使用getUserMedia，因为它会覆盖现有的属性。
      // 这里，如果缺少getUserMedia属性，就添加它。
      if (navigator.mediaDevices.getUserMedia === undefined) {
        navigator.mediaDevices.getUserMedia = function (constraints) {
          // 首先获取现存的getUserMedia(如果存在)
          var getUserMedia =
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.getUserMedia;
          // 有些浏览器不支持，会返回错误信息
          // 保持接口一致
          if (!getUserMedia) {//不存在则报错
            return Promise.reject(
              new Error("getUserMedia is not implemented in this browser")
            );
          }
          // 否则，使用Promise将调用包装到旧的navigator.getUserMedia
          return new Promise(function (resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
          });
        };
      }
      var constraints = {
        audio: false,
        video: {
          width: this.videoWidth,
          height: this.videoHeight,
          transform: "scaleX(-1)"
        }
      };
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
          // 旧的浏览器可能没有srcObject
          if ("srcObject" in _this.thisVideo) {
            _this.thisVideo.srcObject = stream;
          } else {
            // 避免在新的浏览器中使用它，因为它正在被弃用。
            _this.thisVideo.src = window.URL.createObjectURL(stream);
          }
          _this.thisVideo.onloadedmetadata = function (e) {
            _this.thisVideo.play();
          };
          _this.camera = true;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  绘制图片（拍照功能）
    setImage () {
      var _this = this;
      // canvas画图
      _this.thisContext.drawImage(
        _this.thisVideo,
        0,
        0,
        _this.videoWidth,
        _this.videoHeight
      );
      // 获取图片base64链接
      var image = this.thisCancas.toDataURL("image/png");
      console.log(image);
      _this.imgSrc = image;//赋值并预览图片
      this.dialogVisible = true;
    },
    dataURLtoBlob (dataurl) {
      var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new Blob([u8arr], {
        type: mime
      });
    },
    //上传人脸信息
    uploadFaceInfo () {
      this.$notify.info({
        title: '消息',
        message: '人脸信息录入中，请稍候'
      })
      let face = new FormData()
      face.append('image_file', this.dataURLtoBlob(this.imgSrc))
      let _this = this
      //解析faceToken
      detectFaceInfo(face)
        .then(function (res) {
          //将faceToken存入以学号为标识的人脸集
          createFaceSet(_this.$store.getters.userId, res.data.faces[0].face_token)
            .then((res) => _this.$notify({
              title: '成功',
              message: '您已成功录入人脸信息',
              type: 'success'
            }))
            .catch((error) => _this.$notify.error({
              title: '错误',
              message: '录入人脸信息失败' + error
            }))
        })
        .catch((error) => {
          _this.$notify.error({
            title: '错误',
            message: '录入人脸信息失败' + error
          })
        });
    },
    // 关闭摄像头
    stopNavigator () {
      this.thisVideo.srcObject.getTracks()[0].stop();
      this.camera = false;
    },
    // base64转文件，此处没用到
    dataURLtoFile (dataurl, filename) {
      var arr = dataurl.split(",");
      var mime = arr[0].match(/:(.*?);/)[1];
      var bstr = atob(arr[1]);
      var n = bstr.length;
      var u8arr = new Uint8Array(n);
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], filename, { type: mime });
    },
  }
};
</script>

<style>
.camera_outer {
  margin: 16 16 16 16;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>