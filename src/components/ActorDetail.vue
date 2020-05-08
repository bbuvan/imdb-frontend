<template>
  <div class="col-md-8">
    <router-link
      :to="{  name:'AddMovieToActor', params:{actorId: actorId} }"
      class="mr-2 text-white"
    >Add Movie</router-link>
     <router-link
      :to="{  name:'EditActor', params:{actorId: actorId} }"
      class="mr-2 text-white"
    >Edit Actor</router-link>
    <div
      class="card mb-3 shadow dark"
      style=" border-style: solid none; border-width: 1px medium; border-image: none 100% / 1 / 0 stretch;"
      :style="{borderColor: '#fff'}"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="imageUrl == null ? 'https://images-na.ssl-images-amazon.com/images/G/01/author-pages/no-profile-image-placeholder-na._CB484118601_.png' : imageUrl"
            class="card-img"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title font-weight-bold mt-3 text-white">{{fullName}}</h5>
          </div>
        </div>
      </div>
    </div>

    <div
      class="card mb-3 shadow dark"
      style=" border-style: solid none; border-width: 1px medium; border-image: none 100% / 1 / 0 stretch;"
      :style="{borderColor: item.genres.length > 0 ? item.genres[0].color: '#000'}"
      v-for="item in movies"
      v-bind:key="item.movieId"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img
            :src="item.imageUrl"
            class="card-img"
            alt="..."
          />
        </div>
        <div class="col-md-8">
          <div class="btn-group float-right" role="group" aria-label="Basic example">
            <h6
              class="mt-1"
              :style="{color: item.genres.length > 0 ? item.genres[0].color: '#000'}"
            >{{item.rating}}</h6>

            <a href="#" class="ml-3 mr-2">
              <svg
                class="bi bi-alarm-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.5.5A.5.5 0 016 0h4a.5.5 0 010 1H9v1.07a7.002 7.002 0 013.537 12.26l.817.816a.5.5 0 01-.708.708l-.924-.925A6.967 6.967 0 018 16a6.967 6.967 0 01-3.722-1.07l-.924.924a.5.5 0 01-.708-.708l.817-.816A7.002 7.002 0 017 2.07V1H5.999a.5.5 0 01-.5-.5zM.86 5.387A2.5 2.5 0 114.387 1.86 8.035 8.035 0 00.86 5.387zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 013.527 3.527A2.5 2.5 0 0013.5 1zm-5 4a.5.5 0 00-1 0v3.882l-1.447 2.894a.5.5 0 10.894.448l1.5-3A.5.5 0 008.5 9V5z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>

            <a v-on:click="deleteMovieFromActor(item.movieId)">
              <svg
                class="bi bi-x-circle-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 110 8a8 8 0 0116 0zm-4.146-3.146a.5.5 0 00-.708-.708L8 7.293 4.854 4.146a.5.5 0 10-.708.708L7.293 8l-3.147 3.146a.5.5 0 00.708.708L8 8.707l3.146 3.147a.5.5 0 00.708-.708L8.707 8l3.147-3.146z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>

          <div class="card-body">
            <h5
              class="card-title font-weight-bold mt-3"
              :style="{color: item.genres.length > 0 ? item.genres[0].color: '#000'}"
            >{{item.name}}</h5>
            <p class="card-text text-white font-weight-light">{{item.summary}}</p>
          </div>
          <div class="btn-group ml-4 float-left mb-1 mt-4" role="group" aria-label="Basic example">
            <span class="text-white mr-2 font-weight-bold">Genre:</span>
            <a
              href="#"
              class="mr-3 text-white"
              v-for="genre in item.genres"
              v-bind:key="genre.genreId"
            >{{genre.name}}</a>
          </div>

          <div class="btn-group ml-4 float-left" role="group" aria-label="Basic example">
            <span class="text-white mr-2 font-weight-bold">Stars:</span>
            <router-link
              :to="{  name:'ActorDetail', params:{actorId: actor.actorId} }"
              v-for="actor in item.actors"
              class="mr-2 text-white"
              v-bind:key="actor.actorId"
            >{{actor.fullName}}</router-link>
          </div>
        </div>
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
      movies: []
    };
  },
  async mounted() {
    await this.getMovies();
  },
  methods: {
    async getMovies() {
      const data = (
        await Axios.get(
          `https://localhost:44391/api/actors/${this.actorId}/detail`
        )
      ).data;
      this.fullName = data.fullName;
      this.imageUrl = data.imageUrl;
      this.movies = data.movies.data;
    },

    async deleteMovieFromActor(movieId) {
      await Axios.delete(`https://localhost:44391/api/movies/${movieId}/actor/${this.actorId}`);
      await this.getMovies();
    }
  },
  watch: {
    actorId() {
      Axios.get(
        `https://localhost:44391/api/actors/${this.actorId}/detail`
      ).then(actor => {
        this.fullName = actor.data.fullName;
        this.imageUrl = actor.data.imageUrl;
        this.movies = actor.data.movies.data;
      });
    }
  }
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
