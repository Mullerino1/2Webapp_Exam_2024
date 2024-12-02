import { baseUrl, endpoints } from "@/lib/config/urls";
import { ofetch } from "ofetch";
import { useState } from "react";

export default function DeleteCourse(props : { 
    courseId: string; 
    onRemove?: () => void
}) {
const [deleting, setDeleting] = useState(false)

async function handleRemove() {
    setDeleting(true)
    try {
    await ofetch(baseUrl + endpoints.courses, { method: "DELETE", query: { id: props.courseId } })
    }
    catch (error) {
    console.error("Unable to delete data:", error);
    return [];
  }
  finally {
    props.onRemove?.()
  }
}
return (
    <button onClick={handleRemove}
    disabled={deleting}
    className="bg-red-500 text-white px-4 rounded">
        {deleting? 'removing' : 'X'}
    </button>
)

}