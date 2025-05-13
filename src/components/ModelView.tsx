import { OrbitControls, PerspectiveCamera, View } from "@react-three/drei";
import Lights from "./Lights";
import { Suspense } from "react";
import IPhone from "./iPhone";
import * as THREE from "three";
import type { RefObject } from "react";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib"; // for ref typing
import Loader from "./Loader";

type ModelViewProps = {
    index: number;
    groupRef: RefObject<THREE.Group>;
    gsapType: string;
    controlRef: RefObject<OrbitControlsImpl | null>;
    setRotationState: (rotation: number) => void;
    size: string;
    item: {
        title: string;
        color: string[];
        img: string;
    };
};

const ModelView = ({
    index,
    groupRef,
    gsapType,
    controlRef,
    setRotationState,
    size,
    item,
}: ModelViewProps) => {
    return (
        <View
            index={index}
            id={gsapType}
            className={`w-full h-full absolute ${index === 2 ? "right-[-100%]" : ""}`}
        >
            <ambientLight intensity={0.3} />
            <PerspectiveCamera makeDefault position={[0, 0, 4]} />
            <Lights />
            <OrbitControls
                makeDefault
                ref={controlRef}
                enableZoom={false}
                enablePan={false}
                rotateSpeed={0.4}
                target={new THREE.Vector3(0, 0, 0)}
                onEnd={() => {
                    if (controlRef.current) {
                        setRotationState(controlRef.current.getAzimuthalAngle());
                    }
                }}
            />
            <group
                ref={groupRef}
                name={index === 1 ? "small" : "large"}
                position={[0, 0, 0]}
            >
                <Suspense fallback={<Loader />}>
                    <IPhone
                        scale={index === 1 ? [15, 15, 15] : [17, 17, 17]}
                        item={item}
                        size={size}
                    />
                </Suspense>
            </group>
        </View>
    );
};

export default ModelView;
