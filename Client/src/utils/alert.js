import Swal from "sweetalert2";

const alertConfirm = () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });
};

const alertError = (message) => {
  return Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message,
  });
};

export { alertConfirm, alertError };
