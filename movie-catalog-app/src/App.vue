
<template>
  <div>
    <nav class="menu">
      <router-link to="/">Home</router-link>
      <router-link to="/category/action">Action</router-link>
      <router-link to="/category/science">Science</router-link>
      <router-link to="/category/romance">Romance</router-link>
      

    </nav>

    <router-view />
  </div>
</template>

<script setup>

</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 20px;
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
