import { LoaderCircle } from "lucide-react"
export function Loading() {
    return (
    <div className="flex justify-center items-center">
        <LoaderCircle className="animate-spin"/>
    </div>)
}