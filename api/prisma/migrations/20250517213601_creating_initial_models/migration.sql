-- CreateTable
CREATE TABLE "User" (
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'default.jpg',
    "cover" TEXT NOT NULL DEFAULT 'default.jpg',
    "bio" TEXT,
    "link" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("username")
);

-- CreateTable
CREATE TABLE "Tweet" (
    "id" SERIAL NOT NULL,
    "userTweet" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "answerOf" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Tweet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TweetLike" (
    "id" SERIAL NOT NULL,
    "userLike" TEXT NOT NULL,
    "tweetId" INTEGER NOT NULL,

    CONSTRAINT "TweetLike_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Follow" (
    "id" SERIAL NOT NULL,
    "followerId" TEXT NOT NULL,
    "followingId" TEXT NOT NULL,

    CONSTRAINT "Follow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trend" (
    "id" SERIAL NOT NULL,
    "hashtag" TEXT NOT NULL,
    "counter" INTEGER NOT NULL DEFAULT 1,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Trend_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Tweet" ADD CONSTRAINT "Tweet_userTweet_fkey" FOREIGN KEY ("userTweet") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_tweetId_fkey" FOREIGN KEY ("tweetId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TweetLike" ADD CONSTRAINT "TweetLike_userLike_fkey" FOREIGN KEY ("userLike") REFERENCES "User"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
