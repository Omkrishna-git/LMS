import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { db } from "@/lib/db";
import { CourseSidebarClient } from "./course-sidebar-client";

interface Props {
    course: any;
    progressCount: number;
}

export const CourseSidebar = async ({ course, progressCount }: Props) => {
    const { userId } = auth();
    if (!userId) return redirect("/");

    const purchase = await db.purchase.findUnique({
        where: {
            userId_courseId: {
                userId,
                courseId: course.id,
            },
        },
    });

    return (
        <CourseSidebarClient
            course={course}
            progressCount={progressCount}
            userId={userId}
            purchaseExists={!!purchase}
            userName={"Your Name"} // Replace with actual profile name
        />
    );
};
