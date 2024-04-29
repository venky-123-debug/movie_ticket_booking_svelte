<script>
  import Sidenav from "./components/sidenav.svelte"
</script>

<Sidenav />

<style global>
  .dynamic-padding {
    padding-inline-start: 250px;
  }

  @media (max-width: 1024px) {
    .dynamic-padding {
      padding-inline-start: 0px;
    }
  }
  @media (max-width: 1024px) {
    .min-padding {
      padding-inline-start: 250px;
    }
  }

  .ripple {
    position: relative;
    overflow: hidden;
    transform: translate3d(0, 0, 0);
  }
  .ripple:after {
    content: "";
    display: block;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    pointer-events: none;
    background-image: radial-gradient(circle, #000 10%, transparent 10.01%);
    background-repeat: no-repeat;
    background-position: 50%;
    transform: scale(10, 10);
    opacity: 0;
    transition: transform 0.5s, opacity 1s;
  }
  .ripple:active:after {
    transform: scale(0, 0);
    opacity: 0.2;
    transition: 0s;
  }

  ::-webkit-scrollbar {
    width: 0;
    height: 0;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #686666;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #333334;
    border-radius: 8px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #404145;
  }
</style>
