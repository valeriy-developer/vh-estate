import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getManager = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { cognitoId } = req.params;

		if (!cognitoId) {
			res.status(400).json({ message: "Missing cognitoId param" });
			return;
		}

		const manager = await prisma.manager.findUnique({
			where: { cognitoId },
		});

		if (!manager) {
			res.status(404).json({ message: "Manager not found" });
			return;
		}

		res.json(manager);
	} catch (err: any) {
		res
			.status(500)
			.json({ message: `Error retrieving manager: ${err.message}` });
	}
};

export const createManager = async (
	req: Request,
	res: Response
): Promise<void> => {
	try {
		const { cognitoId, name, email, phoneNumber } = req.body;

		const manager = await prisma.manager.create({
			data: {
				cognitoId,
				name,
				email,
				phoneNumber,
			},
		});

		res.status(201).json(manager);
	} catch (error: any) {
		res
			.status(500)
			.json({ message: `Error creating manager: ${error.message}` });
	}
};
