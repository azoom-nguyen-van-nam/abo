export const spreadDatetime = (datetime: string) => {
  return (
    String(datetime).match(
      /^((?:\d{4})-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01]))T((?:[0-1][0-9]|2[0-3]):(?:[0-5][0-9]))(.*)$/
    ) || []
  )
}
