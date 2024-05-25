import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import {deleteBooking as deleteBookingAPI} from '../../services/apiBookings'

export function useDeleteBooking(){
    const queryClient = useQueryClient();
    
    const {mutate: deleteBooking, isLoading: isDeletingBooking} = useMutation({
        mutationFn: (bookingId) => deleteBookingAPI(bookingId),
        onSuccess: () => {
            toast.success(`Booking successfully deleted`);
            queryClient.invalidateQueries({active: true})
        },
        onError: err => toast.error(err.message)
        
    })
    return {deleteBooking, isDeletingBooking}
}