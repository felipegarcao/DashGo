import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Td,
  Text,
  useBreakpointValue,
  Spinner,
} from '@chakra-ui/react'
import { RiAddLine, RiRefreshLine } from 'react-icons/ri'
import { Header } from '../../components/Header'
import { Pagination } from '../../components/Pagination'
import { Sidebar } from '../../components/SideBar';
import NextLink from 'next/link'
import { useUsers } from '../../services/hooks/useUsers';
import { useState } from 'react'
import { Link as ChakraLink } from '@chakra-ui/react'

import { queryClient } from '../../services/queryClient'
import { api } from '../../services/api';


export default function UserList() {
  const [page, setPage] = useState(1)
  const { data, isLoading, isFetching, error, refetch } = useUsers(page)


  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  })

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`users/${userId}`)

      return response.data
    }, {
      staleTime: 1000 * 60 * 10, // 10 minutos
    })
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <Sidebar />

        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex
            mb="8"
            justify="space-between"
            align="center"
          >
            <Heading size="lg" fontSize="normal">
              Usuários
              {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
            </Heading>

            <Flex direction="column">
              <NextLink href="/users/create" passHref>
                <Button as="a" size="sm" fontSize="small" colorScheme="pink" leftIcon={<Icon as={RiAddLine} fontSize="20" />}>
                  Criar Novo
                </Button>
              </NextLink>
              <Button mt="2" size="sm" fontSize="small" colorScheme="blue" onClick={() => refetch()} leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}>
                Atualizar
              </Button>
            </Flex>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao Obter dados dos Usuários</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w={["6", "8"]}>
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de Cadastro</Th>}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.users.map(user => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Box>
                          <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(String(user.id))}>
                            <Text fontWeight="bold">{user.name}</Text>
                          </ChakraLink>
                          <Text fontSize="sm" color="gray.300">{user.email}</Text>
                        </Box>
                      </Td>
                      {isWideVersion && (
                        <Td>
                          {user.createdAt}
                        </Td>
                      )}
                    </Tr>
                  ))}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  )
}