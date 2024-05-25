import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin(){
  const queryClient = useQueryClient();

  const {isLoading: isDeleting, mutate} = useMutation({
  mutationFn: deleteCabin,
  onSuccess:() => {
    queryClient.invalidateQueries({
      queryKey: ['cabins']
    });
    toast.success("Cabin deleted successfully");
  },
  onError: err => toast.error(err.message)
  })
  return {isDeleting, mutate}
}