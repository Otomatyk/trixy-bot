import type { CommandInteraction } from "discord.js";
import type { CommandConfig } from "robo.js";
import { updateCoin } from "../coins";

export const config: CommandConfig = {
	description: "Change coin of a member.",
	options: [
		{
			name: "member",
			description: "Chose a member.",
			type: "member",
			required: true,
		},
		{
			name: "coins",
			description: "Coins to change.",
			type: "integer",
			required: true,
		},
	],
};

export default async (interaction: CommandInteraction) => {
	if (!interaction.memberPermissions?.has("ManageGuild")) {
		await interaction.reply({
			content: "🚫 You don't have the permision to use this commande.",
			ephemeral: true,
		});

		return;
	}

	const coins = interaction.options.get("coins")?.value as number;
	const member = interaction.options.get("member");

	// @ts-ignore
	await updateCoin(coins, member?.user?.id);

	return "Your coins have been change.";
};
