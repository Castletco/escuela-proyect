import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "Login",
		component: () => import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
	},
	{
		path: "/home",
		name: "Home",
		component: Home,
		children: [
			
			{
				path: "panelcontrol",
				name: "PanelControl",
				component: () => import(/* webpackChunkName: "paneldecontrol" */ "../views/PrincipalPanel.vue"),
			},
			{
				path: "matriculas",
				name: "Matriculas",
				component: () => import(/* webpackChunkName: "matriculas" */ "../views/MatriculasView.vue"),
				
			},
			{
				path: "asigmataalumno",
				name: "asigMatriculaAAlumno",
				component:() => import(/* webpackChunkName: "matricula_a_curso" */"../views/asigAlumnoCursoView.vue")
			},
			{
				path: "alumnos",
				name: "Alumnos",
				component: () => import(/* webpackChunkName: "about" */ "../views/AlumnosView.vue"),
			},
			{
				path: "cursos",
				name: "Cursos",
				component: () => import(/* webpackChunkName: "about" */ "../views/CursosView.vue"),
			},
			{
				path: "administracion",
				name: "Administracion",
				component: () => import(/* webpackChunkName: "administracion" */ "../views/AdminView.vue"),
				children: [
					{
						path: "admroles",
						name: "roles",
						component: () =>
							import(/* webpackChunkName: "admroles" */ "../components/admroles.vue"),
					},
					{
						path: "admusuarios",
						name: "usuarios",
						component: () =>
							import(/* webpackChunkName: "admusuarios" */ "../components/admusuarios.vue"),
					},
					{
						path: "admasignaturas",
						name: "asignaturas",
						component: () =>
							import(/* webpackChunkName: "tablaAdmin" */ "../components/admasignaturas.vue"),
					},
					{
						path: "admcursos",
						name: "cursos",
						component: () =>
							import(/* webpackChunkName: "tablaCursos" */ "../components/admcursos.vue"),
					},
					{
						path: "aacademico",
						name: "anoAcademico",
						component: () =>
							import(/* webpackChunkName: "anoacademico" */ "../components/admAnoAcademico.vue"),
					},
				],
			},
		],
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
