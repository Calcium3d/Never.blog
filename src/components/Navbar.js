import React, { useContext, useRef } from "react"
import { Link } from "gatsby"
import { Box, Flex } from "@chakra-ui/layout"
import {
  RiMoonLine,
  RiSunFoggyLine,
  RiDiscordFill,
  RiSpotifyFill,
} from "react-icons/ri"
import { HiMusicNote } from "react-icons/hi"
import { transition } from "../data/theme"
import {
  Image,
  Text,
  Link as ChakraLink,
  Skeleton,
  SkeletonCircle,
} from "@chakra-ui/react"
import { LanyardProvider, ThemeProvider } from "../data/providers"
import Headroom from "react-headroom"

const colors = {
  online: "hsl(139, 47.3%, 43.9%)",
  idle: "hsl(38, 95.7%, 54.1%)",
  offline: "hsl(214, 9.9%, 50.4%)",
  dnd: "hsl(359, 82.6%, 59.4%)",
}

const LazyImage = ({ src, ...rest }) => {
  const imageRef = useRef()
  const [loaded, setLoaded] = React.useState(false)
  React.useEffect(() => {
    if (!loaded && imageRef.current?.complete) {
      setLoaded(true)
    }
  }, [src])

  return (
    <Skeleton isLoaded={loaded} h="full">
      <Image
        borderRadius="sm"
        w="full"
        h="full"
        ref={imageRef}
        onError={() => setLoaded(false)}
        onLoad={() => setLoaded(true)}
        src={src}
        {...rest}
      />
    </Skeleton>
  )
}

export default function Navbar() {
  const { theme, setTheme, toggle } = useContext(ThemeProvider)
  const lanyard = useContext(LanyardProvider)
  const nav = (
    <Flex
      as="nav"
      justifyContent="space-between"
      width="100%"
      transition={transition}
      p={3}
      zIndex={100}
      bg="bg.100"
    >
      <Flex justify="flex-start" align="center">
        <Link to="/" h="max-content">
          <Flex pointerEvents="all" alignItems="center" transition={transition}>
            <Flex
              w={["30px", "32px", "45px"]}
              h={["30px", "32px", "45px"]}
              justifyContent="center"
            >
              {lanyard.discord_user ? (
                <h1>
                  Blue Chalk
                </h1>
              ) : (
                <SkeletonCircle w="full" h="full" />
              )}
            </Flex>
          </Flex>
        </Link>
        {lanyard?.spotify && (
          <Flex
            justify="center"
            h="full"
            direction="column"
            marginInlineStart={2}
          >
            {lanyard.spotify && (
              <Flex align="center" color="text.100">
                <RiSpotifyFill />
                <Text fontSize="xs" mx={2}>
                  {"I'm listening to"}
                </Text>
              </Flex>
            )}
            <Flex align="center" lineHeight={1}>
              <Flex
                display="flex"
                fontSize="sm"
                align="center"
                color="text.300"
              >
                {lanyard?.spotify ? (
                  <>
                    <HiMusicNote />
                    <ChakraLink
                      color="inherit"
                      rel="external noopener"
                      target="_blank"
                      href={`https://open.spotify.com/track/${lanyard.spotify.track_id}`}
                    >
                      <Text
                        fontSize="xs"
                        mx={2}
                        maxWidth={["20ch", "40ch", "100%"]}
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        overflow="hidden"
                      >
                        {lanyard.spotify.artist} - {lanyard.spotify.song}
                      </Text>
                    </ChakraLink>
                  </>
                ) : (
                  <>
                    {/* <Text fontSize="xs" mx={2}>
                      I'm on Discord doing nothing
                    </Text> */}
                  </>
                )}
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>
      <Box
        p={2}
        color="text.100"
        onClick={() => setTheme(toggle)}
        cursor="pointer"
        as="button"
        pointerEvents="all"
        aria-label="theme switch"
      >
        {theme === "light" ? (
          <RiMoonLine size={30} />
        ) : (
          <RiSunFoggyLine size={30} />
        )}
      </Box>
    </Flex>
  )
  return <Headroom>{nav}</Headroom>
}
