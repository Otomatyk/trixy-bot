import { Flashcore } from "robo.js";

export const updateCoin = async (
	change: number,
	userId: string,
): Promise<number> => {
	if (!(await Flashcore.has(`${userId}-coins`))) {
		await Flashcore.set(`${userId}-coins`, 0);
	}

	const newValue = (await getUserCoins(userId)) + change;

	await Flashcore.set(`${userId}-coins`, newValue);

	return newValue;
};

export const getUserCoins = async (userId: string): Promise<number> => {
	if (!(await Flashcore.has(`${userId}-coins`))) {
		return 0;
	}

	return Number.parseInt(await Flashcore.get(`${userId}-coins`));
};

export const randomCoinsNumber = (): number => {
	return Math.floor(Math.random() * 100) + 20;
};
