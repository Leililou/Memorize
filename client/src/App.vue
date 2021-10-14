<template>
<div  id="grad2" >
<div id="app">
  <div class="topnav" id="myTopnav">
    <a class="navbar-brand" href="#">
      <img src="/favicon.ico" width="30" height="30" class="d-inline-block align-top" alt="">
    </a>
      <a class="navbar-brand" href="/" style="color:white;">M E M O R I Z E</a>

  <a href="/">Home</a>
  <a href="/flashcardCollections">Flashcards Collections</a>
  <a href="/Goals">Goals</a>
  <a href="/About">About</a>
  <a href="javascript:void(0);" class="icon" onclick="myFunction()">
    <i class="fa fa-bars"></i>
  </a>
</div>

  <div id="nav">

  </div>
    <!-- Render the content of the current page view -->
  <div>
    <router-view/>
  </div>
  </div>
  <div class="fixed-bottom">
    <footer class="bg-light text-center text-lg-start">
    <!-- Copyright -->
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
      © 2021 Copyright:
      <a class="text-dark"><strong> M E M O R I S E</strong></a>
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
  background-image: linear-gradient(pink, yellow);
}
  #grad2 {
  background-color: #cccccc;
  background-image: linear-gradient(rgb(245, 207, 213), white, rgba(246, 247, 183, 0.856));
  margin-bottom: 0;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
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
  background-color: #ddd;
  color: black;
}

.topnav a.active {
  background-color: #04AA6D;
  color: white;
}

.topnav .icon {
  display: none;
}

@media screen and (max-width: 600px) {
  .topnav a:not(:first-child) {display: none;}
  .topnav a.icon {
    float: right;
    display: block;
  }
}

@media screen and (max-width: 600px) {
  .topnav.responsive {position: relative;}
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
