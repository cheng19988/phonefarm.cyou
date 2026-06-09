-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitPriceUsd" REAL NOT NULL,
    "lineTotalUsd" REAL NOT NULL,
    CONSTRAINT "OrderItem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "OrderItem_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "orderNumber" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "productId" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "orderType" TEXT NOT NULL DEFAULT 'purchase',
    "status" TEXT NOT NULL DEFAULT 'pending payment',
    "expectedAmount" REAL NOT NULL,
    "receivedAmount" REAL,
    "paymentAddress" TEXT NOT NULL,
    "paymentNetwork" TEXT NOT NULL DEFAULT 'Tron',
    "paymentCurrency" TEXT NOT NULL DEFAULT 'USDT',
    "txHash" TEXT,
    "paymentStatus" TEXT NOT NULL DEFAULT 'unpaid',
    "verificationStatus" TEXT NOT NULL DEFAULT 'pending',
    "customerName" TEXT,
    "customerEmail" TEXT,
    "contactMessaging" TEXT,
    "country" TEXT,
    "shippingAddress" TEXT,
    "orderNotes" TEXT,
    "adminNote" TEXT,
    "expiresAt" DATETIME NOT NULL,
    "paidAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Order_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Order" ("createdAt", "expectedAmount", "expiresAt", "id", "orderNumber", "orderType", "paidAt", "paymentAddress", "paymentCurrency", "paymentNetwork", "paymentStatus", "productId", "quantity", "receivedAmount", "status", "txHash", "updatedAt", "userId", "verificationStatus") SELECT "createdAt", "expectedAmount", "expiresAt", "id", "orderNumber", "orderType", "paidAt", "paymentAddress", "paymentCurrency", "paymentNetwork", "paymentStatus", "productId", "quantity", "receivedAmount", "status", "txHash", "updatedAt", "userId", "verificationStatus" FROM "Order";
DROP TABLE "Order";
ALTER TABLE "new_Order" RENAME TO "Order";
CREATE UNIQUE INDEX "Order_orderNumber_key" ON "Order"("orderNumber");
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "shortDesc" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "features" TEXT NOT NULL,
    "specs" TEXT NOT NULL,
    "scenarios" TEXT NOT NULL,
    "accessories" TEXT NOT NULL,
    "delivery" TEXT NOT NULL,
    "maintenance" TEXT NOT NULL,
    "faq" TEXT NOT NULL,
    "priceUsd" REAL NOT NULL,
    "stock" INTEGER NOT NULL DEFAULT 10,
    "imageCard" TEXT NOT NULL,
    "imageHero" TEXT NOT NULL,
    "imageDetail" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "directPurchaseEnabled" BOOLEAN NOT NULL DEFAULT false,
    "quoteOnly" BOOLEAN NOT NULL DEFAULT false,
    "productType" TEXT NOT NULL DEFAULT 'hardware',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("accessories", "category", "createdAt", "delivery", "description", "faq", "features", "id", "imageCard", "imageDetail", "imageHero", "maintenance", "name", "priceUsd", "published", "scenarios", "shortDesc", "slug", "specs", "stock", "updatedAt") SELECT "accessories", "category", "createdAt", "delivery", "description", "faq", "features", "id", "imageCard", "imageDetail", "imageHero", "maintenance", "name", "priceUsd", "published", "scenarios", "shortDesc", "slug", "specs", "stock", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
