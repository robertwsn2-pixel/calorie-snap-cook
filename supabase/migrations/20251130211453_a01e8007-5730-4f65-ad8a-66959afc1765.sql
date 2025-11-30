-- Create profiles table
create table public.profiles (
  id uuid not null references auth.users on delete cascade,
  user_id uuid not null unique references auth.users(id) on delete cascade,
  display_name text,
  avatar_url text,
  created_at timestamp with time zone not null default now(),
  updated_at timestamp with time zone not null default now(),
  primary key (id)
);

-- Enable Row Level Security
alter table public.profiles enable row level security;

-- Create policies for profiles
create policy "Profiles are viewable by everyone" 
  on public.profiles 
  for select 
  using (true);

create policy "Users can update their own profile" 
  on public.profiles 
  for update 
  using (auth.uid() = user_id);

create policy "Users can insert their own profile" 
  on public.profiles 
  for insert 
  with check (auth.uid() = user_id);

-- Create function to update timestamps
create or replace function public.handle_updated_at()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Create trigger for automatic timestamp updates
create trigger update_profiles_updated_at
  before update on public.profiles
  for each row
  execute function public.handle_updated_at();

-- Create function to handle new user registration
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, user_id, display_name)
  values (new.id, new.id, new.raw_user_meta_data->>'display_name');
  return new;
end;
$$;

-- Create trigger to automatically create profile on user signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();