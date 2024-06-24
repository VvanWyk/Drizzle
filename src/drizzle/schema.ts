import { relations } from "drizzle-orm";
import { pgTable, pgEnum, uuid, varchar, integer, uniqueIndex, boolean, real, timestamp, primaryKey} from "drizzle-orm/pg-core";

export const UserRole = pgEnum("userRole", ["ADMIN", "BASIC"])

export const Users = pgTable("users", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length:255 }).notNull(),
    lastName: varchar("lastName", { length:255 }).notNull(),
    age: integer("age").notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    role: UserRole("userRole").default("BASIC").notNull()
}, table => {
    return {
        emailIndex: uniqueIndex("emailIndex").on(table.email)
    }
});

export const UserPreferences = pgTable("userPreferences", {
    id: uuid("id").primaryKey().defaultRandom(),    
    emailUpdates: boolean("emailUpdates").default(false).notNull(),
    userId: uuid("userId").references(() => Users.id).notNull(),
});

export const Posts = pgTable("posts", {
    id: uuid("id").primaryKey().defaultRandom(),
    title: varchar("title", { length:255 }).notNull(),
    averageRating: real("averageRating").notNull().default(0),
    createdAt: timestamp("createdAt").defaultNow().notNull(),
    updatedAt: timestamp("updatedAt").defaultNow().notNull(),
    authorId: uuid("authorId").references(() => Users.id).notNull()
});

export const Categories  = pgTable("categories", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length:255 }).notNull(),
});

export const PostCategory = pgTable("postCategory", {
    postId: uuid("postId").references(() => Posts.id).notNull(),
    categoryId: uuid("categoryId").references(() => Categories.id).notNull()
}, table => {
    return {
        pk: primaryKey({ columns: [table.postId, table.categoryId] })
    }
});

// RELATIONS
export const UserRelations = relations(Users, ({one, many}) => {
    return {
        preferences: one(UserPreferences),
        posts: many(Posts)
    }
})

export const UserPreferenceRelations = relations(UserPreferences, ({one}) => {
    return {
        user: one(Users, {
            fields: [UserPreferences.userId],
            references: [Users.id]
        })
    }
})

export const PostRelations = relations(Posts, ({one, many}) => {
    return {
        author: one(Users, {
            fields: [Posts.authorId],
            references: [Users.id]
        }),
        postCategories: many(PostCategory)
    }
})

export const CategoryRelations = relations(Categories, ({ many }) => {
    return {
        postCategories: many(PostCategory)
    }
});

export const PostCategoryRelations = relations(PostCategory, ({ one }) => {
    return {
        post: one(Posts, {
            fields: [PostCategory.postId],
            references: [Posts.id]
        }),
        category: one(Categories, {
            fields: [PostCategory.categoryId],
            references: [Categories.id]
        })
    }
});

