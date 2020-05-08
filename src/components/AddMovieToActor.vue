<template>
  <div class="col-md-8">
    <nav aria-label="Page navigation example" class="float-left shadow">
      <ul class="pagination">
        <li class="page-item" v-on:click="getMoviesByPage(page-1)">
          <a class="page-link bg-white text-dark border-0" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li class="page-item" v-on:click="getMoviesByPage(page + 1)">
          <a class="page-link bg-white text-dark border-0" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

    <nav aria-label="Page navigation example" class="float-right shadow">
      <ul class="pagination">
        <li class="page-item" v-on:click="getMoviesByAscendingName()">
          <a class="page-link bg-white text-dark border-0" href="#">A-Z</a>
        </li>
        <li class="page-item" v-on:click="getMoviesByDescendingName()">
          <a class="page-link bg-white text-dark border-0" href="#">Z-A</a>
        </li>
        <li class="page-item" v-on:click="getMoviesByAscendingRating()">
          <a class="page-link bg-white text-dark border-0" href="#">Rating ↑</a>
        </li>
        <li class="page-item" v-on:click="getMoviesByDescendingRating()">
          <a class="page-link bg-white text-dark border-0" href="#">Rating ↓</a>
        </li>
      </ul>
    </nav>

    <div class="form-group">
      <input type="email" class="form-control" placeholder="Search" v-model="searchText" />
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
            :src="item.imageUrl == null ? 'https://images-na.ssl-images-amazon.com/images/G/01/author-pages/no-profile-image-placeholder-na._CB484118601_.png' : item.imageUrl"
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
            <a class="ml-3 mr-2" v-on:click="addMovie(item.movieId)">
              <svg
                class="bi bi-plus-circle-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M16 8A8 8 0 110 8a8 8 0 0116 0zM8.5 4a.5.5 0 00-1 0v3.5H4a.5.5 0 000 1h3.5V12a.5.5 0 001 0V8.5H12a.5.5 0 000-1H8.5V4z"
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
  props: ['actorId'],
  data() {
    return {
      movies: [],
      total: "",
      page: "",
      searchText: "",
      query: ""
    };
  },
  mounted() {
    Axios.get("https://localhost:44391/api/movies").then(movies => {
      this.movies = movies.data.data;
      this.total = movies.data.total;
      this.page = movies.data.page;
    });
  },
  methods: {
    getMoviesByPage(page) {
      let url = `https://localhost:44391/api/movies?${this.query}&page=${page}`;
      if (this.searchText != "") {
        url += `&name=${this.searchText}`;
      }
      Axios.get(url).then(movies => {
        this.movies = movies.data.data;
        this.total = movies.data.total;
        this.page = movies.data.page;
        console.table(movies.data.data);
      });
    },
    getMoviesByDescendingName() {
      this.query = "orderBy=Name DESC";
      this.getMoviesByPage(0);
    },
    getMoviesByAscendingName() {
      this.query = "orderBy=Name ASC";
      this.getMoviesByPage(0);
    },
    getMoviesByDescendingRating() {
      this.query = "orderBy=Rating DESC";
      this.getMoviesByPage(0);
    },
    getMoviesByAscendingRating() {
      this.query = "orderBy=Rating ASC";
      this.getMoviesByPage(0);
    },
    addMovie(id){
        Axios.post(`https://localhost:44391/api/movies/${id}/actor`, {actorId: parseInt(this.actorId)});
    }
  },
  watch: {
    searchText() {
      this.getMoviesByPage(0);
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
