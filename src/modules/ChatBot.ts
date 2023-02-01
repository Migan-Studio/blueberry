import type { Client, Message } from 'discord.js'
import Database from './Database'

type TrainType = 'muffinOnly' | 'All'

export default class ChatBot {
  get trainType(): TrainType {
    return this._trainType
  }

  set trainType(value: TrainType) {
    this._trainType = value
  }
  public db = new Database(process.env.DB_PATH!)
  private _trainType: TrainType = 'muffinOnly'

  public async getResponse(msg: Message): Promise<string> {
    const request = msg.content.replace('머핀아 ', '')
    const rows = await this.db.all()
    let response = rows[Math.floor(Math.random() * rows.length)].text
    if (!response) response = '살ㄹ려주세요'
    console.log(`⌨️ㅣ${request}`)
    console.log(`🍰ㅣ${response}`)
    // .then(rows => {
    //   const request = msg.content.replace('머핀아 ', '')
    //   response = rows[Math.floor(Math.random() * rows.length)].text
    //   if (!response) response = '살ㄹ려주세요'
    //   if (sendMsg) {
    //     msg.channel.sendTyping()
    //     setTimeout(() => msg.channel.send(response), 1000)
    //   }
    // })
    // .catch(console.error)
    return response
  }

  public train(client: Client): ChatBot {
    const sql = `INSERT INTO statement(text, persona, in_response_to) VALUES(?, ?, ?);`
    client.on('messageCreate', msg => {
      if (msg.author.bot) return
      if (msg.author.id !== '1026185545837191238') return
      this.getResponse(msg).then(response => {
        this.db.run(sql, [msg.content, 'muffin', response], err => {
          if (err) throw err
        })
      })
    })
    return this
  }

  public destroy(): void {
    this.db.close()
  }
}
