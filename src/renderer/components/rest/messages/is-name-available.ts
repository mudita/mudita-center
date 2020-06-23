export const isNameAvailable = ({
  firstName,
  lastName,
}: {
  firstName?: string
  lastName?: string
}) => firstName || lastName
