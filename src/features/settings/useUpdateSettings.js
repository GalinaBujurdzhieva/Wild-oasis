import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings(){
    const queryClient = useQueryClient()
    const {isLoading: isUpdating, mutate: editSetting} = useMutation({
        mutationFn: updateSetting,
        onSuccess: () =>{
            toast.success("Settings updated successfully");
            queryClient.invalidateQueries({
                queryKey: ['settings']
            })
        },
        onError: (err) => toast.error(err.message),
    })
    return {isUpdating, editSetting}
}