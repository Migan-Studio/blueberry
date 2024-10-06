import { container, Precondition } from '@sapphire/framework'
import { ChatInputCommandInteraction, Message, Snowflake } from 'discord.js'

class CheckChannelPreicondition extends Precondition {
  public async messageRun(msg: Message) {
    return await this._checkChannel(msg.author.id)
  }

  public async chatInputRun(interaction: ChatInputCommandInteraction) {
    return await this._checkChannel(interaction.user.id)
  }

  private async _checkChannel(userId: Snowflake) {
    const user = await this.container.database.user.findFirst({
      where: {
        user_id: userId,
      },
    })

    if (!user) return this.ok()

    return user.release_channel === this.container.channel
      ? this.ok()
      : this.error()
  }
}

void container.stores.loadPiece({
  piece: CheckChannelPreicondition,
  name: 'CheckChannel',
  store: 'preconditions',
})