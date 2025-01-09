<script setup lang="ts">
import {onMounted} from "vue";
import { useAuth0 } from '@auth0/auth0-vue';


const { loginWithRedirect, logout, user, isAuthenticated } = useAuth0();

const login = () => {
  loginWithRedirect();
}

const handleLogout = () => {
  logout({ logoutParams: { returnTo: window.location.origin } });
}

onMounted(() => {
  const dropdownLI = document.querySelectorAll('.dropdown-trigger');

  dropdownLI.forEach((el) => {
    const target = document.querySelector('#' + el.getAttribute('data-trigger')) as HTMLElement;

    if (!target) {
      return
    }

    el.addEventListener('mouseover', () => {
      const x = el.getBoundingClientRect().x + el.getBoundingClientRect().width;
      const y = el.getBoundingClientRect().y + el.getBoundingClientRect().height;

      target.style.display = 'flex';

      target.style.top = `${y}px`;
      target.style.left = `${x - el.getBoundingClientRect().width - (target.getBoundingClientRect().width - el.getBoundingClientRect().width)}px`;
      target.style.height = 'fit-content';
      target.style.width = `200px`;
    });
    el.addEventListener('mouseleave', () => {
      target.style.display = 'none';
    });

    target.addEventListener('mouseover', () => {
      target.style.display = 'flex';
    });
    target.addEventListener('mouseleave', () => {
      target.style.display = 'none';
    });
  });
  
  if (isAuthenticated) {
    console.log('user')
    console.log(user)
  }
})
</script>

<template>
  <div>
    <nav>
      <ul>
        <li class="notHover">
          <a class="title">Material-Colors.com</a>
        </li>
        <li class="notHover">
          <a class="dropdown-trigger" data-trigger="dropdown-palette">Color Palettes <span class="fs09">▼</span></a>
        </li>
        <li>
          <router-link :to="{ path: '/gradients' }">Gradients</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/socials' }">Social Colors</router-link>
        </li>
        <li>
          <router-link :to="{ path: '/customs' }">Custom Palettes</router-link>
        </li>
        <li style="margin-right: 2vw;">
          <router-link :to="{ path: '/extractor' }"><span style="position: relative;">Image Extractor <span class="chip chip--little">NEW</span></span></router-link>
        </li>
        <li class="notHover">
          <a class="dropdown-trigger" data-trigger="dropdown-viewer">Color Viewer <span class="fs09">▼</span></a>
        </li>
        <li class="notHover">
          <a class="dropdown-trigger" data-trigger="dropdown-generators"><span style="position: relative;">Generators <span class="chip chip--little">NEW</span></span><span class="fs09">▼</span></a>
        </li>
        <li>
          <a href="" target="_blank">Blacky</a>
        </li>
      </ul>
      <button @click="handleLogout" style="opacity: 0">Log out</button>
      <button @click="login" style="opacity: 0">Log in</button>
    </nav>

    <ul class="dropdown-content" id="dropdown-palette">
      <li><router-link :to="{ path: '/palette/material' }">Material</router-link></li>
      <li><router-link :to="{ path: '/palette/tailwind' }">Tailwind</router-link></li>
      <li><router-link :to="{ path: '/palette/flat' }">Flat</router-link></li>
      <li><router-link :to="{ path: '/palette/bootstrap' }">Bootstrap</router-link></li>
    </ul>
    <ul class="dropdown-content" id="dropdown-viewer">
      <li><router-link :to="{ path: '/viewer/hex' }">HEX Viewer</router-link></li>
      <li><router-link :to="{ path: '/viewer/rgb' }">RGB Viewer</router-link></li>
      <li><router-link :to="{ path: '/viewer/hsl' }">HSL Viewer</router-link></li>
    </ul>
    <ul class="dropdown-content" id="dropdown-generators">
      <li><router-link :to="{ path: '/generator/palette' }">Palette Generator</router-link></li>
    </ul>
    <ul class="dropdown-content" id="dropdown-account">
      <li class="divider">
        <span>&nbsp;</span>
        <p>Your submissions</p>
        <span>&nbsp;</span>
      </li>
      <li><a href="{{ route('account.my_gradients') }}" class="roboto fs09">My Gradients</a></li>

      <li class="divider">
        <span>&nbsp;</span>
        <p>Create</p>
        <span>&nbsp;</span>
      </li>
      <li><a href="{{ route('account.create_gradient') }}" class="roboto fs09">Create Gradient</a></li>
      <li><a href="{{ route('account.create_custom') }}" class="roboto fs09">Create Palette</a></li>

      <li class="divider">
        <span>&nbsp;</span>
        <p>Extras</p>
        <span>&nbsp;</span>
      </li>
      <li><a href="{{ route('account.favs') }}" class="roboto fs09">My Favorites</a></li>
      <li><a href="{{ route('account.settings') }}" class="roboto fs09">Settings</a></li>
      <li class="red mb-1">
        <form method="post" action="{{ route('logout') }}" class="ns_form">
          @csrf
          <button type="submit" class="roboto fs09 ns_btn red">Logout</button>
        </form>
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
nav {
  position: relative;
  display: flex;
  justify-content: space-between;
  z-index: 9999;

  ul {
    margin: 0 2em;
    display: flex;
    align-items: center;
    list-style-type: none;

    li {
      margin: 1em;
      display: flex;
      align-items: center;
      position: relative;

      &:not(&.notHover)::before, &:not(&.notHover)::after{
        content: '';
        position: absolute;
        height: 48%;
        transform: scaleY(0) skew(-15deg);
        width: 100%;
        @include gradientAnim;

        z-index: 4;

        transition: transform 0.2s ease-in-out;
      }
      &:not(&.notHover)::before{
        top: -10%;
        transform-origin: top;
      }
      &:not(&.notHover)::after{
        bottom: 20%;
        transform-origin: bottom;
      }
      &:hover:not(&.notHover)::before, &:hover:not(&.notHover)::after{
        transform: scaleY(1) skew(-15deg);
      }

      a {
        padding: 0.1em 0.5em 1em 0.5em;
        white-space: nowrap;
        color: #fff;
        cursor: pointer;
        z-index: 5;

        transition: color 0.2s ease-in-out;

        &.title {
          font-size: 1.5em;
          font-weight: 900;
        }
      }
    }
  }
}
ul.dropdown-content {
  position: absolute;
  left: 0;
  width: 200px;
  display: none;
  justify-content: space-evenly;
  flex-direction: column;
  background: #eee;
  list-style-type: none;
  z-index: 99999;

  li {
    position: relative;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background: #eee;
    color: #000;
    cursor: pointer;
    transition: background 0.4s ease-out, color 0.4s ease-out;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 0;
      transition: width 0.15s ease-in-out;

      background: $alternateColor;
    }
    &.red::before{
      background: #ef5350;
    }
    &:hover {
      &::before {
        width: 12%;
      }
      a, button {
        &.red{
          color: #ef5350;
        }
        font-weight: 600;
        transform: translateX(10px);
      }
    }

    a, button {
      padding: 0.8em 3em 0.8em 1.4em;
      width: 100%;
      white-space: nowrap;
      cursor: pointer;
      color: #000;
      font-weight: 400;
      height: 100%;
      transform: translateX(0);
      transition: transform 0.1s ease-in-out, font-weight 0.1s ease-in-out, color 0.1s ease-in-out;
    }
    svg {
      margin: 0 15px 0 0;
      fill: #000;
      transition: fill 0.4s ease-out;
    }
  }

  li.divider {
    display: flex;
    justify-content: space-between;

    cursor: default;

    margin-top: 1.5em;
    margin-bottom: 1em;
    padding: 0 0.5em;

    p{
      text-align: center;
      color: #666;
      margin: 0 0.5em;
      white-space: nowrap;

      flex: 1;
    }

    span{
      height: 1px;
      background: #666;

      flex: 2;
    }

    &:hover {
      &::before {
        width: 0;
      }
    }
  }
  li.logout {
    &:hover {
      background: red;
    }
  }
}
</style>