import ical from "node-ical"

const parseIcs = async (file: string) => {
  return await ical.async.parseFile(file)
}

export default parseIcs
