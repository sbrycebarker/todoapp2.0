UPDATE public.data
SET task = $2
WHERE task_id = $1;
