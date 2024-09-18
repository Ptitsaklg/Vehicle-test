<template>
  
  <v-navigation-drawer 
    class="sidebar"
    v-model="drawer"
    app
    width="256"
    :permanent=true
    :floating=true
  >
    <div class="sidebar-logo">Demo Test</div>
    <v-list dense class="list">
      <v-list-item :class="['item', $route.path === '/Profile/' ? 'active-item' : '']">
        <router-link to="/Profile/" class="link">
          <div class="icon-wrapper">
            <svg class="custom-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M16.4999 21.1422C17.888 20.8923 18.9884 20.5116 19.5 20C19.5718 19.3531 19.5 18.3333 19.5 18.3333C19.5 17.4493 19.0785 16.6014 18.3284 15.9763C15.9594 14.0022 8.0405 14.0022 5.67154 15.9763C4.9214 16.6014 4.49997 17.4493 4.49997 18.3333C4.49997 18.3333 4.42809 19.3531 4.49997 20C5.01154 20.5116 6.11195 20.8923 7.49997 21.1422" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span :class="['custom-text', $route.path === '/Profile/' ? 'active' : '', 'my-3']">Profile</span>
        </router-link>
      </v-list-item>

      <v-list-item :class="['item', $route.path === '/' ? 'active-item' : '']">
        <router-link to="/" class="link">
          <div class="icon-wrapper">
            <svg class="custom-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 3C7.86589 3 4.18309 6.30734 3.16851 10.2493C3.03085 10.7841 2.48567 11.1061 1.95081 10.9684C1.41596 10.8308 1.09397 10.2856 1.23163 9.75074C2.43727 5.06653 6.81498 1 12 1C18.0752 1 23 5.92487 23 12C23 18.0751 18.0752 23 12 23C6.67716 23 2.23934 19.2203 1.22006 14.1989C1.11019 13.6577 1.45989 13.1299 2.00114 13.02C2.54238 12.9101 3.07022 13.2598 3.18008 13.8011C4.01389 17.9087 7.64707 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z" fill="currentColor"/>
            <circle cx="12" cy="12" r="6" stroke="currentColor" stroke-width="2"/>
            <circle cx="12" cy="12" r="1" stroke="currentColor" stroke-width="2"/>
            </svg>
          </div>
          <span :class="['custom-text', $route.path === '/' ? 'active' : '', 'my-3']">Vechicles</span>
        </router-link>
      </v-list-item>

      <v-list-item :class="['item', $route.path === '/Settings/' ? 'active-item' : '']">
        <router-link to="/Settings/" class="link">
          <div class="icon-wrapper">
            <svg class="custom-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 12V16C3.00036 16.3507 3.09294 16.6952 3.26846 16.9988C3.44398 17.3025 3.69626 17.5546 4 17.73L11 21.73C11.304 21.9055 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9055 13 21.73L20 17.73C20.3037 17.5546 20.556 17.3025 20.7315 16.9988C20.9071 16.6952 20.9996 16.3507 21 16V7.99999C20.9996 7.64927 20.9071 7.3048 20.7315 7.00116C20.556 6.69751 20.3037 6.44536 20 6.26999L13 2.26999C12.696 2.09446 12.3511 2.00204 12 2.00204C11.6489 2.00204 11.304 2.09446 11 2.26999L4 6.26999C3.69626 6.44536 3.44398 6.69751 3.26846 7.00116C3.09294 7.3048 3.00036 7.64927 3 7.99999V9M15 12C15 13.6568 13.6569 15 12 15C10.3431 15 9 13.6568 9 12C9 10.3431 10.3431 8.99999 12 8.99999C13.6569 8.99999 15 10.3431 15 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span :class="['custom-text', $route.path === '/Settings/' ? 'active' : '', 'my-3']">Setting</span>
        </router-link>
      </v-list-item>
    </v-list>
    <img src="../../public/Vector.svg" class="wave" alt="wave"/>
  </v-navigation-drawer>
</template>

<script setup>
const drawer = ref(true)
</script>


<style lang="sass" scoped>
.sidebar
  background: #282828

.sidebar-logo
  color: white
  font-size: 24px
  font-weight: 700
  line-height: 24px
  margin: 30px 0 150px 56px

.list
  display: flex
  flex-direction: column
  gap: 14px

.item
  height: 40px

.active-item
  background-color: rgba(255, 255, 255, 0.20)
  border-left: 2px solid #D90E32
  
.link
  display: flex
  text-decoration: none

.icon-wrapper
  display: flex
  align-items: center
  margin: 0 20px 0 16px

.custom-icon
  color: rgba(255, 255, 255, 0.45)

.custom-text
  color: rgba(255, 255, 255, 0.45)
  font-size: 16px
  font-weight: 500
  line-height: 20px
  
.custom-text.active
  color: #fff

.wave
  position: absolute
  bottom: 0

</style>