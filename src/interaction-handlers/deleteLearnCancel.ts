import { ApplyOptions } from '@sapphire/decorators'
import {
  InteractionHandler,
  InteractionHandlerTypes,
} from '@sapphire/framework'
import { ButtonInteraction } from 'discord.js'

@ApplyOptions<InteractionHandler.Options>({
  interactionHandlerType: InteractionHandlerTypes.Button,
})
export default class DeleteLearnCancelHandler extends InteractionHandler {
  private _CUSTOM_ID = 'maa$deleteLearn'

  public async parse(interaction: ButtonInteraction) {
    if (interaction.customId !== `${this._CUSTOM_ID}-cancel`) return this.none()
    return this.some()
  }

  public async run(interaction: ButtonInteraction) {
    return await interaction.update({
      embeds: [
        {
          title: '삭제',
          description: '아무것도 삭제하지 않았어요.',
          color: this.container.embedColors.fail,
        },
      ],
      components: [],
    })
  }
}
