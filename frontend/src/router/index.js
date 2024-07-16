// Composable
import { createRouter, createWebHistory } from "vue-router";
import { getCookie } from "../../utils/cookieUtils";
import { jwtDecode } from "jwt-decode";
// import jwtDecode from 'jwt-decode';

const routes = [
  {
    path: "/",
    // component: () => import('@/layouts/default/Default.vue'),
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        // component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
        component: () => import("@/views/Login.vue"),
      },
    ],
  },
  {
    path: "/auth",
    component: () => import("@/layouts/AuthLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/Login.vue"),
      },
      {
        path: "register",
        component: () => import("@/views/Registration.vue"),
      },
      {
        path: "reset",
        component: () => import("@/views/ResetStep1.vue"),
      },
      {
        path: "verify-code",
        component: () => import("@/views/ResetStep2.vue"),
      },
      {
        path: "reset-password",
        component: () => import("@/views/ResetStep3.vue"),
      },
    ],
  },
  {
    path: "/student",
    component: () => import("@/layouts/StudentLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/student/Dashboard.vue"),
      },
      {
        path: "dashboard",
        component: () => import("@/views/student/Dashboard.vue"),
      },
      {
        path: "messages",
        component: () => import("@/views/student/Messages.vue"),
      },
      {
        path: "register-complaint",
        component: () => import("@/views/student/RegisterComplaint.vue"),
      },
      {
        path: "complaint-history",
        component: () => import("@/views/student/CompliantHistory.vue"),
      },
      {
        path: "classes",
        component: () => import("@/views/student/Classes.vue"),
      },
      {
        path: "change-password",
        component: () => import("@/views/ChangePass.vue"),
      },
      {
        path: "complaint-details/:id",
        component: () => import("@/views/complaint-details.vue"),
        props: true,
      },
    ],
  },
  {
    path: "/admin",
    component: () => import("@/layouts/TutorLayout.vue"),
    children: [
      {
        path: "",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        path: "dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
      },
      {
        path: "inprocess-complaint",
        component: () => import("@/views/admin/Inprocess-complaint.vue"),
      },
      {
        path: "notprocess-complaint",
        component: () => import("@/views/admin/Notprocess-complaint.vue"),
      },
      {
        path: "students",
        component: () => import("@/views/admin/Students.vue"),
      },
      {
        path: "closed-complaint",
        component: () => import("@/views/admin/Closed-complaint.vue"),
      },
      {
        path: "complaint-details/:id",
        component: () => import("@/views/complaint-details.vue"),
        props: true,
      },
      {
        path: "change-password",
        component: () => import("@/views/ChangePass.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Utility function to check token validity
function isTokenValid(token) {
  try {
    const decodedToken = jwtDecode(token);
    return decodedToken.exp * 1000 > Date.now();
  } catch (error) {
    return false;
  }
}

// Navigation guard to check for JWT token
router.beforeEach((to, from, next) => {
  const publicPages = ["/", "/auth", "/auth/register", "/auth/reset", "/auth/verify-code", "/auth/reset-password"];
  const authRequired = !publicPages.includes(to.path);
  const token = getCookie("jwt");

  if (authRequired && (!token || !isTokenValid(token))) {
    alert("Your session has expired. Please log in again.");
    return next("/auth");
  }

  next();
});

// Check token validity on initial page load
const token = getCookie("jwt");
if (token && !isTokenValid(token)) {
  alert("Your session has expired. Please log in again.");
  router.push("/auth");
}

export default router;
