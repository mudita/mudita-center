export default interface SimInfo {
  // Number of the slot this card occupies.
  readonly slot: 1 | 2

  // Is this card currently used?
  readonly active: boolean

  // Phone number.
  readonly number: number

  // Card identifier and other magical numbers.
  readonly imei: number
  readonly iccid: number
  readonly meid: number
  readonly seid: string

  // Carrier's technical name (eg. Orange 36.1)
  readonly carrier: string

  // Carrier's human readable name (eg. Orange)
  readonly network: string

  // Strength of the signal. Float in 0-1 range.
  readonly networkLevel: number
}
