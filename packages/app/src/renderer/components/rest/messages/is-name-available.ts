export const isNameAvailable = ({
  firstName,
  lastName,
}: {
  firstName?: string
  lastName?: string
}): boolean => Boolean(firstName || lastName)
