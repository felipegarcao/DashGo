import { Flex, Button, Stack } from '@chakra-ui/react'
import { InputCustom } from '../components/Form/InputCustom'

export default function SignIn() {
  return (
    <Flex
      w="100vw"
      h="100vh"
      align="center"
      justify="center"
    >
      <Flex
        as="form"
        w="100%"
        maxWidth={360}
        bg="gray.800"
        p="8"
        borderRadius={8}
        flexDirection="column"

      >
        <Stack spacing="4">
          <InputCustom
            name="email"
            label="E-mail"
            type="email"
          />


          <InputCustom
            name="password"
            label="Senha"
            type="password"
          />


        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
