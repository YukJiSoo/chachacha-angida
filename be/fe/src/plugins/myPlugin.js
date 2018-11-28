import router from '../router.js'

export default {
    install(Vue,options){
        Vue.prototype.$goBack = () => {
            // console.log('12')
            router.go(-1)
        }
        Vue.prototype.$surname = 'Smith'
    }
}
