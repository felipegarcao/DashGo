import { Flex, Button, Stack } from '@chakra-ui/react';
import {useForm, SubmitHandler} from 'react-hook-form'
import { InputCustom } from '../components/Form/InputCustom'


type SignInFormData = {
  email: string;
  password: string;
}

export default function SignIn() {

  const { register, handleSubmit, formState } = useForm()

  const handleSignIn: SubmitHandler<SignInFormData> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }
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
        onSubmit={handleSubmit(handleSignIn)}
      >
        <Stack spacing="4">
          <InputCustom
            name="email"
            label="Email"
            type="email"
            {...register('email')}
          />


          <InputCustom
            name="password"
            label="Senha"
            type="password"
            {...register('password')}
          />


        </Stack>
        <Button
          type="submit"
          mt="6"
          colorScheme="pink"
          size="lg"
          isLoading={formState.isSubmitting}
        >
          Entrar
        </Button>
      </Flex>
    </Flex>
  )
}
