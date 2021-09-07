import { Flex, useBreakpointValue, IconButton, Icon } from '@chakra-ui/react';
import { RiMenuLine } from 'react-icons/ri';
import { useSideBarDrawer } from '../../contexts/SidebarDrawerContext';
import { Logo } from './Logo'
import { Notification } from './Notification';
import { Profile } from './Profile';
import { SearchBox } from './SearchBox';


export function Header() {

  const {onOpen} = useSideBarDrawer()

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  })
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
      {!isWideVersion && (
        <IconButton
          aria-label="Open Navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        >

        </IconButton>
      ) }
      <Logo />

      { isWideVersion && <SearchBox />}

      <Flex
        align="center"
        ml="auto"
      >
        <Notification />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  )
}