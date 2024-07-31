import { createRouter, createWebHistory, useRouter } from 'vue-router'
import session from "@/config/session";

//define a routes
const routes = [


/*
| -------------------------------------------------------------------
| ROUTE 2024
| -------------------------------------------------------------------
*/
    {
        path: '/', alias:'/home', name: '2024.home',
        meta: { selfPath: '', readyPage:true, requiresAuth: false, title:'MariMar | Marawis ibu ibu Majelis taklim Rabbani  ' },
        component: () => import('@/views/2024/Home/Index.vue')
    },
    {
        path: '/welcome', alias:'/welcome', name: '2024.welcome',
        meta: { selfPath: '', readyPage:false, requiresAuth: false, title:'MariMar | Marawis ibu ibu Majelis taklim Rabbani' },
        component: () => import('@/views/2024/Home/Index.vue')
    },
    {
        path: '/login', alias:'/masuk', name: '2024.login',
        meta: { selfPath: '', readyPage:true, authPage: false, title:'Login MariMar' },
        component: () => import('@/views/2024/Home/Login.vue')
    },
    {
        path: '/register', alias:'/daftar', name: '2024.register',
        meta: { selfPath: '', readyPage:true, authPage: false, title:'Register MariMar' },
        component: () => import('@/views/2024/Home/Register.vue')
    },
    {
        path: '/profile', alias:'/profil', name: '2024.profile',
        meta: { selfPath: '', readyPage:true, requiresAuth: true, title:'Profile MariMar' },
        component: () => import('@/views/2024/Member/Profile.vue')
    },
    {
        path: '/vote', alias:'/public-vote', name: '2024.public',
        meta: { selfPath: '', readyPage:true, requiresAuth: false, title:'Public Area MariMar' },
        component: () => import('@/views/2024/Public/Index.vue')
    },
    {
        path: '/finalis', alias:'/public', name: '2024.finalis',
        meta: { selfPath: '', readyPage:false, requiresAuth: false, title:'Finalis MariMar 2024' },
        component: () => import('@/views/2024/Public/Finalis.vue')
    },

    {
        path: '/:id', alias:'/:id', name: '2024.vote',
        meta: { selfPath: '', readyPage:true, requiresAuth: false, title:'Vote MariMar 2024' },
        component: () => import('@/views/2024/Public/Vote.vue')
    },

    {
        path: '/pagenotfound', alias:'/pagenotfound', name: '2024.pagenotfound',
        meta: { selfPath: '', readyPage:true, title:'Page Not Found' },
        component: () => import('@/views/2024/Page/NotFound.vue')
    },

    // {
    //     path: '/sponsor', alias:'/sponsor', name: '2024.sponsor',
    //     meta: { selfPath: '', readyPage:false, requiresAuth: false, title:'DPRD - Sponsor' },
    //     component: () => import('@/views/2024/Page/Sponsor.vue')
    // },
    // {
    //     path: '/shop', alias:'/belanja', name: '2024.shop',
    //     meta: { selfPath: '', readyPage:false, requiresAuth: false, title:'DPRD - Shop' },
    //     component: () => import('@/views/2024/Page/Shop.vue')
    // },
    // {
    //     path: '/shop/:id', alias:'/belanja/:id', name: '2024.shop.product',
    //     meta: { selfPath: '', readyPage:false, requiresAuth: false, title:'DPRD - Shop' },
    //     component: () => import('@/views/2024/Page/ShopProduct.vue')
    // },

]

//create router
const router = createRouter({ history: createWebHistory(), useroute: useRouter(), routes })

router.beforeEach((to, from, next) => {
    var existSelfPath = (to.matched.some((record) => record.meta.selfPath)) ? `/${to.matched[0].meta.selfPath}` : '';
    if(to.matched.some((record) => record.meta.readyPage)) {
        if(to.matched.some((record) => record.meta.requiresAuth)) {
            if (session.getters.authenticatedUser) { next(); return; }
            next(`${existSelfPath}/login`);
        }else if(to.matched.some((record) => record.meta.authPage)) {
            if (session.getters.authenticatedUser) {  next(`${existSelfPath}/`); return; }
            next();
        }else{
            next(); return;
        }
    }else{ next(`${existSelfPath}/pagenotfound`); }
});

export default router