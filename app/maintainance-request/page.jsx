"use client";

import { Suspense } from "react"
import MaintenanceRequestPage from "./comp";

const Page = () => {
    return (
        <Suspense>
            <MaintenanceRequestPage />
        </Suspense>
    )
}

export default Page;