import Vue from 'vue'
import Router from 'vue-router'
import Dashboard from '../views/Dashboard';
import Login from '../views/Login';
import layouts from '../layout';
import store from '../store';
import Resume from '../views/Resume';
import Product from '../views/Product';
import Profession from '../views/Profession';
import Teams from '../views/Teams';
import Employee from '../views/Employee';
import Job from '../views/Job';
import AddCareer from '../views/addCareer';
import EditCareer from '../views/EditCareer';
import Blog from '../views/Blog';
import addBlog from '../views/addBlog';

Vue.use(Router)

const routes = [
  {
    path: "/",
    name: "home",
    component: Dashboard,
    meta: {
      title: "Dashboard",
			layout: layouts.navLeft,
    }
  },
	{
    path: "/dashboard",
    name: "dashboard",
    component: Dashboard,
    meta: {
      title: "Хяналтын самбар",
			layout: layouts.navLeft,
    }
  },
	{
    path: "/signin",
    name: "signin",
    component: Login,
    meta: {
      title: "Нэвтрэх",
			layout: layouts.contenOnly
    }
  },
	{
    path: "/resume",
    name: "resume",
    component: Resume,
    meta: {
      title: "Анкетууд",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/product",
    name: "product",
    component: Product,
    meta: {
      title: "Бүтээлүүд",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/profession",
    name: "profession",
    component: Profession,
    meta: {
      title: "Мэргэжил",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/teams",
    name: "teams",
    component: Teams,
    meta: {
      title: "Багууд",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/employee",
    name: "employee",
    component: Employee,
    meta: {
      title: "Хамт олон",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/career",
    name: "career",
    component: Job,
    meta: {
      title: "Ажлын зар",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/add-career",
    name: "add-career",
    component: AddCareer,
    meta: {
      title: "Ажлын зар бүртгэх",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/edit-career/:id",
    name: "edit-career",
    component: EditCareer,
    meta: {
      title: "Ажлын зар засварлах",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/blog",
    name: "blog",
    component: Blog,
    meta: {
      title: "Блог",
			layout: layouts.navLeft,
    }
  },
  {
    path: "/add-blog",
    name: "add-blog",
    component: addBlog,
    meta: {
      title: "Блог үүсгэх",
			layout: layouts.navLeft,
    }
  }
];

const l = {
	contenOnly(){
		store.commit('setLayout', layouts.contenOnly)
	},
	navLeft(){
		store.commit('setLayout', layouts.navLeft)
	},
	set(layout){
		store.commit('setLayout', layout)
	}
}

const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});



router.beforeEach((to, from, next) => {
	const logged = auth.loggedIn();
	if (logged) {
		if (to.path == '/signin') {
			// router.push('/');
			window.location.href = '/'
			return false
		} else {
			next();
		}
	} else {
		if (to.path == '/signin') {
			next();
		} else {
			window.location.href = '/signin'
			return false
			// router.push('/signin');
		}
	}

	if(to && to.meta && to.meta.layout){
		l.set(to.meta.layout)
	}	
});

const auth = {
  loggedIn() {
    var token = localStorage.getItem("token");
    return token ? true : false;
  }
}

export default router