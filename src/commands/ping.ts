import type { CommandInteraction } from "discord.js";
import type { CommandConfig } from "robo.js";
import { getUserCoins } from "../coins";
import { updateCoin } from "../coins";

export const config: CommandConfig = {
	description: "Pay 100 coins and try to got the JACKPOT.",
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;
	const userCoins = await getUserCoins(userId)
	const message: string[] = [];

	const a = Math.round(Math.random() * 5)
	const b = Math.round(Math.random() * 5)
	const c = Math.round(Math.random() * 5)

	if (userCoins > 99) {

		updateCoin(-100, userId)

		if (a == b && a == c) {
			updateCoin(10000, userId)
			message.push(`<:Casino:1312489510801772668> You **win** !!!\n`);
			message.push(`[<:SevenWIN:1313202304689766490>]-[<:SevenWIN:1313202304689766490>]-[<:SevenWIN:1313202304689766490>]`)
			message.push(`__**Ten thousand coins !!!**__`)
		} else {
			message.push("You **lose**, try again...\n");
			message.push(`[${a}]-[${b}]-[${c}]`)
		}
	} else {
		message.push("You need to have 100 coins for play.")

	}
	return message.join("\n");
};








//import type { CommandConfig } from 'robo.js'
//
//export const config: CommandConfig = {
//	description: 'Replies with Pong!'
//}
//
//export default () => {
//	return 'Pong!'
//}