// Components
import Logs from './pages/Logs.svelte'
import LogDetail from './pages/LogDetail.svelte'
import LogSearch from './pages/LogSearch.svelte'

// Export the route definition object
export default {
    // Exact path
    '/logs': Logs,

    // Using named parameter
    '/logs/:logId/details': LogDetail,
    '/logs/:logId/search': LogSearch
}