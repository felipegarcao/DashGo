import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react'
import Link from 'next/link'
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'

import { Header } from '../../components/Header'
import { Sidebar } from '../../components/SideBar';
import { InputCustom } from '../../components/Form/InputCustom';

type CreateUserProps = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const createUserFormSchema = yup.object().shape({
  email: yup.string().required('E-Mail Obrigatório').email('E-Mail Invalido'),
  name: yup.string().required('Nome Obrigatório'),
  password: yup.string().required('Senha Obrigatória').min(6, 'No Mínimo 6 caracteres'),
  
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As Senha Precisam ser Iguais')
})

export default function CreateUser() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(createUserFormSchema)
  })

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserProps> = async (data) => {
    await new Promise(resolve => setTimeout(resolve, 2000))

    console.log(data)
  }


  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar Usuário</Heading>
          <Divider my="6" borderColor="gray.700" />
          <VStack spacing="8">
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">

              <InputCustom
                name="name"
                label="Nome Completo"
                error={errors.name}
                {...register('name')}
              />

              <InputCustom
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />

            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <InputCustom
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <InputCustom
                name="password_confirmation"
                type="password"
                label="Confirmação da Senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>

          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing="4">
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                colorScheme="pink"
                type="submit"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>

      </Flex>
    </Box>
  )
}