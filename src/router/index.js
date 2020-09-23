import Vue from "vue";
import VueRouter from "vue-router";
import store from "@/store/index";

import Landing from "@/views/Landing.vue";
import Chat from "@/views/chat/Chat.vue";

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
		component: () =>
			import(/* webpackChunkName: "NotFound" */ "@/views/NotFound.vue")
	},
	{
		path: "/",
		name: "Landing",
		component: Landing
	},
	{
		path: "/rides",
		name: "Rides",
		component: () =>
			import(/* webpackChunkName: "Rides" */ "@/views/rides/Rides.vue"),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		props: true,
		path: "/rides/create",
		name: "CreateRide",
		component: () =>
			import(
				/* webpackChunkName: "Rides" */ "@/views/rides/CreateRide.vue"
			),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		path: "/rides/ride-details",
		name: "RideDetails",
		component: () =>
			import(
				/* webpackChunkName: "Rides" */ "@/views/rides/RideDetails.vue"
			),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},

	{
		path: "/auth/login",
		name: "Login",
		component: () =>
			import(/* webpackChunkName: "Auth" */ "@/views/auth/Login.vue"),

		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/register",
		name: "Register",
		component: () =>
			import(/* webpackChunkName: "Auth" */ "@/views/auth/Register.vue"),
		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/forgotpassword",
		name: "ForgotPassword",
		component: () =>
			import(
				/* webpackChunkName: "Auth" */ "@/views/auth/ForgotPassword.vue"
			),
		beforeEnter: loggedInGuard
	},
	{
		path: "/auth/newpassword/:id",
		name: "NewPassword",
		component: () =>
			import(
				/* webpackChunkName: "Auth" */ "@/views/auth/NewPassword.vue"
			),
		beforeEnter: loggedInGuard
	},

	{
		path: "/user/profile",
		name: "Profile",
		component: () =>
			import(/* webpackChunkName: "User" */ "@/views/users/Profile.vue"),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		props: true,
		path: "/users/:name",
		name: "UserDetails",
		component: () =>
			import(
				/* webpackChunkName: "User" */ "@/views/users/UserDetails.vue"
			),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		path: "/user/edit",
		name: "EditProfile",
		component: () =>
			import(
				/* webpackChunkName: "User" */ "@/views/users/EditProfile.vue"
			),
		meta: {
			requiresAuth: true
		},
		beforeEnter: loggedOutGuard
	},
	{
		path: "/user/chat-dashboard/",
		name: "ChatDashboard",
		component: () =>
			import(
				/* webpackChunkName: "Chat" */ "@/views/chat/ChatDashboard.vue"
			),
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
