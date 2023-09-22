-- DropForeignKey
ALTER TABLE "musics" DROP CONSTRAINT "musics_userId_fkey";

-- AddForeignKey
ALTER TABLE "musics" ADD CONSTRAINT "musics_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
