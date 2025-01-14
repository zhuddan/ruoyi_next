<script setup>
import useTagsViewStore from '@/store/modules/tags-view'
import iframeToggle from './IframeToggle/index.vue'

const $route = useRoute()
const tagsViewStore = useTagsViewStore()

onMounted(() => {
  addIframe()
})

const tagsView = useTagsViewStore()

function addIframe() {
  if ($route.meta.link) {
    tagsView.addIframeView($route)
  }
}
</script>

<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <transition name="fade-transform" mode="out-in">
        <keep-alive :include="tagsViewStore.cachedViews">
          <component :is="Component" v-if="!route.meta.link" :key="route.path" />
        </keep-alive>
      </transition>
    </router-view>
    <iframe-toggle />
  </section>
</template>
