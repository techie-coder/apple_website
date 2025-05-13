import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ModelView from "./ModelView"
import { useState, useRef } from "react"
import { yellowImg } from "../utils"
import * as THREE from "three"
import { Canvas } from "@react-three/fiber"
import { View } from "@react-three/drei"
import { models, sizes } from "../constants"
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { animateWithGsapTimeleine } from "../constants/animations"
import { useEffect } from "react"


type ModelProps = {
    title: string;
    color: string[];
    img: string;
}


const Model = () => {

    const [size, setSize] = useState<string>('small');
    const [model, setModel] = useState<ModelProps>({
        title: 'iPhone 15 Pro in Natural Titanium',
        color: ['8F8A81', '#FFE7B9', '#6F6C64'],
        img: yellowImg
    })

    //camera controls
    const cameraControlSmall = useRef<OrbitControlsImpl | null>(null);
    const cameraControlLarge = useRef<OrbitControlsImpl | null>(null);

    //model
    const small = useRef(new THREE.Group());
    const large = useRef(new THREE.Group());

    //rotatation
    const [smallRotation, setSmallRotation] = useState(0);
    const [largeRotation, setLargeRotation] = useState(0);

    useGSAP(() => {
        gsap.to('#heading', {
            y: 0,
            opacity: 1,
        })
    }, [])

    const tl = gsap.timeline({});

    useEffect(() => {
        if (size === "large") {
            animateWithGsapTimeleine({
                timeline: tl,
                rotationRef: small,
                rotationState: smallRotation,
                firstTarget: '#view1',
                secondTarget: '#view2',
                animationProps: {
                    transform: 'translateX(-100%)',
                    duration: 2
                }
            })
        }
        if (size === "small") {
            animateWithGsapTimeleine({
                timeline: tl,
                rotationRef: large,
                rotationState: largeRotation,
                firstTarget: '#view2',
                secondTarget: '#view1',
                animationProps: {
                    transform: 'translateX(0)',
                    duration: 2
                }
            })
        }
    }, [size])

    return (
        <section className="common-padding">
            <div className="screen-max-width">
                <h1 id="heading" className="section-heading">
                    Take a closer look.
                </h1>
                <div className="flex flex-col items-center mt-5">
                    <div className="w-full h-[75vh] md:h-[90vh] overflow-hidden relative">
                        <ModelView
                            index={1}
                            groupRef={small}
                            gsapType="view1"
                            controlRef={cameraControlSmall}
                            setRotationState={setSmallRotation}
                            item={model}
                            size={size}
                        />
                        <ModelView
                            index={2}
                            groupRef={large}
                            gsapType="view2"
                            controlRef={cameraControlLarge}
                            setRotationState={setLargeRotation}
                            item={model}
                            size={size}
                        />
                        <Canvas
                            className="w-full h-full"
                            style={{
                                position: 'fixed',
                                top: 0,
                                bottom: 0,
                                left: 0,
                                right: 0,
                                overflow: 'hidden'
                            }}
                            //@ts-ignore
                            eventSource={document.getElementById('root')}
                        >
                            <View.Port />
                        </Canvas>
                    </div>
                    <div className="mx-auto w-full">
                        <p className="text-sm font-light text-center mb-5">{model.title}</p>
                        <div className="flex-center">
                            <ul className="color-container">
                                {models.map((item, index) => (
                                    <li key={index} className="w-6 h-6 rounded-full mx-2 cursor-pointer" style={{ backgroundColor: item.color[0] }} onClick={() => setModel(item)} />
                                ))}
                            </ul>
                            <button className="size-btn-container">
                                {sizes.map(({ label, value }) => (
                                    <span key={label} className="size-btn" style={{ backgroundColor: size === value ? 'white' : 'transparent', color: size === value ? 'black' : 'white' }} onClick={() => setSize(value)}>
                                        {label}
                                    </span>
                                ))}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Model