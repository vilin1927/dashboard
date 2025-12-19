import { extendTheme, type ThemeConfig } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

const config: ThemeConfig = {
  initialColorMode: 'light',
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  fonts: {
    heading: "'Poppins', sans-serif",
    body: "'Poppins', sans-serif",
  },
  colors: {
    brand: {
      50: '#E6F6FF',
      100: '#BAE3FF',
      200: '#7CC4FA',
      300: '#47A7F5',
      400: '#2389D9',
      500: '#1B6EB8',
      600: '#155A93',
      700: '#0F4A75',
      800: '#0A3856',
      900: '#06273D',
    },
  },
  styles: {
    global: (props: any) => ({
      body: {
        bg: mode('gray.50', 'gray.900')(props),
        color: mode('gray.800', 'white')(props),
      },
    }),
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: '500',
        borderRadius: '16px',
      },
      variants: {
        brand: (props: any) => ({
          bg: 'brand.500',
          color: 'white',
          _hover: {
            bg: mode('brand.600', 'brand.400')(props),
            boxShadow: 'lg',
          },
          _active: {
            bg: mode('brand.700', 'brand.500')(props),
          },
        }),
      },
    },
    Card: {
      baseStyle: (props: any) => ({
        container: {
          bg: mode('white', 'gray.800')(props),
          borderRadius: '20px',
          boxShadow: mode('0px 4px 12px rgba(0, 0, 0, 0.05)', '0px 4px 12px rgba(0, 0, 0, 0.3)')(props),
          p: '20px',
        },
      }),
    },
  },
});

export default theme;
