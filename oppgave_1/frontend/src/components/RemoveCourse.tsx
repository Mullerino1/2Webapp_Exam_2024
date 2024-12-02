import { useState } from "react";

export default function DeleteCourse(props : { 
    courseId: string; 
    onRemove?: () => void
}) {
const [deleting, setDeleting] = useState(false)

function handleRemove() {
    setDeleting(true)

    fetch (`/api/courses/${props.courseId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (!response.ok) {
            Error('coudlnt delete course')
        }

        props.onRemove?.()
    })
    .catch(error => {
        console.error('Failed ot delete course', error)
        setDeleting(false)

    })
}
return (
    <button onClick={handleRemove}
    disabled={deleting}>
        {deleting? 'removing' : 'Delete course'}
    </button>
)

}