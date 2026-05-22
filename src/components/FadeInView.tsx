import { ReactNode } from 'react';
import Animated, { FadeInDown, FadeOut } from 'react-native-reanimated';
import { animation } from '@/src/constants/theme';

interface FadeInViewProps {
  children: ReactNode;
  index?: number;
  style?: object;
}

export function FadeInView({ children, index = 0, style }: FadeInViewProps) {
  return (
    <Animated.View
      entering={FadeInDown.delay(index * animation.stagger)
        .duration(animation.duration)
        .springify()
        .damping(animation.spring.damping)
        .stiffness(animation.spring.stiffness)}
      exiting={FadeOut.duration(220)}
      style={style}
    >
      {children}
    </Animated.View>
  );
}
