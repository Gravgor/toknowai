import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';

// TODO: Replace with actual user data fetching
const mockUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'USER' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'ADMIN' },
  // Add more mock users as needed
];

const UserManagementTable: React.FC = () => {
  const handleDeleteUser = (userId: number) => {
    // TODO: Implement user deletion logic
    console.log(`Delete user with ID: ${userId}`);
  };

  const handleToggleRole = (userId: number) => {
    // TODO: Implement role toggle logic
    console.log(`Toggle role for user with ID: ${userId}`);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mockUsers.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.name}</TableCell>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.role}</TableCell>
            <TableCell>
              <Button onClick={() => handleToggleRole(user.id)} className="mr-2">
                Toggle Role
              </Button>
              <Button onClick={() => handleDeleteUser(user.id)} variant="destructive">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserManagementTable;