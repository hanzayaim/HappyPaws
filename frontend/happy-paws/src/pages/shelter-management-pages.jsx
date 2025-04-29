import { useState } from "react";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationLink,
} from "../components/ui/pagination";
import {
  EditShelterDialog,
  DeleteShelterDialog,
  ApproveShelterDialog,
  RejectShelterDialog,
  ActivateShelterDialog,
  DeactivateShelterDialog,
} from "../components/pages-components/ShelterDialog";
import { Pencil, Trash, ToggleRight, ToggleLeft, Check, X } from "lucide-react";
import Layout from "../app/layout";

const users = [
  {
    id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f81",
    owner_name: "Bima Sakti",
    email: "rrdc@gmail.com",
    shelter_name: "RRDC Shelter",
    phone_number: "082137174314",
    address: "Jalan Kaliurang, Yogyakarta",
    status: "New",
  },
  {
    id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f82",
    owner_name: "Bima Sakti",
    email: "rrdc@gmail.com",
    shelter_name: "RRDC Shelter",
    phone_number: "082137174314",
    address: "Jalan Kaliurang, Yogyakarta",
    status: "Active",
  },
  {
    id_shelter: "SHELTER-7aeb025a-bdfb-4ec7-a0c1-79065df2f6f83",
    owner_name: "Bima Sakti",
    email: "rrdc@gmail.com",
    shelter_name: "RRDC Shelter",
    phone_number: "082137174314",
    address: "Jalan Kaliurang, Yogyakarta",
    status: "Inactive",
  },
];

export default function ShelterManagementPages() {
  const itemsPerPage = 5;

  const [userCurrentPage, setUserCurrentPage] = useState(1);

  const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [approveUserDialogOpen, setApproveUserDialogOpen] = useState(false);
  const [rejectUserDialogOpen, setRejectUserDialogOpen] = useState(false);
  const [activateUserDialogOpen, setActivateUserDialogOpen] = useState(false);
  const [deactivateUserDialogOpen, setDeactivateUserDialogOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const userTotalPages = Math.ceil(users.length / itemsPerPage);
  const userStartIndex = (userCurrentPage - 1) * itemsPerPage;
  const currentUsers = users.slice(
    userStartIndex,
    userStartIndex + itemsPerPage
  );

  const handleUserPageChange = (page) => {
    if (page >= 1 && page <= userTotalPages) {
      setUserCurrentPage(page);
    }
  };

  const handleEditUserClick = (user) => {
    setSelectedUser(user);
    setEditUserDialogOpen(true);
  };

  const handleDeleteUserClick = (user) => {
    setSelectedUser(user);
    setDeleteUserDialogOpen(true);
  };

  const handleApproveUserClick = (user) => {
    setSelectedUser(user);
    setApproveUserDialogOpen(true);
  };

  const handleRejectUserClick = (user) => {
    setSelectedUser(user);
    setRejectUserDialogOpen(true);
  };

  const handleActivateUserClick = (user) => {
    setSelectedUser(user);
    setActivateUserDialogOpen(true);
  };

  const handleDeactivateUserClick = (user) => {
    setSelectedUser(user);
    setDeactivateUserDialogOpen(true);
  };

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">User Management</Label>
        <div className="flex justify-between items-center w-full">
          <Label className="text-2xl font-medium">Shelter</Label>
        </div>
        <EditShelterDialog
          open={editUserDialogOpen}
          onOpenChange={setEditUserDialogOpen}
          user={selectedUser}
        />
        <DeleteShelterDialog
          open={deleteUserDialogOpen}
          onOpenChange={setDeleteUserDialogOpen}
          user={selectedUser}
        />
        <ApproveShelterDialog
          open={approveUserDialogOpen}
          onOpenChange={setApproveUserDialogOpen}
          user={selectedUser}
        />
        <RejectShelterDialog
          open={rejectUserDialogOpen}
          onOpenChange={setRejectUserDialogOpen}
          user={selectedUser}
        />
        <ActivateShelterDialog
          open={activateUserDialogOpen}
          onOpenChange={setActivateUserDialogOpen}
          user={selectedUser}
        />
        <DeactivateShelterDialog
          open={deactivateUserDialogOpen}
          onOpenChange={setDeactivateUserDialogOpen}
          user={selectedUser}
        />
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Owner Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Shelter Name</TableHead>
                <TableHead className="text-center">Phone Number</TableHead>
                <TableHead className="text-center">Address</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.map((user, index) => (
                <TableRow key={user.id_shelter}>
                  <TableCell className="text-center">
                    {userStartIndex + index + 1}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.owner_name}
                  </TableCell>
                  <TableCell className="text-center">{user.email}</TableCell>
                  <TableCell className="text-center">
                    {user.shelter_name}
                  </TableCell>
                  <TableCell className="text-center">
                    {user.phone_number}
                  </TableCell>
                  <TableCell className="text-center">{user.address}</TableCell>
                  <TableCell className="text-center">{user.status}</TableCell>
                  <TableCell className="flex gap-1 justify-center">
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleApproveUserClick(user)}
                    >
                      <ToggleRight className="size-4" />
                      Approve
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleRejectUserClick(user)}
                    >
                      <ToggleLeft className="size-4" />
                      Reject
                    </Button>
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleActivateUserClick(user)}
                    >
                      <Check className="size-4" />
                      Activate
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleDeactivateUserClick(user)}
                    >
                      <X className="size-4" />
                      Deactivate
                    </Button>
                    <Button
                      className="text-sm"
                      variant="success"
                      onClick={() => handleEditUserClick(user)}
                    >
                      <Pencil className="size-4" />
                      Edit
                    </Button>
                    <Button
                      className="text-sm"
                      variant="alert"
                      onClick={() => handleDeleteUserClick(user)}
                    >
                      <Trash className="size-4" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="w-full flex justify-start mt-4">
            <Pagination className="w-full">
              <PaginationContent className="justify-start gap-1">
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => handleUserPageChange(userCurrentPage - 1)}
                    className={
                      userCurrentPage === 1
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>

                {Array.from({ length: userTotalPages }).map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      isActive={userCurrentPage === i + 1}
                      onClick={() => handleUserPageChange(i + 1)}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    onClick={() => handleUserPageChange(userCurrentPage + 1)}
                    className={
                      userCurrentPage === userTotalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      </div>
    </Layout>
  );
}
