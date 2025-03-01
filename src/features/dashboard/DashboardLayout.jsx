import styled from "styled-components";

import Spinner from "../../ui/Spinner";

import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import { useCabins } from "../cabins/useCabins";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import TodayActivity from "../check-in-out/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout (){
  const {isLoading: isLoading1, bookings, numDays} = useRecentBookings();
  const {isLoading: isLoading2, stays, confirmedStays} = useRecentStays();
  const {isLoading: isLoading3, cabins} = useCabins();

if (isLoading1 ||isLoading2 || isLoading3) return <Spinner />

const cabinsCount = cabins.length;

return(
  <StyledDashboardLayout>
    <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinsCount={cabinsCount}/>
    <TodayActivity />
    <DurationChart confirmedStays={confirmedStays}/>
    <SalesChart bookings={bookings} numDays={numDays}/>
  </StyledDashboardLayout>
)
}
export default DashboardLayout
