import { useSearchParams } from "react-router-dom";

import Spinner from "../../ui/Spinner";
import CabinRow from "./CabinRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

import { useCabins } from "./useCabins";

function CabinTable(){
  const [searchParams] = useSearchParams();
  const {isLoading, cabins} = useCabins();

  const currentFilter = searchParams.get('discount');
  if(isLoading) return <Spinner />

  let filteredCabins;
  if (currentFilter === 'all' || !currentFilter) filteredCabins = cabins;
  if (currentFilter === 'no-discount') filteredCabins = cabins.filter(cabin => cabin.discount === 0);
  if (currentFilter === 'with-discount') filteredCabins = cabins.filter(cabin => cabin.discount > 0);

  const currentSortedBy = searchParams.get('sortBy') || 'name-asc';
  const [nameForSorting, direction] = currentSortedBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  let sortedCabins = filteredCabins.sort((a,b) => (a[nameForSorting] - b[nameForSorting])* modifier);
  
return(
  <Menus>
    <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
    <Table.Header>
      <div></div>
      <div>Cabin</div>
      <div>Capacity</div>
      <div>Price</div>
      <div>Discount</div>
      <div></div>
    </Table.Header>
    <Table.Body data={sortedCabins} render={cabin => <CabinRow cabin={cabin} key={cabin.id}/>}/>
  </Table>
  </Menus>
)
}
export default CabinTable
