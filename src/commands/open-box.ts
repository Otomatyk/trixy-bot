import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type CommandInteraction,
	type Interaction,
} from "discord.js";
import type { CommandConfig } from "robo.js";
import { BoxeType, consumeBox, getUserBoxes } from "../boxes";

export const config: CommandConfig = {
	description: "Replies with Pong!",
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;

	const row = new ActionRowBuilder();

	const userBoxes = await getUserBoxes(userId);

	for (const box of [
		BoxeType.Wood,
		BoxeType.Iron,
		BoxeType.Gold,
		BoxeType.Diamond,
	]) {
		if (!userBoxes.includes(box)) continue;

		row.addComponents(
			new ButtonBuilder()
				.setLabel(box)
				.setStyle(ButtonStyle.Secondary)
				.setCustomId(box),
		);
	}

	const response = await interaction.reply({
		content: "Open a box of your choice",
		components: userBoxes.length === 0 ? [] : [row],
	});

	const collectorFilter = (i: Interaction) => i.user.id === interaction.user.id;

	try {
		const confirmation = await response.awaitMessageComponent({
			filter: collectorFilter,
			time: 60_000,
		});

		if (confirmation.customId === "wood") {
			await consumeBox(userId, BoxeType.Wood);

			await interaction.editReply({
				content: "You opened a box",
				components: [],
			});
		}
	} catch (e) {
		await interaction.editReply({
			content: "Confirmation not received within 1 minute, cancelling",
			components: [],
		});
	}
};
