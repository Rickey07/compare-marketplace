import { flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import React from 'react';


type Product = {
    name?:string,
    amz_price?:string,
    flip_price?:string
}

interface propTypes {
    columns?:any,
    data:[]
}

const Table = ({columns,data}:propTypes) => {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel:getCoreRowModel()
    })

  return (
    <div className='table-container-inner'>
        <table>
            <thead>
                    
            </thead>
        </table>
    </div>
  )
}

export default Table
