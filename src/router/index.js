import Vue from "vue";
import VueRouter from "vue-router";

import Login from "../views/auth/Login.vue";
import Register from "../views/auth/Register.vue";
import ForgotPassword from "../views/auth/ForgotPassword.vue";
import NewPassword from "../views/auth/NewPassword.vue";

import Index from "../views/Index.vue";
import Create from "../views/Create.vue";
import Rides from "../views/Rides.vue";
import Profile from "../views/Profile.vue";
import RideDetails from "../views/RideDetails.vue";

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
		path: "/rides/create",
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
		path: "/rides/ride-details",
		name: "RideDetails",
		component: RideDetails,
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
		path: "/auth/login",
		name: "Login",
		component: Login
	},
	{
		path: "/auth/register",
		name: "Register",
		component: Register
	},
	{
		path: "/auth/forgotpassword",
		name: "ForgotPassword",
		component: ForgotPassword
	},
	{
		path: "/auth/newpassword/:id",
		name: "NewPassword",
		component: NewPassword
	},

	{
		path: "/auth/profile",
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
	scrollBehavior() {
		return { x: 0, y: 0 };
	},
	base: process.env.BASE_URL,
	routes
});

export default router;
