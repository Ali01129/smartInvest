
import { useColorScheme } from 'react-native';

import { ColorPalette } from '@/constants/Colors';

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof ColorPalette.primary & keyof typeof ColorPalette.dark
) {
  const theme = useColorScheme() ?? 'light';
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return ColorPalette[theme][colorName];
  }
}
