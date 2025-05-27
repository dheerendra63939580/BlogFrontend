import { LoaderCircle } from "lucide-react"
export function PageLoading() {
    return (
    <div className="flex justify-center">
        <LoaderCircle />
        <div>loading data...</div>
    </div>)
}