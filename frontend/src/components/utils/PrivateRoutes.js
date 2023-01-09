import { Navigate, Outlet } from 'react-router-dom'
import Cookie from 'universal-cookie'


const PrivateRoutes = () => {

    const cookies = new Cookie()
    return (
        cookies.get('role') === 'admin' ? <Outlet/> : <Navigate to='/'/>
    )
}

export default PrivateRoutes