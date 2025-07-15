"use client";

import { useState } from "react";
import { Chapter, Course, UserProgress } from "@prisma/client";

import { CourseProgress } from "@/components/course-progress";
import { CourseSidebarItem } from "./course-sidebar-item";
import { CertificateModal } from "@/components/modals/certificate-modal";
import { Button } from "@/components/ui/button";

interface CourseSidebarClientProps {
    course: Course & {
        chapters: (Chapter & {
            userProgress: UserProgress[] | null;
        })[];
    };
    progressCount: number;
    userId: string;
    purchaseExists: boolean;
    userName: string; // Optional: from auth or profile context
}

export const CourseSidebarClient = ({
    course,
    progressCount,
    userId,
    purchaseExists,
    userName,
}: CourseSidebarClientProps) => {

    const [showCertificateModal, setShowCertificateModal] = useState(false);

    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm">
            <div className="p-7 flex flex-col border-b">
                <h1 className="font-semibold">{course.title}</h1>
                {purchaseExists && (
                    <div className="mt-10">
                        <CourseProgress variant="success" value={progressCount} />
                    </div>
                )}
            </div>

            <div className="flex flex-col w-full">
                {course.chapters.map((chapter) => (
                    <CourseSidebarItem
                        key={chapter.id}
                        id={chapter.id}
                        label={chapter.title}
                        isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
                        courseId={course.id}
                        isLocked={!chapter.isFree && !purchaseExists}
                    />
                ))}
            </div>

            {purchaseExists && (
                <div className="mt-auto p-4 border-t">
                    <Button
                        disabled={progressCount < 100}
                        onClick={() => {
                            if (progressCount < 100) {
                                alert("Complete the course to download your certificate!");
                            } else {
                                setShowCertificateModal(true);
                            }
                        }}
                        className="w-full bg-sky-900 hover:bg-sky-800 text-white font-semibold"
                        variant={progressCount < 100 ? "secondary" : "default"}
                    >
                        {progressCount < 100
                        ? "Complete Course to Unlock"
                        : "Download Certificate"}
                    </Button>
                </div>
            )}

            <CertificateModal
                open={showCertificateModal}
                onClose={() => setShowCertificateModal(false)}
                courseId={course.id}
                userName={userName}
            />  
        </div>
    );
};
