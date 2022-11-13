import { createRouter } from "vue-router";
import Collection from "../views/Collection.vue";
import Profile from "../views/Profile.vue";
import Home from "../views/Home.vue";
import Nft from "../views/Nft.vue"

const routes = [
  {
    path: "/",
    name: "marketplace",
    component: Collection,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/nft/:mint",
    name: "nft",
    component: Nft,
    props: true

  }
];

export default function (history: any) {
  return createRouter({
    history,
    routes,
  });
}
