import React from 'react'
import ProtectedLayout from '../layouts/protected/layout'

export default function page() {
    return (
        <ProtectedLayout>      
            <div>This is profile page</div>
        </ProtectedLayout>
    )
}
