import type { CommandInteraction } from "discord.js";
import type { CommandConfig } from "robo.js";
import { getUserCoins, updateCoin } from "../coins";

export const config: CommandConfig = {
	description: "Pay 100 coins and try to get the JACKPOT.",
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;
	const userCoins = await getUserCoins(userId);

	if (userCoins < 100) {
		return "You need to have 100 coins for play.";
	}

	updateCoin(-100, userId);

	const results: number[] = [];

	for (let i = 0; i < 3; i++) {
		results.push(Math.floor(Math.random() * 5));
	}

	if (results.every((i) => i === results[0])) {
		updateCoin(10000, userId);

		return `<:Casino:1312489510801772668> You **won** !!!
${results.map(() => "[<:SevenWIN:1313202304689766490>]").join(" - ")}
__**Ten thousand coins !!!**__
        `;
	}

	return `You **lost**, try again...
${results.map((i) => `[${i}]`).join(" - ")}
    `;
};
