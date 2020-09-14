import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";
import NewPassword from "@/views/auth/NewPassword.vue";

import Landing from "@/views/Landing.vue";
import NotFound from "@/views/NotFound.vue";

import Rides from "@/views/rides/Rides.vue";
import RideDetails from "@/views/rides/RideDetails.vue";
import CreateRide from "@/views/rides/CreateRide.vue";

import Profile from "@/views/users/Profile.vue";
import UserDetails from "@/views/users/UserDetails.vue";
import EditProfile from "@/views/users/EditProfile.vue";

import Chat from "@/views/chat/Chat.vue";
import ChatDashboard from "@/views/chat/ChatDashboard.vue";

Vue.use(VueRouter);

//lazy loading ---- const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')

const loggedOutGuard = (to, from, next) => {
	if (to.matched.some(rec => rec.meta.requiresAuth)) {
		if (store.state.authModule.loggedIn) {
			next();
		} else {
			next({ name: "Login" });
		}
	}
};

const loggedInGuard = (to, from, next) => {
	if (!store.state.authModule.loggedIn) {
		next();
	} else {
		next({ name: "Landing" });
	}
};

//props:true ako zelim nesto prebacit u redirectu
const routes = [
	{
		// will match everything
		path: "*",
		name: "NotFound",
		component: NotFound
	},
	{
		path: "/",
		name: "Landing",
		component: Landing
	},
	{
		props: true,
		path: "/rides/create",
		name: "CreateRide",
		component: CreateRide,
		meta: {
			requiresAuth: true
		},
		beforeEnter: (to, from, next) => {
			store.state.editingRide = {};
			if (to.matched.some(rec => rec.meta.requiresAuth)) {
				if (store.state.authModule.loggedIn) {
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
		beforeEnter: loggedOutGuard
	},
	{
		path: "/rides",
		name: "Rides",
		component: Rides,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},

	{
		path: "/auth/login",
		name: "Login",
		component: Login,

		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/register",
		name: "Register",
		component: Register,
		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/forgotpassword",
		name: "ForgotPassword",
		component: ForgotPassword,
		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/newpassword/:id",
		name: "NewPassword",
		component: NewPassword,
		beforeEnter: loggedInGuard
	},

	{
		path: "/auth/profile",
		name: "Profile",
		component: Profile,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		props: true,
		path: "/users/:name",
		name: "UserDetails",
		component: UserDetails,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		path: "/profile/edit",
		name: "EditProfile",
		component: EditProfile,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		path: "/user/chat-dashboard/",
		name: "ChatDashboard",
		component: ChatDashboard,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		props: true,
		path: "/user/chat-dashboard/:index",
		name: "Chat",
		component: Chat,
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
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
