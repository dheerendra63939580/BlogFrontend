import { LoaderCircle } from "lucide-react"
export function PageLoading() {
    return (
    <div className="flex justify-center flex-col gap-2.5 items-center">
        <LoaderCircle className="animate-spin"/>
        <div>loading data...</div>
    </div>)
}