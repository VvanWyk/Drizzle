DO $$ BEGIN
 CREATE TYPE "public"."userRole" AS ENUM('ADMIN', 'BASIC');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "Categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "postCategory" (
	"postId" uuid NOT NULL,
	"categoryId" uuid NOT NULL,
	CONSTRAINT "postCategory_postId_categoryId_pk" PRIMARY KEY("postId","categoryId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"averageRating" real DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"authorId" uuid NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userPreferences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"emailUpdates" boolean DEFAULT false NOT NULL,
	"userId" uuid NOT NULL
);
--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "age" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "email" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "Users" ADD COLUMN "userRole" "userRole" DEFAULT 'BASIC' NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_postId_posts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."posts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_categoryId_Categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."Categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_Users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_Users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."Users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "emailIndex" ON "Users" USING btree ("email");