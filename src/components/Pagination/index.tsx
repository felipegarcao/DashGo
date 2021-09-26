import { Stack, Box, HStack, Text } from "@chakra-ui/react";
import { PaginationItem } from './PaginationItem'

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (page: number) => void;
}

const siblingSCount = 2; // pagina irma da pagina atual

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)].map((_, index) => {
    return from + index + 1;
  })
    .filter(page => page > 0)
}

export function Pagination({
  totalCountOfRegisters,
  registersPerPage = 10,
  currentPage = 1,
  onPageChange
}: PaginationProps) {

  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage); // pegando a ultima pagina possível

  const previousPages = currentPage > 1
    ? generatePagesArray(currentPage - 1 - siblingSCount, currentPage - 1)
    : []

  const nextPages = currentPage < lastPage
    ? generatePagesArray(currentPage, Math.min(currentPage + siblingSCount, lastPage))
    : []

  return (
    <Stack
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
      direction={["column", "row"]}
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <HStack spacing="2">

        {currentPage > (1 + siblingSCount) && (
          <>
            <PaginationItem onPageChange={onPageChange} number={1} />
            {currentPage > (2 + siblingSCount) && <Text color="gray.300" width="6" textAlign="center">...</Text>}
          </>
        )}

        {previousPages.length > 0 && previousPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}

        <PaginationItem onPageChange={onPageChange} number={currentPage} isCurrent />

        {nextPages.length > 0 && nextPages.map(page => {
          return <PaginationItem onPageChange={onPageChange} key={page} number={page} />
        })}


        {(currentPage + siblingSCount) < lastPage && (
          <>
            {(currentPage + 1 + siblingSCount) < lastPage && <Text color="gray.300" width="6" textAlign="center">...</Text>}
            <PaginationItem onPageChange={onPageChange} number={lastPage} />
          </>
        )}

      </HStack>
    </Stack>
  )
}