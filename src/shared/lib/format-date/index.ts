export const formatDate = (date: Date) => {
  const [dateStr] = new Date(date).toISOString().split('T')
  return dateStr
}
