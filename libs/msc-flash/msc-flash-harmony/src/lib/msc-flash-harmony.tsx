import styles from "./msc-flash-harmony.module.css"

/* eslint-disable-next-line */
export interface MscFlashHarmonyProps {}

export function MscFlashHarmony(props: MscFlashHarmonyProps) {
  return (
    <div className={styles["container"]}>
      <h1>Welcome to MscFlashHarmony!</h1>
    </div>
  )
}

export default MscFlashHarmony
