import { useEffect, useState } from "react";
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
  DeleteShelterDialog,
  ApproveShelterDialog,
  RejectShelterDialog,
  ActivateShelterDialog,
  DeactivateShelterDialog,
} from "../components/pages-components/ShelterDialog";
import { Pencil, Trash, ToggleRight, ToggleLeft, Check, X } from "lucide-react";
import Layout from "../app/layout";
import axios from "axios";
axios.defaults.withCredentials = true;

export default function EmployeeManagementPages() {
  const itemsPerPage = 50;

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userSession, setUserSession] = useState(null);

  const [userCurrentPage, setUserCurrentPage] = useState(1);

  // const [editUserDialogOpen, setEditUserDialogOpen] = useState(false);
  const [deleteUserDialogOpen, setDeleteUserDialogOpen] = useState(false);
  const [approveUserDialogOpen, setApproveUserDialogOpen] = useState(false);
  const [rejectUserDialogOpen, setRejectUserDialogOpen] = useState(false);
  const [activateUserDialogOpen, setActivateUserDialogOpen] = useState(false);
  const [deactivateUserDialogOpen, setDeactivateUserDialogOpen] =
    useState(false);

  const [selectedUser, setSelectedUser] = useState(null);

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUserSession = async () => {
      try {
        const response = await axios.get("/api/auth/profile", {
          withCredentials: true,
        });
        setUserSession(response.data);

        console.log("User session:", response.data);
      } catch (error) {
        console.error("Error fetching user session:", error);
        setError("Failed to authenticate. Please log in again.");
      }
    };

    fetchUserSession();
  }, []);

  useEffect(() => {
    const fetchShelterData = async () => {
      if (!userSession) return;
      try {
        setLoading(true);
        if (
          userSession.userType === "shelter" &&
          userSession.profile.role === "Owner"
        ) {
          console.log(":tes");
          const response = await axios.get(
            `/api/employees/getEmployeeData/${userSession.profile.id_shelter}`
          );
          if (!response.data.error) {
            const sortedData = sortSheltersByStatus(response.data.data || []);
            setUsers(sortedData);
          } else {
            setError(response.data.message);
          }
        } else {
          setError("Access level not supported for this view");
        }
      } catch (error) {
        console.error("Error fetching shelter data:", error);
        setError("Failed to load shelter data");
      } finally {
        setLoading(false);
      }
    };

    fetchShelterData();
  }, [userSession]);

  const sortSheltersByStatus = (shelters) => {
    const statusOrder = {
      New: 1,
      Active: 2,
      Inactive: 3,
    };

    return [...shelters].sort((a, b) => {
      return statusOrder[a.status] - statusOrder[b.status];
    });
  };

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

  // const handleEditUserClick = (user) => {
  //   setSelectedUser(user);
  //   setEditUserDialogOpen(true);
  // };

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

  const updateShelterStatus = async (id, status) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      const response = await axios.post("/api/shelters/updateShelterStatus", {
        id_shelter: id,
        status: status,
        email: selectedUser.email,
      });

      if (!response.data.error) {
        // Update user status and re-sort the list
        const updatedUsers = users.map((user) =>
          user.id_shelter === id ? { ...user, status: status } : user
        );
        const sortedUsers = sortSheltersByStatus(updatedUsers);
        setUsers(sortedUsers);

        setSuccessMessage(`Shelter status updated to ${status} successfully!`);
        return true;
      } else {
        setErrorMessage(response.data.message || "Failed to update status");
        return false;
      }
    } catch (error) {
      console.error("Error updating shelter status:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to update shelter status"
      );
      return false;
    }
  };

  const deleteShelter = async (id) => {
    try {
      setSuccessMessage("");
      setErrorMessage("");

      const response = await axios.post("/api/shelters/deleteShelterData", {
        id_shelter: id,
      });

      if (!response.data.error) {
        setUsers(users.filter((user) => user.id_shelter !== id));
        setSuccessMessage("Shelter deleted successfully!");
        return true;
      } else {
        setErrorMessage(response.data.message || "Failed to delete shelter");
        return false;
      }
    } catch (error) {
      console.error("Error deleting shelter:", error);
      setErrorMessage(
        error.response?.data?.message || "Failed to delete shelter"
      );
      return false;
    }
  };

  const canPerformAdminActions = () => {
    return userSession?.userType === "shelter";
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-svh p-6">
          <p>Loading shelter data...</p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-svh p-6">
          <p className="text-red-500">Error: {error}</p>
          <Button className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Layout>
    );
  }

  if (userSession && userSession.userType !== "shelter") {
    return (
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-svh p-6">
          <p className="text-red-500">
            You don't have permission to access this page.
          </p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="flex flex-col gap-6 min-h-svh w-full p-6 bg-gray-50">
        <Label className="text-3xl font-bold self-start">User Management</Label>
        <div className="flex justify-between items-center w-full">
          <Label className="text-2xl font-medium">Employee</Label>
        </div>
        {/* <EditShelterDialog
          open={editUserDialogOpen}
          onOpenChange={setEditUserDialogOpen}
          user={selectedUser}
          onSuccess={(updatedUser) => {
            setUsers(
              users.map((u) =>
                u.id_shelter === updatedUser.id_shelter ? updatedUser : u
              )
            );
          }}
        /> */}
        <DeleteShelterDialog
          open={deleteUserDialogOpen}
          onOpenChange={setDeleteUserDialogOpen}
          user={selectedUser}
          onConfirm={async () => {
            if (selectedUser) {
              const success = await deleteShelter(selectedUser.id_shelter);
              if (success) {
                setSuccessMessage("Shelter deleted successfully!");
              } else {
                setErrorMessage("Failed to delete shelter");
              }
            }
            setDeleteUserDialogOpen(false);
          }}
        />
        <ApproveShelterDialog
          open={approveUserDialogOpen}
          onOpenChange={setApproveUserDialogOpen}
          user={selectedUser}
          onConfirm={() => {
            if (selectedUser) {
              updateShelterStatus(selectedUser.id_shelter, "Active");
            }
            setApproveUserDialogOpen(false);
          }}
        />
        <RejectShelterDialog
          open={rejectUserDialogOpen}
          onOpenChange={setRejectUserDialogOpen}
          user={selectedUser}
          onConfirm={() => {
            if (selectedUser) {
              updateShelterStatus(selectedUser.id_shelter, "Inactive");
            }
            setRejectUserDialogOpen(false);
          }}
        />
        <ActivateShelterDialog
          open={activateUserDialogOpen}
          onOpenChange={setActivateUserDialogOpen}
          user={selectedUser}
          onConfirm={() => {
            if (selectedUser) {
              updateShelterStatus(selectedUser.id_shelter, "Active");
            }
            setActivateUserDialogOpen(false);
          }}
        />
        <DeactivateShelterDialog
          open={deactivateUserDialogOpen}
          onOpenChange={setDeactivateUserDialogOpen}
          user={selectedUser}
          onConfirm={() => {
            if (selectedUser) {
              updateShelterStatus(selectedUser.id_shelter, "Inactive");
            }
            setDeactivateUserDialogOpen(false);
          }}
        />
        {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {errorMessage}
          </div>
        )}
        <div className="p-4 bg-white rounded-sm shadow-md w-full overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">No.</TableHead>
                <TableHead className="text-center">Employee Name</TableHead>
                <TableHead className="text-center">Email</TableHead>
                <TableHead className="text-center">Shelter Name</TableHead>
                <TableHead className="text-center">Phone Number</TableHead>
                <TableHead className="text-center">Role</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentUsers.length > 0 ? (
                currentUsers.map((user, index) => (
                  <TableRow key={user.id_shelter}>
                    <TableCell className="text-center">
                      {userStartIndex + index + 1}
                    </TableCell>
                    <TableCell className="text-center">{user.name}</TableCell>
                    <TableCell className="text-center">{user.email}</TableCell>
                    <TableCell className="text-center">
                      {user.phone_number}
                    </TableCell>
                    <TableCell className="text-center">{user.gender}</TableCell>
                    <TableCell className="text-center">{user.role}</TableCell>
                    <TableCell className="text-center">
                      <span
                        className={`px-2 py-1 rounded-full ${
                          user.status === "New"
                            ? "bg-blue-100 text-blue-800"
                            : user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex gap-1 justify-center">
                      {canPerformAdminActions() && user.status === "New" && (
                        <>
                          <Button
                            className="text-sm w-28"
                            variant="success"
                            onClick={() => handleApproveUserClick(user)}
                          >
                            <ToggleRight className="size-4" />
                            Approve
                          </Button>
                          <Button
                            className="text-sm w-28"
                            variant="alert"
                            onClick={() => handleRejectUserClick(user)}
                          >
                            <ToggleLeft className="size-4" />
                            Reject
                          </Button>
                        </>
                      )}

                      {user.status === "Active" && (
                        <>
                          {canPerformAdminActions() && (
                            <Button
                              className="text-sm w-28"
                              variant="alert"
                              onClick={() => handleDeactivateUserClick(user)}
                            >
                              <X className="size-4" />
                              Deactivate
                            </Button>
                          )}
                          {/* <Button
                            className="text-sm w-28"
                            variant="blue"
                            onClick={() => handleEditUserClick(user)}
                          >
                            <Pencil className="size-4" />
                            Edit
                          </Button> */}
                          {canPerformAdminActions() && (
                            <Button
                              className="text-sm w-28"
                              variant="alert"
                              onClick={() => handleDeleteUserClick(user)}
                            >
                              <Trash className="size-4" />
                              Delete
                            </Button>
                          )}
                        </>
                      )}

                      {canPerformAdminActions() &&
                        user.status === "Inactive" && (
                          <>
                            <Button
                              className="text-sm w-28"
                              variant="success"
                              onClick={() => handleActivateUserClick(user)}
                            >
                              <Check className="size-4" />
                              Activate
                            </Button>
                            {/* <Button
                              className="text-sm w-28"
                              variant="blue"
                              onClick={() => handleEditUserClick(user)}
                            >
                              <Pencil className="size-4" />
                              Edit
                            </Button> */}
                            <Button
                              className="text-sm w-28"
                              variant="alert"
                              onClick={() => handleDeleteUserClick(user)}
                            >
                              <Trash className="size-4" />
                              Delete
                            </Button>
                          </>
                        )}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No shelter data found
                  </TableCell>
                </TableRow>
              )}
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
