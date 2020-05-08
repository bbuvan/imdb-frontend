<template>
  <div class="col-md-8">
      <button type =" button" class="btn mb-4 btn-success" v-on:click="editMovie()">Done</button>
      <div class="col-md-12">
      <button type="button" class="btn m-1 text-white" v-for="genre in currentGenres" v-bind:key="genre.genreId" :style="{backgroundColor: genre.color}" v-on:click="deleteGenre(genre)">{{genre.name}}</button> 
     <button type="button" class="btn m-1 text-black" v-for="actor in currentActors" v-bind:key="actor.actorId" :style="{backgroundColor: '#fff'}" v-on:click="deleteActor(actor)">{{actor.fullName}}</button> 
      </div>
    <div class="col-md-12">
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Name" v-model="name" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Runtime" v-model="runtime" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Year" v-model="releaseYear" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Summary" v-model="summary" />
      </div>
      <div class="form-group">
        <input type="text" class="form-control" placeholder="Image Url" v-model="imageUrl" />
      </div>
        <button type="button" class="btn m-1 text-white" v-for="genre in genres" v-bind:key="genre.genreId" :style="{backgroundColor: genre.color}" v-on:click="addGenre(genre)">{{genre.name}}</button> 
     
    </div>
    <div class="col-md-12 mt-3">
     <nav aria-label="Page navigation example" class="float-left shadow">
      <ul class="pagination">
        <li class="page-item" v-on:click="getActorsByPage(page-1)">
          <a class="page-link bg-white text-dark border-0"  aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>

        <li class="page-item" v-on:click="getActorsByPage(page + 1)">
          <a class="page-link bg-white text-dark border-0"  aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
    </div>
    <div class="form-group">
      <input type="email" class="form-control" placeholder="Search" v-model="searchText" />
    </div>
    <div
      class="card mb-3 shadow dark"
      style=" border-style: solid none; border-width: 1px medium; border-image: none 100% / 1 / 0 stretch;"
      :style="{borderColor: '#fff'}"
      v-for="item in actors"
      v-bind:key="item.actorId"
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
            <a class="ml-3 mr-2" v-on:click="addActor(item)">
              <svg
                class="bi bi-plus-circle-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="white"
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
            <router-link :to="{  name:'ActorDetail', params:{actorId: item.actorId} }">
              <h5 class="card-title font-weight-bold mt-3 text-white">{{item.fullName}}</h5>
            </router-link>
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
  props: ['movieId'],
  data() {
    return {
      name: "",
      runtime: "",
      releaseYear: "",
      summary: "",
      imageUrl: "",
      actors: [],
      currentActors: [],
      genres:[],
      currentGenres: [],
      page: 0,
      searchText: ""
    };
  },
 async mounted() {
     const movie = (await Axios.get(`https://localhost:44391/api/movies/${this.movieId}`)).data;
      Object.assign(this.$data, movie)
      this.releaseYear = this.releaseYear.substring(0,4);
      this.currentGenres = movie.genres;
      this.currentActors = movie.actors;
    Axios.get("https://localhost:44391/api/actors").then(movies => {
      this.actors = movies.data;
    });
    Axios.get("https://localhost:44391/api/genres").then(genres => {
        this.genres = genres.data;
    })
  },
  methods: {
    getActorsByPage(page) {
      let url = `https://localhost:44391/api/actors?page=${page}`;
      if (this.searchText != "") {
        url += `&name=${this.searchText}`;
      }
      Axios.get(url).then(movies => {
        this.actors = movies.data;
      });
      this.page = page;
    },
    async addGenre(genre){
       await Axios.post(`https://localhost:44391/api/movies/${this.movieId}/genre`, {genreId: genre.genreId});
        this.currentGenres.push(genre);
       
    },
    async deleteGenre(genre){
        await Axios.delete(`https://localhost:44391/api/movies/${this.movieId}/genre/${genre.genreId}`);
        const index = this.currentGenres.indexOf(genre);
        this.currentGenres.splice(index, 1);
    },
    async addActor(actor){
        await Axios.post(`https://localhost:44391/api/movies/${this.movieId}/actor`, {actorId: actor.actorId});
        this.currentActors.push(actor);
    },
    async deleteActor(actor){
         await Axios.delete(`https://localhost:44391/api/movies/${this.movieId}/actor/${actor.actorId}`);
        const index = this.currentActors.indexOf(actor);
        this.currentActors.splice(index, 1);
    },
    editMovie(){
        Axios.put(`https://localhost:44391/api/movies/${this.movieId}`, {
            name: this.name,
            releaseYear: new Date(this.releaseYear),
            runtime: parseInt(this.runtime),
            summary: this.summary,
            imageUrl: this.imageUrl
        })
    }
  },
  watch: {
    searchText() {
      this.getActorsByPage(0);
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
