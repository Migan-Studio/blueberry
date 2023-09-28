import { RowDataPacket, createPool } from 'mysql2/promise'
import config from '../../config.json'

export interface BaseData extends RowDataPacket {
  id: number
  text: string
  created_at: string
  persona: string
}

export interface ResponseData extends BaseData {
  search_text: string
  conversation: string
  in_response_to: string | null
  search_in_response_to: string
}

export { BaseData as NSFWData }

const database = createPool(config.mysql)

setInterval(async () => {
  const db = await database.getConnection()
  await db.ping()
  db.release()
}, 60000)

export default database
