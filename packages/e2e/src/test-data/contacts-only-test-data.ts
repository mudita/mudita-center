export type Contact = {
  firstName: string
  lastName: string
  primaryNumber: string
  secondaryNumber: string
  addressFirstLine: string
  addressSecondLine: string
  addToFavourites: boolean
}

export const contacts: Array<Contact> = [
  {
    firstName: "Henryk",
    lastName: "Zaskroniec",
    primaryNumber: "33441",
    secondaryNumber: "",
    addressFirstLine: "Domaniewska 30",
    addressSecondLine: "00-675 Warszawa",
    addToFavourites: true,
  },
  {
    firstName: "Zbyszek",
    lastName: "Gamon",
    primaryNumber: "44115",
    secondaryNumber: "12344",
    addressFirstLine: "",
    addressSecondLine: "",
    addToFavourites: false,
  },
  {
    firstName: "Krzysztof",
    lastName: "Padaka",
    primaryNumber: "22443",
    secondaryNumber: "",
    addressFirstLine: "Podwawelska 2",
    addressSecondLine: "22-111 Zakopane",
    addToFavourites: true,
  },
  {
    firstName: "Lucyna",
    lastName: "Salceson",
    primaryNumber: "13579",
    secondaryNumber: "",
    addressFirstLine: "",
    addressSecondLine: "",
    addToFavourites: false,
  },
  {
    firstName: "Stefan",
    lastName: "Kajak",
    primaryNumber: "86420",
    secondaryNumber: "86421",
    addressFirstLine: "Nowa 24",
    addressSecondLine: "Otwock",
    addToFavourites: true,
  },
  {
    firstName: "Dariusz",
    lastName: "Niepowie",
    primaryNumber: "11225",
    secondaryNumber: "22443",
    addressFirstLine: "",
    addressSecondLine: "",
    addToFavourites: false,
  },
]
