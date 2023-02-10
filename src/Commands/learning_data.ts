import { Command, ResponseData } from '../modules'
import { type Message } from 'discord.js'

export default class extends Command {
  public constructor() {
    super('학습데이터량')
  }
  public async execute(msg: Message, args: string[]) {
    const db = await msg.client.chatBot.db
    const [rows] = await db.execute<ResponseData[]>('SELECT * FROM statement;')
    const muffin: ResponseData[] = []
    rows.forEach(row => {
      if (row.persona === 'muffin') muffin.push(row)
      else return
    })
    msg.channel.send(`머핀 데이터: ${muffin.length}개`)
  }
}
