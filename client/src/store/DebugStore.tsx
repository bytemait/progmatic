
import { useAppStore } from './hooks'
import { useEffect } from 'react'

const DebugStore = () => {

    const store = useAppStore()

    useEffect(() => {
        console.log('Current State:', store.getState())

        const unsubscribe = store.subscribe(() => {
            console.log('Updated State:', store.getState())
        })

        return () => unsubscribe()
    }, [store])

    return null
}

export default DebugStore