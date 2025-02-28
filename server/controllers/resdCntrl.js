import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";

export const createResidency = asyncHandler(async (req, res) => {
  // console.log("endpoint created");
  const {
    title,
    description,
    price,
    address,
    country,
    city,
    facilities,
    image,
    userEmail,
  } = req.body.data;

  console.log(req.body.data);
  try {
    const residency = await prisma.residency.create({
      data: {
        title,
        description,
        price,
        address,
        country,
        city,
        facilities,
        image,
        owner: { connect: { email: userEmail } },
      },
    });

    res.send({ message: "residency created successfully", residency });
  } catch (err) {
    if (err.code === "P2002") {
      throw new Error("A residency with address already there");
    }
    console.log(err);
    return res.status(500).send("Internel server error");
  }
});

//Function to get a all Document/residency.
export const getAllResidencies = asyncHandler(async (req, res) => {
  const residencies = await prisma.residency.findMany(
    {
    orderBy: {
      createdAt: "desc",
    },
  }
  );
  res.send(residencies);
});

//Function to get a Specific Document/residency.
export const getResidency = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const residency = await prisma.residency.findUnique({
      where: { id },
    });
    res.send(residency);
  } catch (err) {
    throw new Error(err.message);
  }
});
