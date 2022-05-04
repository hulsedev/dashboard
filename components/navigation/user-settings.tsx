import React from 'react';
import { Popover, Link } from '@geist-ui/react';

const UserSettings: React.FC = () => (
  <>
    <Popover.Item title>
      <span>Dashboard</span>
    </Popover.Item>
    <Popover.Item>
      <Link href="/clusters">Clusters</Link>
    </Popover.Item>
    <Popover.Item>
      <Link href={process.env.NEXT_PUBLIC_HULSE_API_URL + 'docs'}>Docs</Link>
    </Popover.Item>
    <Popover.Item line />
    <Popover.Item>
      <Link href={process.env.NEXT_PUBLIC_HULSE_API_URL + 'logout'}>Logout</Link>
    </Popover.Item>
  </>
);

export default UserSettings;
