import type { CommandInteraction } from "discord.js";
import type { CommandConfig } from "robo.js";
import { getUserCoins, updateCoin } from "../coins";

export const config: CommandConfig = {
	description: "A chance to double, a chance to split...",
	options: [
		{
			name: "coins",
			description: "Chose how many coins you beet.",
			type: "integer",
			required: true,
		},
	],
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;
	const userCoins = await getUserCoins(userId);
	const howManyCoins = interaction.options.get("coins")?.value as number;

	if (howManyCoins === 0) {
		return "You can't bet zero coins !";
	}

	if (userCoins < howManyCoins) {
		return "You don't have any coins, please get some coins.";
	}

	if (Math.random() <= 0.5) {
		updateCoin(Math.round(howManyCoins * 2), userId);
		return "You **won**, your bet is **doubled** <:Casino:1312489510801772668>.\n";
	}

	updateCoin(-howManyCoins, userId);
	return "You **lose** all your bet <:Casino:1312489510801772668>.\n";
};
