import * as THREE from "three";

type AnimationProps = {
    timeline: gsap.core.Timeline;
    rotationRef: React.RefObject<THREE.Group<THREE.Object3DEventMap>>;  
    rotationState: number;
    firstTarget: string;
    secondTarget: string;
    animationProps: gsap.TweenVars;  
}

export const animateWithGsapTimeleine = ({timeline, rotationRef, rotationState, firstTarget, secondTarget, animationProps} : AnimationProps) => {
    if(!rotationRef.current) return;
    timeline.to(rotationRef.current.rotation, {
        y: rotationState,
        duration: 1,
        ease: 'power2.inOut',
    })
    timeline.to( firstTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    },
    '<')
    timeline.to( secondTarget, {
        ...animationProps,
        ease: 'power2.inOut',
    },
    '<')
}