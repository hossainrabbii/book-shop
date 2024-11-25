import dotenve from 'dotenv'
import path from 'path'
dotenve.config({ path: path.join(process.cwd(), '.env') })

export default {
  database_url: process.env.DATABASE_URL,
  port: process.env.PORT,
}
