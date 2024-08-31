import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const products = await prisma.product.findMany();
    return NextResponse.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      { error: "Error fetching products" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();

    // Validate that required fields are not null
    const {
      brandName,
      genericName,
      partyName,
      packing,
      boxSize,
      foilSize,
      designDate,
      approvalDate,
      boxCdrSent,
      labelCdrSent,
      cylinderCdrSent,
    } = data;

    if (
      !brandName ||
      !genericName ||
      !partyName ||
      !packing ||
      !boxSize ||
      !foilSize ||
      !designDate
    ) {
      return NextResponse.json(
        { error: "Required fields cannot be null" },
        { status: 400 }
      );
    }

    const newProduct = await prisma.product.create({
      data: {
        brandName,
        genericName,
        partyName,
        packing,
        boxSize,
        foilSize,
        designDate: new Date(designDate),
        approvalDate: approvalDate ? new Date(approvalDate) : null,
        boxCdrSent: boxCdrSent ? new Date(boxCdrSent) : null,
        labelCdrSent: labelCdrSent ? new Date(labelCdrSent) : null,
        cylinderCdrSent: cylinderCdrSent ? new Date(cylinderCdrSent) : null,
      },
    });

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { error: "Error adding product" },
      { status: 500 }
    );
  }
}
