import * as THREE from 'three'
import axios from '@/js/Axios.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import OrbitControls from "three/examples/js/controls/OrbitControls";

window.THREE = THREE
window.HTTP = axios
window.ElementUI = ElementUI;
window.OrbitControls = OrbitControls;

