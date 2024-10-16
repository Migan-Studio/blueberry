import { type Message, PermissionFlagsBits } from 'discord.js'
import { Command, container } from '@sapphire/framework'
import { ApplyOptions } from '@sapphire/decorators'
import { WordRelay } from '../modules'

@ApplyOptions<Command.Options>({
  name: '끝말잇기',
  aliases: ['끄투', '끄투리오'],
  description: '베리랑 끝말잇기를 해보세요.',
  detailedDescription: {
    usage: '베리야 끝말잇기',
  },
  preconditions: ['IsJoined', 'IsBlocked'],
})
class WordRelayCommand extends Command {
  public async messageRun(msg: Message<true>) {
    if (
      !msg.guild.members.me?.permissions.has(
        PermissionFlagsBits.CreatePublicThreads,
      )
    )
      return msg.reply('제게 공개 스레드 만들기 권한이 없어요.')

    new WordRelay().startGame(msg)
  }
}

void container.stores.loadPiece({
  piece: WordRelayCommand,
  name: 'wordRelay',
  store: 'commands',
})
