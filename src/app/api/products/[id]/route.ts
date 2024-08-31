import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
    });

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "Error fetching product" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const data = await req.json();

    const updatedProduct = await prisma.product.update({
      where: { id: params.id },
      data: {
        ...data,
        designDate: data.designDate ? new Date(data.designDate) : null,
        approvalDate: data.approvalDate ? new Date(data.approvalDate) : null,
        boxCdrSent: data.boxCdrSent ? new Date(data.boxCdrSent) : null,
        labelCdrSent: data.labelCdrSent ? new Date(data.labelCdrSent) : null,
        cylinderCdrSent: data.cylinderCdrSent
          ? new Date(data.cylinderCdrSent)
          : null,
      },
    });

    return NextResponse.json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { error: "Error updating product" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const deletedProduct = await prisma.product.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedProduct);
  } catch (error) {
    console.error("Error deleting product:", error);
    return NextResponse.json(
      { error: "Error deleting product" },
      { status: 500 }
    );
  }
}
