<template>
  <div class="loader">
    <div class="loader-icon" />
    <span class="loader-text">Loading</span>
  </div>
</template>

<style scoped>
.loader {
  margin-top: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.loader-icon {
  width: 20px;
  height: 20px;
  border: 5px solid #f3f3f3;
  border-radius: 50%;
  border-top: 5px solid grey;
  animation: spin 1s linear infinite;
  -webkit-animation: spin 1s linear infinite;
}

.loader-text {
  margin-left: 10px;
  font-size: 20px;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@-webkit-keyframes spin {
  0% { -webkit-transform: rotate(0deg); }
  100% { -webkit-transform: rotate(360deg); }
}
</style>