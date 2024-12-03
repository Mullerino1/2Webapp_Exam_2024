-- CreateTable
CREATE TABLE "Events" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "slug" TEXT NOT NULL,
    "date" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "seats" INTEGER NOT NULL,
    "price" TEXT NOT NULL,
    "waiting_list" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Customers" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "phonenumber" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "approved" TEXT NOT NULL
);
