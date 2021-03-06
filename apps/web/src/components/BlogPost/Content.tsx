import React, { createContext, ElementType, ReactNode, useContext } from "react"
import ReactMarkdown from "react-markdown"
import gfm from "remark-gfm"
import Image from "next/image"
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  Code,
  Divider,
  Link,
  List,
  Checkbox,
  ListItem,
  Heading,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { PrismAsyncLight as SyntaxHighlighter } from "react-syntax-highlighter"
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism"

import { imageLoader } from "components/Common/Image"

const ContentsContext = createContext<Record<string, string>>({})

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getCoreProps(props: any): any {
  return props["data-sourcepos"]
    ? { "data-sourcepos": props["data-sourcepos"] }
    : {}
}

type Props = { children?: ReactNode }

const Paragraph = ({ children }: Props) => <Text pb={4}>{children}</Text>

const Emphasis = ({ children }: Props) => <Text as="em">{children}</Text>

const Blockquote = ({ children }: Props) => (
  <Text
    as="blockquote"
    py={2}
    pl={4}
    my={4}
    borderLeftColor="teal.500"
    borderLeftWidth="4px"
    borderLeftStyle="solid"
    fontStyle="italic"
    className="no-padding"
  >
    {children}
  </Text>
)

const CodeBlock = (
  props: Props & { language?: string; value: string; node: { meta?: string } },
) => {
  const { value, language } = props
  let showLineNumbers = false

  try {
    const meta = JSON.parse(props.node.meta ?? "")
    showLineNumbers = meta?.numberLines ?? false
  } catch {
    // Ignored
  }

  return (
    <Box mb={6}>
      <SyntaxHighlighter
        showLineNumbers={showLineNumbers}
        language={language ?? "text"}
        style={dracula}
      >
        {value}
      </SyntaxHighlighter>
    </Box>
  )
}

const Delete = ({ children }: Props) => <Text as="del">{children}</Text>

const Span = ({ children }: Props) => <Text as="span">{children}</Text>

const LinkElement = ({ children, href }: Props & { href: string }) => (
  <Link
    colorScheme="teal"
    isExternal
    rel="noopener noreferrer"
    display="inline-flex"
    href={href}
  >
    {children} <ExternalLinkIcon mx="2px" mt="2px" />
  </Link>
)

const ListElement = (
  props: Props & { start: number; ordered: boolean; depth: number },
) => {
  const { start, ordered, children, depth } = props
  const attrs = getCoreProps(props)
  if (start !== null && start !== 1 && start !== undefined) {
    attrs.start = start.toString()
  }
  let styleType = "disc"
  if (ordered) styleType = "decimal"
  if (depth === 1) styleType = "circle"
  return (
    <List
      spacing={1}
      as={ordered ? "ol" : "ul"}
      styleType={styleType}
      pl={4}
      ml={6}
      mb={4}
      {...attrs}
    >
      {children}
    </List>
  )
}

const ListItemElement = (props: Props & { checked: boolean }) => {
  const { children, checked } = props
  let checkbox = null
  if (checked !== null && checked !== undefined) {
    checkbox = (
      <Checkbox isChecked={checked} isReadOnly>
        {children}
      </Checkbox>
    )
  }
  return (
    <ListItem
      {...getCoreProps(props)}
      listStyleType={checked !== null ? "none" : "inherit"}
    >
      {checkbox || children}
    </ListItem>
  )
}

const HeadingElement = (props: Props & { level: number }) => {
  const { level, children } = props
  const sizes = ["2xl", "xl", "lg", "md", "sm", "xs"]
  return (
    <Heading
      my={4}
      as={`h${level}`}
      size={sizes[level - 1]}
      {...getCoreProps(props)}
    >
      {children}
    </Heading>
  )
}

const InlineCode = (props: Props) => {
  const { children } = props
  return <Code {...getCoreProps(props)}>{children}</Code>
}

const ImageElement = (props: Props & { src: string; alt: string }) => {
  const images = useContext(ContentsContext)
  const { src, alt } = props
  const placeholder = images[src]

  return (
    <Box py="6" m="0 auto" maxW="800px">
      <Box position="relative">
        <Box
          css={{
            backgroundImage: `url('${placeholder}')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            overflow: "hidden",
            position: "absolute",
            filter: "blur(10px)",
            transform: "scale(0.96)",
          }}
          w="100%"
          h="100%"
        />
        <Image
          layout="responsive"
          loader={imageLoader}
          loading="lazy"
          src={src}
          alt={alt}
          width={600}
          height={350}
        />
      </Box>
    </Box>
  )
}

const TableElement = (props: Props) => (
  <Table variant="simple" mb={10}>
    {props.children}
  </Table>
)

const TableCell = (props: Props & { isHeader: boolean }) => (
  <>{props.isHeader ? <Th>{props.children}</Th> : <Td>{props.children}</Td>}</>
)

const renderers: { [nodeType: string]: ElementType } = {
  paragraph: Paragraph,
  emphasis: Emphasis,
  blockquote: Blockquote,
  code: CodeBlock,
  delete: Delete,
  thematicBreak: Divider,
  link: LinkElement,
  image: ImageElement,
  linkReference: Link,
  imageReference: ImageElement,
  text: Span,
  list: ListElement,
  listItem: ListItemElement,
  definition: () => null,
  heading: HeadingElement,
  inlineCode: InlineCode,
  table: TableElement,
  tableHead: Thead,
  tableBody: Tbody,
  tableRow: Tr,
  tableCell: TableCell,
}

type ContentsProps = {
  children: string
  images: Record<string, string>
}

const Contents = ({ children, images }: ContentsProps) => (
  <ContentsContext.Provider value={images}>
    <ReactMarkdown renderers={renderers} plugins={[gfm]}>
      {children}
    </ReactMarkdown>
  </ContentsContext.Provider>
)

export { Contents }
