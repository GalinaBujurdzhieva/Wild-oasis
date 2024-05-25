import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { updateBooking } from "../../services/apiBookings";

export function useCheckin(){
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const {mutate: checkin, isLoading: isCheckingin} = useMutation({
        mutationFn: ({bookingId, breakfast}) => updateBooking(bookingId, {
            status: 'checked-in',
            isPaid: true,
            ...breakfast
        }),
        onSuccess:(data) => {
            toast.success(`Booking with #${data.id} was successfully checked-in.`),
            queryClient.invalidateQueries({active: true}),
            navigate('/')
        },
        onError: () => toast.error('Could not check in this booking!')
    })

    return {checkin, isCheckingin}
}