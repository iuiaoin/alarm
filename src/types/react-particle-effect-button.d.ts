declare module 'react-particle-effect-button' {
  import * as React from 'react';
  export default function ParticleEffectButton(props: IParticleEffectButtonProps): React.ReactElement;
  
  export interface IParticleEffectButtonProps {
    hidden?: boolean;
    color?: string;
    children?: React.ReactNode;
    duration?: number;
    easing?: string;
    type?: string;
    style?: string;
    direction?: string;
    canvasPadding?: number;
    size?: number | Function;
    speed?: number | Function; 
    particlesAmountCoefficient?: number;
    oscillationCoefficient?: number;
    onBegin?: Function;
    onComplete?: Function;
  }
}