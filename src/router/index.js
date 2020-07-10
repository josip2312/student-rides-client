import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Rides from "../views/Rides.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Profile from "../views/Profile.vue";

import store from "../store/index";

Vue.use(VueRouter);
//props:true ako zelim nesto prebacit u redirectu
const routes = [
	{
		path: "/",
		name: "Index",
		component: Index
	},
	{
		path: "/create",
		name: "Create",
		component: Create,
		meta: {
			requiresAuth: true
		},
		beforeEnter: (to, from, next) => {
			if (to.matched.some(rec => rec.meta.requiresAuth)) {
				if (store.state.loggedIn) {
					next();
				} else {
					next({ name: "Login" });
				}
			}
		}
	},
	{
		path: "/login",
		name: "Login",
		component: Login
	},
	{
		path: "/register",
		name: "Register",
		component: Register
	},
	{
		path: "/rides",
		name: "Rides",
		component: Rides,
		meta: {
			requiresAuth: true
		},
		beforeEnter: (to, from, next) => {
			if (to.matched.some(rec => rec.meta.requiresAuth)) {
				if (store.state.loggedIn) {
					next();
				} else {
					next({ name: "Login" });
				}
			}
		}
	},
	{
		path: "/profile",
		name: "Profile",
		component: Profile,
		meta: {
			requiresAuth: true
		},
		beforeEnter: (to, from, next) => {
			if (to.matched.some(rec => rec.meta.requiresAuth)) {
				if (store.state.loggedIn) {
					next();
				} else {
					next({ name: "Login" });
				}
			}
		}
	}
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes
});

export default router;
