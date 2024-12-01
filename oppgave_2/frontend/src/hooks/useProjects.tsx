import { useCallback, useEffect, useState } from "react";
import type { Project as ProjectType } from "@/components/Types";
import projectApi from "@/lib/services/api"



type Status = "idle" | "loading" | "error" | "success" | "fetching"

export function useProjects(){
  const [status, setStatus] = useState<Status>("idle")
  const [data, setData] = useState<ProjectType[]>([])
  
  const [error, setError] = useState<string | null>(null)

  const isFetching = status === "fetching"
  const isLoading = status === "loading" || isFetching
  const isError = status === "error" || !!error
  const isIdle = status === "idle"
  const isSuccess = status === "success"

  let initialized = false


  useEffect(() => {
    if (!initialized) {
      initialized = true
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000")
        const data = await response.json()
        setData(data.data)
      } catch (error) {
        console.error("Error fetching data from server", error)
      }
    }
    fetchData()
  }
  }, [])


  const resetToIdle = useCallback(
    (timeout = 2000) => 
      setTimeout(() => {
        setStatus("idle")
      }, timeout),
      []
  )

   const fetchData = useCallback( async () => {
    try {
      setStatus("loading")
      const result = await projectApi.listProjects()

      setData(result?.data ?? [])

      setStatus("success")
    } catch (error) {
    setError("failed when fetching data")
  } finally {
    resetToIdle()
  }
}, [resetToIdle])




  const add = async (data: Partial<ProjectType>) => {
    console.log(data + '2')
    const { title = "", description = "", id= "", createdAt="", updatedAt = "" }  = data

    try {
      setStatus("loading")
      await projectApi.create({ title, description, id, createdAt, updatedAt})
      await fetchData()
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setError("failed to create project")
    } finally {
      resetToIdle
    }
  }

  const remove = async(id: string) => {
    try {
      setStatus("loading")
      await projectApi.remove(id)
      await fetchData()
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setError("failed to remove project")
    } finally  {
      resetToIdle
    }
  }

  const update = async (id: string, data: Partial<ProjectType>) => {
    try {
      setStatus("loading")
      await projectApi.update(id, data)
      await fetchData()
      setStatus("success")
    } catch (error) {
      setStatus("error")
      setError("failed to update the project")
    } finally {
      resetToIdle()
    }
  }

  return {
    add,
    remove,
    update,
    get: fetchData,
    data,
    error,
    status: {
      idle: isIdle,
      loading: isLoading,
      success: isSuccess,
      error: isError,
      fetching: isFetching,
    },
    }
  }

  export default useProjects
 

