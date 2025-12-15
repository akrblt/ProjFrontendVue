
<template>
  <div>
   

    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
body {
  margin: 0;
  background-color: #979191;
  color: #e5e5e5;
  font-family: Inter, Arial, sans-serif;
  padding: 20px;
}
a {
  color: inherit;
  text-decoration: none;
}
.menu {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
.menu a {
  text-decoration: none;
  font-weight: bold;
  color: black;
}
.menu a.router-link-active{
  color: red;
}
</style>
