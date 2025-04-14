import { Precondition } from "@sapphire/framework";

// Abondoned
export default class CheckChannelPreicondition extends Precondition {
	public async messageRun() {
		return await this._checkChannel();
	}

	public async chatInputRun() {
		return await this._checkChannel();
	}

	private async _checkChannel() {
		return this.ok();
	}
}
