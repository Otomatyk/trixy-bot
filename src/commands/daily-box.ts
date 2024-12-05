import type { CommandInteraction } from "discord.js";
import { type CommandConfig, Flashcore } from "robo.js";
import { addBox, chooseRandomBox, getUserBoxes } from "../boxes";

export const config: CommandConfig = {
	description: "Open your daily box !",
};

const MS_ONE_HOUR = 1000 * 60 * 60;
const MS_DELAY = 200;

export default async (interaction: CommandInteraction) => {
	const userId = interaction.user.id;

	console.log(await getUserBoxes(userId));

	if (!(await Flashcore.has(`${userId}-ms-since-last-box`))) {
		await Flashcore.set(`${userId}-ms-since-last-box`, 0);
	}

	const msSinceLastBox = Number.parseInt(
		await Flashcore.get(`${userId}-ms-since-last-box`),
	);

	if (Date.now() - msSinceLastBox >= MS_DELAY) {
		const box = await chooseRandomBox();

		await addBox(userId, box);

		await Flashcore.set(`${userId}-ms-since-last-box`, Date.now());

		return `You've just earned a **${box} box** !`;
	}

	return `You still have to wait ${Math.round(msSinceLastBox / MS_ONE_HOUR)} hours before opening annother box !`;
};
