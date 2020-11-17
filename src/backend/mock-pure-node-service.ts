import { RequestConfig } from "pure/dist/phone-port.types"

const mockPureData = [
  {
    address: "6 Czeczota St.\n02600 Warsaw",
    altName: "Boligłowa",
    blocked: false,
    favourite: true,
    id: 19,
    numbers: ["500400300"],
    priName: "Alek",
  },
]


const mockPureNodeService = () => {
  return jest.fn().mockImplementation(() => {
    return {
      request: ({ body }: RequestConfig) => {
        if (body.count === true) {
          return { data: { count: 1 }, status: "ok" }
        } else {
          return {
            data: mockPureData,
            status: "ok",
          }
        }
      },
    }
  })
}

export default mockPureNodeService
