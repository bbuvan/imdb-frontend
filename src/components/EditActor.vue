<template>
  <div class="col-md-8">
    <button type=" button" class="btn mb-4 btn-success" v-on:click="editActor()">Done</button>
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
  props: ["actorId"],
  data() {
    return {
      fullName: "",
      imageUrl: "",
    };
  },
    async mounted(){
        const actor = (await Axios.get(`https://localhost:44391/api/actors/${this.actorId}`)).data;
        Object.assign(this.$data, actor);
    },
  methods: {
    async editActor() {
      await Axios.put(`https://localhost:44391/api/actors/${this.actorId}`, {
        fullName: this.fullName,
        imageUrl: this.imageUrl
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
