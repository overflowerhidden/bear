<template>
  <div class="about">
    <h1>
      this is about page!
    </h1>

    <p>
      <button v-permission="['admin', 'editor']">editor button</button>
      <button v-permission="['admin']">admin button</button>
    </p>
  </div>
</template>

<script>
export default {
  name: "about",
};
</script>