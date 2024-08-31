-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "genericName" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "packing" TEXT NOT NULL,
    "boxSize" TEXT NOT NULL,
    "foilSize" TEXT NOT NULL,
    "designDate" TEXT NOT NULL,
    "approvalDate" DATETIME,
    "boxCdrSent" DATETIME,
    "labelCdrSent" DATETIME,
    "cylinderCdrSent" DATETIME
);
