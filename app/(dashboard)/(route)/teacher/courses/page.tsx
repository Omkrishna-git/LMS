import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { redirect } from "next/navigation";

// import { db } from "@/lib/db";

// import { DataTable } from "./_components/data-table";
// import { columns } from "./_components/columns";

const CoursesPage = async () => {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

    // const courses = await db.course.findMany({
    //     where: {
    //         userId,
    //     },
    //     orderBy: {
    //         createdAt: "desc",
    //     },
    // });

  return ( 
    <>
      <div className="p-6">
        {/* <DataTable columns={columns} data={courses} /> */}
      </div>

      <div>
        <Link href="/teacher/create">
          <Button>
            New Course
          </Button>
        </Link>
      </div>
    </>
   );
}
 
export default CoursesPage;