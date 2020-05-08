<template>
  <div class="col-md-8">
    <button type=" button" class="btn mb-4 btn-success" v-on:click="addActor()">Done</button>
    <div class="col-md-12">
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Full Name" v-model="fullName" />
      </div>
      <div class="form-group">
        <input type="email" class="form-control" placeholder="Image Url" v-model="imageUrl" />
      </div>
    </div>
  </div>
</template>

<script>
import Axios from "axios";
export default {
  name: "App",
  data() {
    return {
      fullName: "",
      imageUrl: "",
    };
  },

  methods: {
    async addActor() {
      await Axios.post(`https://localhost:44391/api/actors`, {
        fullName: this.fullName
      });
    }
  },
};
</script>

<style>
#app,
html,
body {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  background-color: #171717 !important;
}

.shadow {
  box-shadow: 0 0 15px 0 #000 !important;
}

.dark {
  background-color: #171717 !important;
}
</style>
