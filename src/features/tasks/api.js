import { supabase } from "../../services/supabase"

// GET TASKS
export async function getTasks(userId) {
  return await supabase
    .from("tasks")
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
}

// CREATE TASK
export async function createTask(task) {
  return await supabase
    .from("tasks")
    .insert([task])
    .select()
}

// UPDATE TASK
export async function updateTask(id, updates) {
  return await supabase
    .from("tasks")
    .update(updates)
    .eq("id", id)
}

// DELETE TASK
export async function deleteTask(id) {
  return await supabase
    .from("tasks")
    .delete()
    .eq("id", id)
}