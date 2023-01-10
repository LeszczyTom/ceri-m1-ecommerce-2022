import { Navigate, Outlet } from 'react-router-dom'
import Cookies from 'universal-cookie'


const PrivateRoutes = () => {

    const cookies = new Cookies()
    return (
        cookies.get('role') === 'admin' ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes