<template>
  <div id="app">
    <nav class="nav-extended">
      <div class="nav-wrapper teal darken-1">
        <router-link
          to="/"
          class="brand-logo center"
        >
          <i class="medium material-icons">widgets</i>letterGen
        </router-link>
      </div>
      <div class="col s12 center teal darken-2">
        <router-link 
          active-class="active"
          to="/"
          class="breadcrumb"
          exact
        >
          Выбор регионов
        </router-link>
        <router-link 
          active-class="active"
          to="/news" 
          class="breadcrumb"
        >
          Выбор новостей
        </router-link>
        <router-link 
          active-class="active"
          to="/results" 
          class="breadcrumb"
        >
          Редактирование
        </router-link>
      </div>
    </nav>
    <main class="container">
      <router-view />
    </main>
  </div>
</template>

<script>

export default {
  name: 'App'
}
</script>

<style>
  main {
    padding-top: 40px;
    padding-bottom: 40px;
  }

  h5 {
    padding-bottom: 20px;
    display: block;
  }

  .breadcrumb:last-child {
    color: rgba(255, 255, 255, 0.7);
  }

  .breadcrumb:hover, .breadcrumb.active {
    color: #fff;
    transition: color 300ms;
  }
</style>
