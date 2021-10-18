<template>
  <div id="grad2">
    <div id="app">
      <div class="topnav" id="myTopnav">
        <a class="navbar-brand" href="#">
          <img
            src="/favicon.ico"
            width="30"
            height="30"
            class="d-inline-block align-top"
            alt=""
          />
        </a>
        <a class="navbar-brand" href="/" style="color: white"
          >M E M O R I Z E</a
        >

        <a href="/">Home</a>
        <a href="/flashcardCollections">Flashcards Collections</a>
        <a href="/Goals">Goals</a>
        <a href="/About">About</a>
        <a href="/UsersSignUp">Users</a>
        <a href="javascript:void(0);" class="icon">
          <b-navbar toggleable type="dark">
            <b-navbar-brand href="#"></b-navbar-brand>

            <b-navbar-toggle target="navbar-toggle-collapse">
              <template #default="{ expanded }">
                <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
                <b-icon v-else icon="chevron-bar-down"></b-icon>
              </template>
            </b-navbar-toggle>

            <b-collapse id="navbar-toggle-collapse" is-nav>
              <b-navbar-nav class="ml-auto">
                <b-nav-item href="/">Home</b-nav-item>
                <b-nav-item href="/flashcardCollections">Flashcard Collections</b-nav-item>
                <b-nav-item href="/Goals">Goals</b-nav-item>
                <b-nav-item href="/About">About</b-nav-item>
                <b-nav-item href="/UsersSignUp">Users</b-nav-item>
              </b-navbar-nav>
            </b-collapse>
          </b-navbar>
        </a>
      </div>

      <div id="nav"></div>
      <!-- Render the content of the current page view -->
      <div>
        <router-view />
      </div>
    </div>
    <div class="footer-bottom">
      <footer class="bg-light text-center text-lg-start">
        <!-- Copyright -->
        <div
          class="text-center p-3"
          style="background-color: rgba(0, 0, 0, 0.2)"
        >
          © 2021 Copyright:
          <a class="text-dark"><strong> M E M O R I Z E</strong></a>
        </div>
        <!-- Copyright -->
      </footer>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background-color: #cccccc;
  background-image: linear-gradient(rgb(245, 207, 213), white, rgba(246, 247, 183, 0.856));
  margin-bottom: 0;
}
#grad2 {
  background-color: #cccccc;
  background-image: linear-gradient(
    rgb(245, 207, 213),
    white,
    rgba(246, 247, 183, 0.856)
  );
  margin-bottom: 0;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
}

.nav-item {
  text-align: left;
}

.topnav {
  overflow: hidden;
  background-color: #333;
}

.topnav a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

.topnav a:hover {
  background-color: rgba(221, 221, 221, 0);
  color: rgb(76, 139, 245);
}

.topnav a.active {
  background-color: #04aa6d;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {
    display: none;
  }
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {
    position: relative;
  }
  .topnav.responsive .icon {
    position: absolute;
    right: 0;
    top: 0;
  }
  .topnav.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>
