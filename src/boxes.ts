import { Flashcore } from "robo.js";

export enum BoxeType {
	Wood = "wood",
	Iron = "iron",
	Gold = "gold",
	Diamond = "diamond",
}

export const chooseRandomBox = async (): Promise<BoxeType> => {
	const n = Math.random(); // 0 - 1

	// 0.0 - 0.6 => 60%
	if (n <= 0.6) return BoxeType.Wood;

	// 0.6 - 0.8 => 20%
	if (n <= 0.8) return BoxeType.Iron;

	// 0.8 - 0.95 => 15%
	if (n <= 0.95) return BoxeType.Gold;

	// 0.95 - 1 => 5%
	return BoxeType.Diamond;
};

export const getUserBoxes = async (userId: string): Promise<BoxeType[]> => {
	if (!(await Flashcore.has(`${userId}-boxes`))) {
		await Flashcore.set(`${userId}-boxes`, []);

		return [];
	}

	return await Flashcore.get<BoxeType[]>(`${userId}-boxes`);
};

export const addBox = async (userId: string, box: BoxeType) => {
	await Flashcore.set(`${userId}-boxes`, [
		box,
		...(await getUserBoxes(userId)),
	]);
};

export const consumeBox = async (userId: string, box: BoxeType) => {
	const boxes = await getUserBoxes(userId);

	boxes.splice(boxes.indexOf(box));

	await Flashcore.set(`${userId}-boxes`, boxes);
};

// export const updateCoin = async (
// 	change: number,
// 	userId: string,
// ): Promise<number> => {
// 	if (!(await Flashcore.has(`${userId}-coins`))) {
// 		await Flashcore.set(`${userId}-coins`, 0);
// 	}

// 	const newValue = (await getUserCoins(userId)) + change;

// 	await Flashcore.set(`${userId}-coins`, newValue);

// 	return newValue;
// };

// export const getUserCoins = async (userId: string): Promise<number> => {
// 	if (!(await Flashcore.has(`${userId}-coins`))) {
// 		return 0;
// 	}

// 	return Number.parseInt(await Flashcore.get(`${userId}-coins`));
// };

// export const randomCoinsNumber = (): number => {
// 	return Math.floor(Math.random() * 100) + 20;
// };
