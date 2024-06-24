import { count, gt } from "drizzle-orm";
import { db } from "./drizzle/db";
import { Users } from "./drizzle/schema";

async function main() {
    // await db.insert(UserPreferences).values({
    //     emailUpdates: false,
    //     userId: "b34786bc-76cc-4c95-8731-11dbeb9c01e7"
    // });
    // await db.delete(Users);
    // const user = await db.insert(Users).values([
    //     {
    //         name: "Vermaak",
    //         lastName: "van Wyk", 
    //         age: 47, 
    //         email: "vermaak@vanwykies.co.za"
    //     },
    //     {
    //         name: "Vanessa",
    //         lastName: "van Wyk", 
    //         age: 44, 
    //         email: "vanessa@vanwykies.co.za"
    //     }
    // ]).returning( {
    //     id: Users.id,
    //     email: Users.email
    // });

    //const user = await db.query.Users.findFirst();
    // const user = await db.query.Users.findMany({
    //     columns: { id: true, email: true, age: true },
    //     where: (table, funcs) => funcs.gt(table.age, 45),
    //     //orderBy: desc(Users.name),
    //     //orderBy: (table, funcs) => funcs.asc(table.name),
    //     orderBy: (table, {asc, desc, sql}) => desc(table.age),
    //     //columns: { age: false },
    //     //extras: { lowercaseName: sql<string>`lower(${Users.name})`.as("lowercaseName") }
    //     //limit: 1,
    //     //offset: 1,
    //     //with: { preferences: true}
    //     with: { 
    //         preferences: {
    //             columns: {
    //                 emailUpdates:true
    //             }
    //         },
    //         posts: { 
    //             with: {
    //                 postCategories: true
    //             }
    //         }         
    //     }
    // });

    //const user = await db.query.Users.findFirst();

    const user = await db
        //.select({ id: Users.id, age: Users.age, emailUpdates: UserPreferences.emailUpdates })
        //.select({ lastName: Users.lastName, averageAge: avg(Users.age) })
        .select({ age: Users.age, count: count(Users.age) })
        .from(Users)
        //.leftJoin(UserPreferences, eq(UserPreferences.userId, Users.id))
        //.where(eq(Users.age, 44))
        //.groupBy(Users.lastName);
        .groupBy(Users.age)
        .having(columns => gt(columns.age, 45));

    // const user = await db.update(Users).set({
    //     name: "Vermaak"
    // }).where(eq(Users.id, "b34786bc-76cc-4c95-8731-11dbeb9c01e7"))

    //const user = await db.delete(Users).where(eq(Users.id, ""))


    console.log("User", user);
}

main();
