import { Flex } from '@chakra-ui/react';
import { Logo } from './Logo'
import { Notification } from './Notification';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';


export function Header() {
  return (
    <Flex
      w="100%"
      as="header"
      maxWidth={1480}
      h="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >
      <Logo />

      <SearchBox />

      <Flex
        align="center"
        ml="auto"
      >
        <Notification />
        <Profile />
      </Flex>
    </Flex>
  )
}