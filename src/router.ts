import {createRouter, createWebHistory} from "vue-router";
import PaletteView from "./components/pages/palettes/PaletteView.vue";
import GradientsView from "./components/pages/gradients/GradientsView.vue";
import GradientView from "./components/pages/gradients/GradientView.vue";
import SocialsView from "./components/pages/social/SocialsView.vue";
import CustomsView from "./components/pages/customs/CustomsView.vue";
import CustomView from "./components/pages/customs/CustomView.vue";
import HexViewer from "./components/pages/viewers/HexViewer.vue";
import RgbViewer from "./components/pages/viewers/RgbViewer.vue";
import HslViewer from "./components/pages/viewers/HslViewer.vue";
import Register from "@/components/pages/account/Register.vue";
import Login from "@/components/pages/account/Login.vue";
import ImageExtractor from "@/components/pages/extractor/ImageExtractor.vue";
import GeneratorPalette from "@/components/pages/generators/GeneratorPalette.vue";

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: PaletteView,
      props: true,
    },
    {
      path: '/palette/:palette',
      component: PaletteView,
      props: true,
    },
    {
      path: '/gradients',
      component: GradientsView,
      props: true,
    },
    {
      path: '/gradient/:gradientId',
      component: GradientView,
      props: true,
    },
    {
      path: '/socials',
      component: SocialsView,
      props: true,
    },
    {
      path: '/customs',
      component: CustomsView,
      props: true,
    },
    {
      path: '/custom/:paletteId',
      component: CustomView,
      props: true,
    },
    {
      path: '/viewer/hex',
      component: HexViewer,
    },
    {
      path: '/viewer/rgb',
      component: RgbViewer,
    },
    {
      path: '/viewer/hsl',
      component: HslViewer,
    },
    {
      path: '/extractor',
      component: ImageExtractor,
    },
    {
      path: '/generator/palette',
      component: GeneratorPalette,
    },
    // Account
    {
      path: '/account/authorize',
      component: Register,
    },
    {
      path: '/account/login',
      component: Login,
    },
  ]
})