import { Button } from '@mantine/core';
import { cookies } from 'next/headers';
import type React from 'react';
import { createClient } from '@/utils/supabase/server';

async function HomePage(): Promise<React.ReactElement> {
  const cookieStore = await cookies();
  // const supabase = createClient(cookieStore);
  // const { data: todos } = await supabase.from('todos').select();

  return (
    <div>
      {/* <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul> */}
      <Button variant="filled">Button</Button>
    </div>
  );
}

export default HomePage;
