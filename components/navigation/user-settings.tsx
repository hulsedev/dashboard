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
      <Link href="http://localhost:8000">Docs</Link>
    </Popover.Item>
    <Popover.Item line />
    <Popover.Item>
      <Link href="http://localhost:8000/logout">Logout</Link>
    </Popover.Item>
  </>
);

export default UserSettings;
