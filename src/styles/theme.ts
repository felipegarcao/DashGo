import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({ // reaproveitando os temas que o chakra ja tem possui e modificando algumas coisas
  colors: {
    gray: {
      "900": "#181b23",
      "800": "#1f2029",
      "700": "#353546",
      "600": "#4B4D63",
      "500": "#616380",
      "400": "#797D9A",
      "300": "#9699B0",
      "200": "#B3B5C6",
      "100": "#D1D2DC",
      "50": "#EEEEF2"
    }
  },
  fonts: {
    heading: 'Roboto',
    body: 'Roboto',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50'
      }
    }
  }
}) 