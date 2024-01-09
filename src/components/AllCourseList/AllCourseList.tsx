import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import "./AllCourseList.css"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../Redux/store"
import React, { Fragment, useEffect, useState } from "react"
import {  getAllCoursesTotal } from "../Redux/courseReducer"
import { toast } from "react-toastify"
import { Loading } from "../Loading/Loading"
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

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
import { CousseModelTypeFrontend } from "../VideoCart/VideoCart"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { deleteEntireCourseFrontend } from "../Redux/singleCourseReducer"
  

const AllCourseList = () => {


  const dispatch = useDispatch<AppDispatch>()
  const {allCourses, loading, error, message} = useSelector((state:RootState)=>state.courses)
   const {loading:sinlecourseLoading, error:singlecourseError, message:singlecourseMessage, } = useSelector((state:RootState)=>state.singleCourse)




  const [tableData, setdataTable] = useState<CousseModelTypeFrontend[]>([])

  const [columFilter22, setcolumFilter22] = useState<ColumnFiltersState>([])
  const [sortingTable, setsortingTable] = useState<any[]>([])



  const columns = [   {
    accessorKey:"_id",
    header:"course identiier",
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
     
    <Link to={`/course/edit/${props.row.original._id}`}>   <Button sx={{m:1, height:"30px",  fontSize:"10px", }}   variant="contained">update Course</Button></Link>  

   <Button sx={{m:1, height:"30px", fontSize:"10px" , bgcolor:"red"}}  onClick={()=>{
  if( window.confirm(`Do you want to delete this course\n
     and it contents wih id ${props.row.original._id} `)=== true ){
      dispatch(deleteEntireCourseFrontend(props.row.original._id))

     }
    
  
  }} 
    
    
    variant="contained">delete Course</Button>


 
 
  </Box>
      )
    }
      
      
     ,
    enableColumnFilter:false
  },
  {
    accessorKey:"title",
    header:"course title",
    cell: (props:any)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"description",
    header:"course description",
    cell:(props:any)=><div   dangerouslySetInnerHTML={{__html: props.getValue()}}>{}</div>
  },
  
  {
    accessorKey:"numOfVideos",
    header:"course numOfVideos",
    cell:(props:any)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"category",
    header:"course category",
    cell:(props:any)=><p>{props.getValue()}</p>
  },
  {
    accessorKey:"poster",
    header:"course poster",
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
  dispatch(getAllCoursesTotal())
 

  }, [])
  useEffect(() => {
  // if(allCourses){
  //   console.log({allCourses});
    setdataTable(allCourses!)
  // }
  }, [loading])
  
  useEffect(() => {
    if(message){
      toast.warning(message)
    
 
    }
    if(error){
      toast.error(error)
    }
    
  }, [message, error])
  
  useEffect(() => {
    if(singlecourseMessage){
      toast.warning(singlecourseMessage)
    
 
    }
    if(singlecourseError){
      toast.error(singlecourseError)
    }
    
  }, [singlecourseMessage, singlecourseError])

  useEffect(() => {
   
    dispatch(getAllCoursesTotal())
  }, [sinlecourseLoading])
  
  

  
  return (
<Fragment> 

{(loading ||sinlecourseLoading) ?(<Loading/>):(     


<div className="allcourse_list_main_div">
<Helmet><title> course list</title></Helmet>

<Typography variant="h5">All Course List </Typography>

{(tableData &&  tableData?.length>1 )?  (






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

export default AllCourseList












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

  const sortedUniqueValues = React.useMemo(
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
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])



  return (
    <input {...props} value={value} onChange={e => setValue(e.target.value)} />
  )
}