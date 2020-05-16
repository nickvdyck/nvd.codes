import {
  styled,
  colors,
  borderRadius,
  fontSize,
  spacing,
  fontWeight,
} from "src/components/Tokens"

const Tag = styled.span`
  display: inline-flex;
  justify-content: center;
  color: ${colors.white};
  background-color: ${colors.teal[800]};
  border-radius: ${borderRadius.lg};
  font-size: ${fontSize.xs};
  font-weight: ${fontWeight.bold};
  padding: ${spacing[1]} ${spacing[2]};

  &:not(:last-child) {
    margin-right: ${spacing[2]};
  }
`

export { Tag }
