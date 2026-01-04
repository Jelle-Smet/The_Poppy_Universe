<template>
  <div id="app-container">

    <main class="content-area">
      <router-view />
    </main>
  </div>
</template>

<script setup>

</script>

<style>
/* Global Styles (Applied across the entire app) */

/* Basic reset */
body {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  background-color: #ffffff;
}

/* Style to push the content away from the fixed vertical sidebar */
.content-area {
  /* We use margin-left to create space equal to the width of the sidebar. 
     Adjust 220px if your navbar is wider or narrower. */
  margin-left: 220px; 
  padding: 20px;
  min-height: 100vh;
}
</style>