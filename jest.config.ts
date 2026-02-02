const { getJestProjectsAsync } = require("@nx/jest")

const EXCLUDED = [
  "libs/api-devices-testing",
]

module.exports = async () => {
  const projects = await getJestProjectsAsync()

  return {
    projects: projects.filter(
      (p) => !EXCLUDED.some((e) => p.includes(e))
    ),
  }
}