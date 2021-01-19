import path from "path"
import parseIcs from "App/calendar/helpers/parse-vcf/parse-ics"

test("should ", async () => {
  const a = await parseIcs(path.join(__dirname, "./calendar.ics"))
  console.log(a)
})
