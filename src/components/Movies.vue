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
          <img :src="item.imageUrl" class="card-img" alt="..." />
        </div>
        <div class="col-md-8">
          <div class="btn-group float-left" role="group" aria-label="Basic example">
            <a v-on:click="rateMovie(item.movieId, 10)" class="ml-3 mr-2">
              <svg
                class="bi bi-heart-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a v-on:click="rateMovie(item.movieId, 5)" class="mr-2">
              <svg
                class="bi bi-heart-half"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                 :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 1.314C3.562-3.248-7.534 4.735 8 15V1.314z"
                  clip-rule="evenodd"
                />
                <path
                  fill-rule="evenodd"
                  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
            <a v-on:click="rateMovie(item.movieId, 0)">
              <svg
                class="bi bi-heart"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 2.748l-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 01.176-.17C12.72-3.042 23.333 4.867 8 15z"
                  clip-rule="evenodd"
                />
              </svg>
            </a>
          </div>
          <div class="btn-group float-right" role="group" aria-label="Basic example">
            <h6
              class="mt-1"
              :style="{color: item.genres.length > 0 ? item.genres[0].color: '#000'}"
            >{{item.rating}}</h6>
            <a v-on:click="addWatchLater(item.movieId)" class="ml-3 mr-2">
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

            <a v-on:click="deleteMovie(item.movieId)">
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

            <router-link :to="{path: `/movies/${item.movieId}/edit`}" class="ml-2">
              <svg
                class="bi bi-hammer"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                :fill="item.genres.length > 0 ? item.genres[0].color: '#000'"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.812 1.952a.5.5 0 01-.312.89c-1.671 0-2.852.596-3.616 1.185L4.857 5.073V6.21a.5.5 0 01-.146.354L3.425 7.853a.5.5 0 01-.708 0L.146 5.274a.5.5 0 010-.706l1.286-1.29a.5.5 0 01.354-.146H2.84C4.505 1.228 6.216.862 7.557 1.04a5.009 5.009 0 012.077.782l.178.129z"
                />
                <path
                  fill-rule="evenodd"
                  d="M6.012 3.5a.5.5 0 01.359.165l9.146 8.646A.5.5 0 0115.5 13L14 14.5a.5.5 0 01-.756-.056L4.598 5.297a.5.5 0 01.048-.65l1-1a.5.5 0 01.366-.147z"
                  clip-rule="evenodd"
                />
              </svg>
            </router-link>
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
  data() {
    return {
      movies: [],
      total: "",
      page: 0,
      searchText: "",
      query: ""
    };
  },
  mounted() {
    Axios.get("https://localhost:44391/api/movies").then(movies => {
      this.movies = movies.data.data;
      this.total = movies.data.total;
      //  this.page = movies.data.page;
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
        this.page = page;
        // this.page = movies.data.page;
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
    async deleteMovie(movieId) {
      await Axios.delete(`https://localhost:44391/api/movies/${movieId}`);
      this.getMoviesByPage(this.page);
    },
    async addWatchLater(movieId) {
      await Axios.post(`https://localhost:44391/api/me/watchlaters/`, {
        movieId: movieId
      });
    },
    async rateMovie(movieId, rating) {
      await Axios.post(`https://localhost:44391/api/movies/${movieId}/rate`, {
        score: rating
      });
      this.getMoviesByPage(this.page);
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
