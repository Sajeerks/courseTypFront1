import { useDispatch, useSelector } from "react-redux"
import "./UserList.css"
import { AppDispatch, RootState } from "../Redux/store"
import { Fragment, useEffect, useMemo, useState } from "react"
import { getAllUsersFrontEnd } from "../Redux/usersReducer"
import { userTypeInFrontEnd } from "../Redux/userReducer"
// import { Loading } from "../Loading/Loading"
import { LoadingWithPercentage } from "../Loading/LoadingWithPercentage"
import { progressUploadedorExport } from "../../App"
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import {
  Column,
  Table,
  useReactTable,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  // // getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  // // getPaginationRowModel,
  // // sortingFns,
  getSortedRowModel,
  // // FilterFn,
  // // SortingFn,
  // // ColumnDef,
  flexRender,
  getPaginationRowModel,
  // FilterFns,
  // createColumnHelper,
  // ColumnResizeMode,
 
} from '@tanstack/react-table'
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import moment from "moment"


const UserList = () => {
  const dispatch = useDispatch<AppDispatch>()
  const {loading:allUsersLoading,users
  } = useSelector((state:RootState)=>state.users)
  const [allusersFetched, setallusersFetched] = useState<userTypeInFrontEnd[] | null>(null)


  
  const [tableData, setdataTable] = useState<userTypeInFrontEnd[]>([])

  const [columFilter22, setcolumFilter22] = useState<ColumnFiltersState>([])
  const [sortingTable, setsortingTable] = useState<any[]>([])



  const columns = [
       {
    accessorKey:"_id",
    header:"user ID",
    size:225,
    cell:(props:any)=>{

    return (<p>{props.getValue()}</p>)}
  },
  {
    accessorKey:"actions",
    header:"course actions",
    cell:(props:any)=>{
      // console.log(props);
      // console.log(props.row.original._id);

      return (
        <Box>
     
    <Link to={`/course/user/edit/${props.row.original._id}`}>   <Button sx={{m:1, height:"30px",  fontSize:"10px", }}   variant="contained">update user</Button></Link>  

   <Button sx={{m:1, height:"30px", fontSize:"10px" , bgcolor:"red"}} variant="contained">delete user</Button>


 
 
  </Box>
      )
    }
      
      
     ,
    enableColumnFilter:false
  },
  {
    accessorKey:"name",
    header:"user name",
    cell: (props:any)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"email",
    header:"user email",
    size:225,
    cell: (props:any)=><p>{props.getValue()}</p>
  },
  
  {
    accessorKey:"role",
    header:"user role",
    cell:(props:any)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"createdAt",
    header:"user created at",
    cell:(props:any)=><p>{ moment(props.getValue().split("T")[0]).format("DD-MMM-YY")}</p>
  },
  {
    accessorKey:"avatar",
    header:"user image",
    cell:(props:any)=><img src={props.getValue().url} style={{width:"50px", }}/>,
    enableColumnFilter:false
  },


]
  

  const table = useReactTable({
    data:tableData,
    columns,
    state:{
     columnFilters:columFilter22,
     sorting:sortingTable,
     
    },
    getCoreRowModel:getCoreRowModel(),
    getFilteredRowModel:getFilteredRowModel(),
  
    columnResizeMode:"onChange",
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel:getPaginationRowModel(),
    // meta:{
    //   updateData: (rowIndex:number, columnId:number,value:string)=>setdataTable((prev)=>
    //     prev.map((row,index)=>
    //      index == rowIndex?{...prev[rowIndex],[columnId]:value}:row
    //     )
         
    //   )
    // },
    onColumnFiltersChange:setcolumFilter22,
    onSortingChange:setsortingTable,
  
  
  })

    
  useEffect(() => {
 dispatch(getAllUsersFrontEnd())
  }, [])

  useEffect(() => {
    setallusersFetched(users)
    if(users){
      setdataTable(users)

    }
  }, [allUsersLoading])
  

  console.log({allusersFetched});
  console.log({progressUploadedorExport});
  return (
    <Fragment>
      {allUsersLoading?(<LoadingWithPercentage progessuploaded={0} />):(
      <div className="userlist_main_div">
  
   
   <Helmet><title> user list</title></Helmet>

<Typography variant="h5">All user List </Typography>

{(tableData &&  tableData?.length>1 )?  (



<div>      


<table className="table"  style={{width:table.getTotalSize(),justifyContent:"flex-start"}}>
<thead>
  {table.getHeaderGroups().map(headerGroup=><tr className="tr" key={headerGroup.id}>
    {
      headerGroup.headers.map( header=> <th 
        {...{
          key: header.id,
          colSpan: header.colSpan,
          style: {
            width: header.getSize(),
          },
        }}
       className="th"  key={header.id}
       onClick={header.column.getToggleSortingHandler()}
       >
        <>
     <div>
     {flexRender(header.column.columnDef.header, header.getContext())}
     {{asc:<ArrowUpwardIcon/>, desc:<ArrowDownwardIcon/>, null:""}[header.column.getIsSorted() as string ?? null]}
     </div>
    
    
      

                <div
                    {...{
                      onMouseDown: header.getResizeHandler(),
                      onTouchStart: header.getResizeHandler(),
                      className: `resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`,
                      
                    }}
                  />



                       {header.column.getCanFilter() ? (
                        <div>
                          <Filter column={header.column} table={table} />
                        </div>
                      ) : null}

                  
             
                 
</>     
    
      </th> )
 
    
 
 }



  </tr>
  

  )}
 
  </thead>
  <tbody>
  {table.getRowModel().rows.map(row=><tr  className="tr" key={row.id}>{row.getVisibleCells().map(cell=>
  <td  className="td" 
  
  {...{
    key: cell.id,
    style: {
      width: cell.column.getSize(),
   

    },
  }}
  
  
  
  >
     {
      flexRender(
        cell.column.columnDef.cell,
        cell.getContext()
      )
     }
  </td>)}
  </tr>)}

  </tbody>
</table>

</div>













):(<Typography> there are no courses to veiw</Typography>)}

  <br />
  <hr />

  <div className='pagination_div'>
    <div>
    <Button variant="contained" sx={{m:2}} onClick={()=>table.setPageIndex(0)}>First page</Button>
    <Button variant="contained" sx={{m:2}}  disabled={!table.getCanPreviousPage()} onClick={()=>table.previousPage()}>prev page</Button>
    <Button variant="contained"  sx={{m:2}} disabled={!table.getCanNextPage()} onClick={()=>table.nextPage()}>next page</Button>


    <Button variant="contained"  sx={{m:2}} onClick={()=>table.setPageIndex(table.getPageCount()-1)}>Last page</Button>
    </div>

  <hr />
  <div>

 
  <ul>
    <li>
        you are in page no -{" "} {table.options.state.pagination?.pageIndex!}
    </li>
    <li>
        Total pages ={table.getPageCount()-1}
    </li>
    <li>
    Jump to Page =     <TextField type="number" 
        defaultValue={table.options.state.pagination?.pageIndex || 0} 
        // value={table.options.state.pagination?.pageIndex }
        onChange={(e)=>table.setPageIndex(Number(e.target.value)  )}
        
        
        />
    </li>
  </ul>
  <hr /> 
  <h4>Current page SIze = {table.options.state.pagination?.pageSize}</h4>
  <FormControl variant="filled" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-filled-label">Pagesize</InputLabel>
  <Select value={table.options.state.pagination?.pageSize}
   defaultValue={3}
  onChange={e=>{
    table.setPageSize(Number(e.target.value)) 
  
  } }
  fullWidth
//   defaultValue={table.options.state.pagination?.pageSize}
  >
    
{[3,5,10].map((pagesizeEl )=>{
return(
    <MenuItem key={pagesizeEl} value={pagesizeEl || ""}>
{pagesizeEl}
    </MenuItem>
   
)
})}


  </Select>
  </FormControl>
  </div>
  </div>

   
   
   
   
   
   
   
   

      </div>
      )}
    </Fragment>
  )
}

export default UserList





function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()

  const sortedUniqueValues = useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )



  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={value =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
    <>
      <datalist id={column.id + 'list'} >
        {sortedUniqueValues.slice(0, 5000).map((value: any) => (
          <option value={value} key={value +"list"}  />
        ))}
      </datalist>
      <DebouncedInput
        type="text"
        value={(columnFilterValue ?? '') as string}
        onChange={value => column.setFilterValue(value)}
        placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
        className="w-36 border shadow rounded"
        list={column.id + 'list'}

      />
      <div className="h-1" />
    </>
  )
}


function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

 useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])



  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}