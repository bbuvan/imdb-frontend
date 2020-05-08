import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';
import Movies from '../components/Movies'
import AddMovie from '../components/AddMovie'
import EditMovie from '../components/EditMovie'
import Actors from '../components/Actors'
import AddActor from '../components/AddActor'
import EditActor from '../components/EditActor'
import ActorDetail from '../components/ActorDetail'
import AddMovieToActor from '../components/AddMovieToActor'
import WatchLaters from '../components/WatchLaters'
import Login from '../components/Login'
import Register from '../components/Register'
Vue.use(Router);

export const router = new Router({
  mode: 'history',
  routes: [
    { path: '/', component: Movies, meta :{title: 'Movies'} },
    { path: '/movies/add', component: AddMovie, meta :{title: 'Add Movie'} },
    { path: '/movies/:movieId/edit', component: EditMovie, meta :{title: 'Edit Movie'}, name: "EditMovie", props: true },
    { path: '/actors', component: Actors, meta :{title: 'Actors'} },
    { path: '/actors/add', component: AddActor, meta :{title: 'Add Actor'} },
    { path: '/actors/:actorId/edit', component: EditActor, meta :{title: 'Edit Actor'}, name: "EditActor", props: true },
    { path: '/actors/:actorId', component: ActorDetail, meta :{title: 'Actor Detail'}, name: "ActorDetail", props: true },
    { path: '/actors/:actorId/addMovie', component: AddMovieToActor, meta :{title: 'Add Movie to Actor'}, name: "AddMovieToActor", props: true },
    { path: '/watchlaters', component: WatchLaters, meta :{title: 'WatchLaters'} },
    { path: '/register', component: Register, meta :{title: 'Register'} },
    { path: '/login', component: Login, meta :{title: 'Login'} },
    { path: '/logout', beforeEnter:(to, from, next)=>{
      store.dispatch('logOut')
      next('/login')
  } },
  ]
});


router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  let token = localStorage.getItem('token');
  let publicPages = ['/login', '/register']
  let isAuthRequired =  !publicPages.includes(to.path);
  store.dispatch('loginLogout');
  if(!token && isAuthRequired){
    return  next('/login');
  }
    
  
  next();
       
})
