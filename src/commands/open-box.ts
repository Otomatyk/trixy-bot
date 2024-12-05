import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	type CommandInteraction,
	type Interaction,
} from "discord.js";
import type { CommandConfig } from "robo.js";
import { BoxeType, consumeBox, getUserBoxes } from "../boxes";
import { updateCoin } from "../coins";

export const config: CommandConfig = {
	description: "Open a box of your inventory.",
};

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;

	const row = new ActionRowBuilder<ButtonBuilder>();

	const userBoxes = await getUserBoxes(userId);

if (userBoxes.length <= 0) {
	await interaction.reply({
		content: "You have no **boxes**.",
		ephemeral: true,
	});
	return;
} else {
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

		if (confirmation.customId === BoxeType.Wood) {
            await consumeBox(userId, BoxeType.Wood);
			let coinInBox = Math.round(Math.random() * 20)
			updateCoin(coinInBox, userId)
            await interaction.editReply({
                content: `You opened a **wooden box** <:WoodenBox:1291439060421967934>, and get ${coinInBox} coin.`,
                components: [],
            });
        }
		if (confirmation.customId === BoxeType.Iron) {
            await consumeBox(userId, BoxeType.Iron);
			let coinInBox = Math.round(Math.random()  * 40) + 30
			updateCoin(coinInBox, userId)
            await interaction.editReply({
                content: `You opened an **Iron box** <:IronBox:1291439152872685689>, and get ${coinInBox} coin.`,
                components: [],
            });
        }
		if (confirmation.customId === BoxeType.Gold) {
            await consumeBox(userId, BoxeType.Gold);
			let coinInBox = Math.round(Math.random() * 60) + 80
			updateCoin(coinInBox, userId)
            await interaction.editReply({
                content: `You opened a **Gold box** <:GoldenBox:1291439182731804743>, and get ${coinInBox} coin.`,
                components: [],
            });
        }
		if (confirmation.customId === BoxeType.Diamond) {
            await consumeBox(userId, BoxeType.Diamond);
			let coinInBox = Math.round(Math.random() * 100) + 250
			updateCoin(coinInBox, userId)
            await interaction.editReply({
                content: `You opened a **Dimaond box** <:DiamondBox:1291439208585498785>, and get ${coinInBox} coin.`,
                components: [],
            });
        }

	} catch (e) {
		await interaction.editReply({
			content: "Confirmation not received within 1 minute, cancelling",
			components: [],
		});
	}
}
	
};
