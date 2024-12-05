import type { CommandInteraction } from "discord.js";
import type { CommandConfig } from "robo.js";
import { getUserBoxes } from "../boxes";
import { getUserCoins } from "../coins";

export const config: CommandConfig = {
	description: "Check your inventory",
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;

	const userCoins = await getUserCoins(userId);
	const userBoxes = await getUserBoxes(userId);

	const message: string[] = [];

	if (userCoins === 0) {
		message.push("You don't have any coins.\n");
	} else {
		message.push(`You have ${userCoins} coins.\n`);
	}

	if (userBoxes.length === 0) {
		message.push("You don't have any box yet.");
	} else {
		message.push("Here are your boxes : ");

		for (const box of userBoxes) {
			message.push(`- **${box}** box`);
		}
	}

	return message.join("\n");
};
