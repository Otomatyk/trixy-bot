import { Flashcore } from "robo.js";

export enum BoxeType {
	Wood = "wood",
	Iron = "iron",
	Gold = "gold",
	Diamond = "diamond",
}

export const chooseRandomBox = async (): Promise<BoxeType> => {
	const n = Math.random(); // 0 - 1

	// 0.0 - 0.5 => 50%
	if (n <= 0.6) return BoxeType.Wood;

	// 0.6 - 0.8 => 30%
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

    const index = boxes.indexOf(box);
    if (index !== -1) {
        boxes.splice(index, 1); 
    }
	
	await Flashcore.set(`${userId}-boxes`, boxes);
};
