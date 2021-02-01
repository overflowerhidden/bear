import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// V3.1.0版本里面新增功能：push和replace方法会返回一个promise, 你可能在控制台看到未捕获的异常
// 对Router原型链上的push、replace方法进行重写
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject)
        return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch((err) => err)
};


/* Layout */
import Layout from '@/views/layout/'

export const constRoutes = [
    {
        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/404'),
        hidden: true
    },
    {
        path: '/',
        name: '首页',
        component: Layout,
        redirect: '/dashboard',
        meta: { title: '首页', icon: 'table' },
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            meta: { title: 'Dashboard', icon: 'dashboard' }
        }, {
            path: 'about',
            name: 'About',
            component: () => import('@/views/about/index'),
            meta: { title: 'About', icon: 'dashboard' }
        }]
    }
];

// 权限页面：受保护页面，要求用户登录并拥有访问权限的角色才能访问
export const asyncRoutes = [
    {
        path: '/city',
        name: '城市',
        component: Layout,
        redirect: '/city/info',
        meta: { title: '城市', icon: 'table', roles: ['admin', 'editor'] },
        children: [{
            path: 'info',
            name: '城市信息',
            component: () => import('@/views/city/index'),
            meta: { title: '城市信息', icon: 'dashboard', roles: ['admin', 'editor'] }
        }, {
            path: 'traffic',
            name: '城市交通',
            component: () => import('@/views/traffic/index'),
            meta: { title: '城市交通', icon: 'dashboard', roles: ['admin'] }
        }]
    },
];

export default new Router({
    mode: "history",
    // base: process.env.BASE_URL,
    routes: constRoutes
});