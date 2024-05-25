import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({options}){
    const [searchParams, setSearchParams] = useSearchParams();
    const sortedBy = searchParams.get('sortBy') || ''

    function handleChange(e){
        searchParams.set('sortBy', e.target.value);
        setSearchParams(searchParams)
    }
return(
    <Select options={options} value={sortedBy} onChange={handleChange} type='white'></Select>
)
}

export default SortBy;