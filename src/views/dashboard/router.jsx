import { lazy } from 'react'
import { fetchBaseInfo } from '@/api/user.js'

const Dashboard = lazy(() => import('./Layout.jsx'))

let loading = true

export default [
    {
        path: '/dashboard',
        element: <Dashboard />,
        loader: async () => {
            try {
                if (!loading) return
                loading = false
                const baseInfo = await fetchBaseInfo()
                return { baseInfo }
            } catch (e) {
                console.log(e)
            } finally {
                setTimeout(() => {
                    loading = true
                })
            }
        }
    }
]