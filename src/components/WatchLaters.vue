<template>
  <div class="col-md-8">
    <div
      class="card mb-3 shadow dark"
      style=" border-style: solid none; border-width: 1px medium; border-image: none 100% / 1 / 0 stretch;"
      :style="{borderColor: item.genres.length > 0 ? item.genres[0].color: '#000'}"
      v-for="item in movies"
      v-bind:key="item.movieId"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <img :src="item.imageUrl" class="card-img" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="btn-group float-right" role="group" aria-label="Basic example">
            <h6
              class="mt-1"
              :style="{color: item.genres.length > 0 ? item.genres[0].color: '#000'}"
            >{{item.rating}}</h6>
            <a v-on:click="deleteWatchLater(item.movieId)" class="ml-3">
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
            <a
              href="#"
              class="mr-2 text-white"
              v-for="actor in item.actors"
              v-bind:key="actor.actorId"
            >{{actor.fullName}}</a>
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
  data() {
    return {
      movies: []
    };
  },
  mounted() {
    Axios.get(`https://localhost:44391/api/me/watchlaters/`).then(movies => {
      this.movies = movies.data.data;
      this.total = movies.data.total;
      this.page = movies.data.page;
    });
  },
  methods: {
    async deleteWatchLater(movieId) {
      await Axios.delete(
        `https://localhost:44391/api/me/watchlaters/${movieId}`
      );
      Axios.get(`https://localhost:44391/api/me/watchlaters/`).then(movies => {
        this.movies = movies.data.data;
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
