ALTER TABLE "Categories" RENAME TO "categories";--> statement-breakpoint
ALTER TABLE "Users" RENAME TO "users";--> statement-breakpoint
ALTER TABLE "postCategory" DROP CONSTRAINT "postCategory_categoryId_Categories_id_fk";
--> statement-breakpoint
ALTER TABLE "posts" DROP CONSTRAINT "posts_authorId_Users_id_fk";
--> statement-breakpoint
ALTER TABLE "userPreferences" DROP CONSTRAINT "userPreferences_userId_Users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "postCategory" ADD CONSTRAINT "postCategory_categoryId_categories_id_fk" FOREIGN KEY ("categoryId") REFERENCES "public"."categories"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_authorId_users_id_fk" FOREIGN KEY ("authorId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "userPreferences" ADD CONSTRAINT "userPreferences_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
