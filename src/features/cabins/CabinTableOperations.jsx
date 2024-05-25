import TableOperations from "../../ui/TableOperations"
import Filter from "../../ui/Filter"
import SortBy from "../../ui/SortBy"

function CabinTableOperations(){
return(
    <TableOperations>
        <Filter filterField={'discount'} options={[
            { label: 'All', value: 'all'},
            { label: 'With discount', value: 'with-discount'},
            { label: 'No discount', value: 'no-discount'}
            ]}/>
        <SortBy options={[
            {label: 'Name (A-Z)', value: 'name-asc'},
            {label: 'Name (Z-A)', value: 'name-desc'},
            {label: 'Capacity (low first)', value: 'maxCapacity-asc'},
            {label: 'Capacity (high first)', value: 'maxCapacity-desc'},
            {label: 'Price (cheap first)', value: 'regularPrice-asc'},
            {label: 'Price (expensive first)', value: 'regularPrice-desc'},
        ]}/>
    </TableOperations>
)
}
export default CabinTableOperations