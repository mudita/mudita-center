import * as dotenv from "dotenv"
import { CleanUpFactory } from "../cleanup"

dotenv.config()

new CleanUpFactory().create().cleanUpDevice()
