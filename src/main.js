import { createApp } from 'vue'
import Swal from 'sweetalert2'

//Route
import Index from '@/layout/Index.vue'
import session from "@/config/session";
import router from '@/config/router'
const app = createApp(Index)
app.use(session)
app.use(router)
app.mount('#rabbani-dpr-main')