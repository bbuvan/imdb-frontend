<template>
  <div id="app" class="container">
    <div class="col-md-12">
      <div class="row">
        <router-view />

        <div class="col-md-4 float-right" v-if="isLoggedIn">
          <div class="list-group shadow">
            <router-link to="/" class="list-group-item dark text-white">Movies</router-link>
            <router-link to="/movies/add" class="list-group-item dark text-white">Add Movie</router-link>
            <router-link to="/actors" class="list-group-item dark text-white">Actors</router-link>
             <router-link to="/actors/add" class="list-group-item dark text-white">Add Actor</router-link>
            <router-link to="/watchlaters" class="list-group-item dark text-white">Watchlaters</router-link>
            <router-link to="/logout" class="list-group-item dark text-white">Log Out</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      isLoggedIn: "isLoggedIn"
    })
  }
}
</script>

