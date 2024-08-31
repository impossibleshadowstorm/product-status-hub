/*
  Warnings:

  - You are about to alter the column `designDate` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "brandName" TEXT NOT NULL,
    "genericName" TEXT NOT NULL,
    "partyName" TEXT NOT NULL,
    "packing" TEXT NOT NULL,
    "boxSize" TEXT NOT NULL,
    "foilSize" TEXT NOT NULL,
    "designDate" DATETIME NOT NULL,
    "approvalDate" DATETIME,
    "boxCdrSent" DATETIME,
    "labelCdrSent" DATETIME,
    "cylinderCdrSent" DATETIME
);
INSERT INTO "new_Product" ("approvalDate", "boxCdrSent", "boxSize", "brandName", "cylinderCdrSent", "designDate", "foilSize", "genericName", "id", "labelCdrSent", "packing", "partyName") SELECT "approvalDate", "boxCdrSent", "boxSize", "brandName", "cylinderCdrSent", "designDate", "foilSize", "genericName", "id", "labelCdrSent", "packing", "partyName" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
