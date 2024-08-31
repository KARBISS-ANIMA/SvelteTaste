<script>
import {isAuthorized} from "../../stores/storeAuth.js";
import { goto } from '$app/navigation';

export const load = (async () => {
    console.log("server after auth =>"+$isAuthorized)
    if (!isAuthorized){
       goto(`/`)
    }

})
</script>
<p>Admin auth correct</p>
<p>Home page</p>