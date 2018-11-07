insert into public.users (username, authid, user_id)
values ($1, $2) returning username, authid;
