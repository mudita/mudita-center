const fs = require("fs")
const path = require("path")

/**
 * Automatically bumps required coverage threshold when current coverage is bigger by coverageTolerance
 * @param {number} [coverageTolerance=2] - Tolerance for auto bump
 */
const coverageAutoBump = (coverageTolerance = 2) => {
  const currentCoverage = require(path.resolve(
    __dirname,
    "./coverage/coverage-summary.json"
  ))
  const requiredCoverage = require(path.resolve(
    __dirname,
    "./jest.coverage.json"
  ))

  const desiredCoverage = requiredCoverage

  for (const key in currentCoverage.total) {
    const requiredValue = requiredCoverage.coverageThreshold.global[key]
    const currentValue = currentCoverage.total[key].pct

    if (currentValue > requiredValue + coverageTolerance) {
      const newTolerance = currentCoverage.total[key].pct - coverageTolerance
      desiredCoverage.coverageThreshold.global[key] = Math.max(newTolerance, 0)
    }
  }

  fs.writeFile(
    path.resolve(__dirname, "./jest.coverage.json"),
    JSON.stringify(desiredCoverage, null, 2),
    "utf8",
    error => {
      if (error) console.log(error)
    }
  )
}

module.exports = results => {
  if (results.hasOwnProperty("coverageMap")) {
    coverageAutoBump()
  }
  return results
}
