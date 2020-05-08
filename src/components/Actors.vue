<template>
  <div class="col-md-8">
    <nav aria-label="Page navigation example" class="float-left shadow">
      <ul class="pagination">
        <li class="page-item" v-on:click="getActorsByPage(page-1)">
          <a class="page-link bg-white text-dark border-0" href="#" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>

        <li class="page-item" v-on:click="getActorsByPage(page + 1)">
          <a class="page-link bg-white text-dark border-0" href="#" aria-label="Next">
            <span aria-hidden="true">&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>

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
            <a v-on:click="deleteActor(item.actorId)">
              <svg
                class="bi bi-x-circle-fill"
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                fill="white"
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
  data() {
    return {
      actors: [],
      page: 0,
      searchText: ""
    };
  },
  mounted() {
    Axios.get("https://localhost:44391/api/actors").then(movies => {
      this.actors = movies.data;
    });
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
    async deleteActor(actorId) {
      await Axios.delete(`https://localhost:44391/api/actors/${actorId}`);
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
