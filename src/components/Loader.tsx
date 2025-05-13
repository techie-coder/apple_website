import { Html } from "@react-three/drei"
import type { JSX } from "react"

const Loader = (): JSX.Element => {
    return (
        <Html>
            <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <div className="w-[10vw] h-[10vw] rounded-full">
                    Loading...
                </div>
            </div>
        </Html>
    )
}

export default Loader