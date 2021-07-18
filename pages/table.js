import React from 'react'
import { useTable } from 'react-table'
import { connectToDatabase } from "../util/mongodb";

export default function App(reviews) {

  const columns = React.useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name', // accessor is the "key" in the data
      },
      {
        Header: 'Rating',
        accessor: 'rating',
      },
      {
        Header: 'Cuisine',
        accessor: 'cuisine'
      }
    ],
    []
  )

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data: reviews.reviews })

  return (
    <div>
    {console.log(reviews.reviews)}

    <table {...getTableProps()} style={{ border: 'solid 1px blue' }}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                style={{
                  borderBottom: 'solid 3px red',
                  background: 'aliceblue',
                  color: 'black',
                  fontWeight: 'bold',
                }}
              >
                {column.render('Header')}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row)
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return (
                  <td
                    {...cell.getCellProps()}
                    style={{
                      padding: '10px',
                      border: 'solid 1px gray',
                      background: 'papayawhip',
                    }}
                  >
                    {cell.render('Cell')}
                  </td>
                )
              })}
            </tr>
          )
        })}
      </tbody>
    </table>
    </div>
  )
}

export async function getServerSideProps() {
    const { db } = await connectToDatabase();
    const reviews = await db
      .collection("reviews")
      .find({})
      .sort({ metacritic: -1 })
      .limit(200)
      .toArray();
    return {
      props: {
        reviews: JSON.parse(JSON.stringify(reviews)),
      },
    };
  }

