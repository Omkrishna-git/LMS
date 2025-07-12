
const CourseIdPage = ({
    params
}:{
    params: { courseId: string }
}) => {
    return ( 
        <div>
            Course Id page : {params.courseId}
        </div>
    );
}
 
export default CourseIdPage;